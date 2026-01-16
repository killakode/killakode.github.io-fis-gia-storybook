import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export type SelectMode = 'select' | 'dropdown' | 'multiselect';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    DropdownModule,
    MultiSelectModule,
    TooltipModule,
    CardModule,
    FloatLabelModule, // Добавляем модуль для floatLabel
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('selectElement', { read: ElementRef }) selectElement!: ElementRef;
  @ViewChild('selectContainer', { read: ElementRef })
  selectContainer!: ElementRef;

  // ============ ОСНОВНЫЕ СВОЙСТВА ============
  @Input() mode: SelectMode = 'select';
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Выберите значение';
  @Input() disabled: boolean = false;
  @Input() showClear: boolean = false;
  @Input() filter: boolean = true; // Для select/dropdown всегда true
  @Input() appendTo: string | null = 'body';

  // Свойства для floatLabel
  @Input() useFloatLabel: boolean = false;
  @Input() floatLabelText: string = '';

  // Свойства для label/value
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';

  // Значение
  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();

  // ============ ОБЩИЕ СВОЙСТВА ============
  @Input() dropdownIcon: string = 'icon-arrow';
  @Input() resetFilterOnHide: boolean = true;

  // Tooltip
  @Input() showTooltipOnOverflow: boolean = true;
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  // ============ СПЕЦИФИЧНЫЕ СВОЙСТВА ============
  @Input() maxSelectedLabels: number = 3;
  @Input() selectionLimit?: number;
  @Input() selectedItemsLabel: string = 'Выбрано: {0}';
  @Input() showHeader: boolean = true; // Для multiselect по умолчанию true

  // ============ ВНУТРЕННИЕ СВОЙСТВА ============
  tooltipText: string = '';
  isOverflowing: boolean = false;
  shouldExpandContainer: boolean = false;

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  @HostBinding('class')
  get hostClasses(): string {
    const classes: string[] = [];

    if (this.shouldExpandContainer) {
      classes.push('expand-container-for-overlay');
    }

    return classes.join(' ');
  }

  // ============ LIFECYCLE HOOKS ============
  ngAfterViewInit() {
    this.setupTooltipLogic();
    this.checkOverflow();
    this.updateContainerExpansion();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] || changes['options'] || changes['mode']) {
      setTimeout(() => this.checkOverflow(), 0);
    }

    if (changes['appendTo']) {
      this.updateContainerExpansion();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  // ============ ОБРАБОТЧИКИ СОБЫТИЙ ============
  onChange(event: any) {
    this.value = event.value;
    this.valueChange.emit(event.value);
    this.checkOverflow();
  }

  onShow() {
    this.checkOverflow();
    this.updateContainerExpansion();
  }

  onHide() {
    this.checkOverflow();
    this.updateContainerExpansion();
  }

  // ============ ЛОГИКА РАСШИРЕНИЯ КОНТЕЙНЕРА ============
  private updateContainerExpansion() {
    this.shouldExpandContainer = this.appendTo === null;
    this.cdr.detectChanges();
  }

  // ============ ОСНОВНАЯ ЛОГИКА TOOLTIP ============
  private setupTooltipLogic() {
    if (!this.showTooltipOnOverflow) return;

    fromEvent(window, 'resize')
      .pipe(debounceTime(150), takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkOverflow();
      });

    this.setupMutationObserver();
    this.setupResizeObserver();
  }

  private setupResizeObserver() {
    if (!this.selectContainer?.nativeElement) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.checkOverflow();
    });

    this.resizeObserver.observe(this.selectContainer.nativeElement);
  }

  private setupMutationObserver() {
    if (!this.selectElement?.nativeElement) return;

    this.mutationObserver = new MutationObserver(() => {
      this.checkOverflow();
    });

    this.mutationObserver.observe(this.selectElement.nativeElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  // ============ ПРОВЕРКА ПЕРЕПОЛНЕНИЯ ============
  checkOverflow() {
    if (!this.selectElement?.nativeElement) return;

    setTimeout(() => {
      const labelElement = this.getLabelElement();
      if (!labelElement) return;

      const isOverflowing = labelElement.scrollWidth > labelElement.clientWidth;

      if (isOverflowing !== this.isOverflowing) {
        this.isOverflowing = isOverflowing;
        this.tooltipText = isOverflowing ? this.getTooltipText() : '';
        this.cdr.detectChanges();
      }
    }, 0);
  }

  private getLabelElement(): HTMLElement | null {
    const el = this.selectElement.nativeElement;

    switch (this.mode) {
      case 'select':
        return el.querySelector('.p-select-label');
      case 'dropdown':
        return el.querySelector('.p-dropdown-label');
      case 'multiselect':
        return el.querySelector('.p-multiselect-label');
      default:
        return null;
    }
  }

  private getTooltipText(): string {
    if (
      !this.value ||
      (this.mode === 'multiselect' && this.value.length === 0)
    ) {
      return '';
    }

    if (this.mode === 'multiselect') {
      const selectedItems = this.options.filter((option) => {
        const optionValue = this.optionValue
          ? option[this.optionValue]
          : option;
        return this.value.includes(optionValue);
      });

      const labels = selectedItems.map((item) =>
        this.optionLabel ? item[this.optionLabel] : item
      );

      return labels.join(', ');
    } else {
      const selectedOption = this.options.find(
        (option) => option[this.optionValue] === this.value
      );
      return selectedOption?.[this.optionLabel] || '';
    }
  }

  // Метод для panelStyleClass
  getPanelStyleClass(): string {
    if (this.appendTo === 'body') {
      if (this.mode === 'select' || this.mode === 'dropdown') {
        return 'select-append-to-body';
      } else {
        return 'multiselect-append-to-body';
      }
    }
    return '';
  }
}
