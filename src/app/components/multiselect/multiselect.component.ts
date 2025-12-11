import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { MultiSelect } from 'primeng/multiselect';
import { Tooltip } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, fromEvent, takeUntil, debounceTime } from 'rxjs';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [CommonModule, MultiSelect, FormsModule, Tooltip, CardModule],
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MultiselectComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MultiSelect) multiselect?: MultiSelect;
  @ViewChild('multiselectContainer', { read: ElementRef }) container?: ElementRef;

  // PrimeNG Props
  @Input() options: any[] = [];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() placeholder: string = 'Выберите';
  @Input() disabled: boolean = false;
  @Input() showClear: boolean = false;
  @Input() filter: boolean = false;
  @Input() appendTo: 'body' | null = null;
  @Input() display: 'comma' | 'chip' = 'comma';
  @Input() maxSelectedLabels: number = 3;
  @Input() selectionLimit?: number;
  @Input() selectedItemsLabel: string = 'Выбрано: {0}';
  @Input() showToggleAll: boolean = true;
  @Input() dropdownIcon: string  = 'icon-arrow';
  @Input() panelStyleClass: string = 'multiselect-append-to-body';
  @Input() styleClass: string = '';

  @Input() value: any[] = [];

  // Tooltip
  @Input() showTooltipOnOverflow: boolean = true;
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  // Внутренние свойства
  tooltipText: string = '';
  isOverflowing: boolean = false;

  // Demo State для Storybook
  @Input() demoState?: 'hover' | 'active' | 'focus' | 'open';

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  @HostBinding('class')
  get hostClasses(): string {
    const classes: string[] = [];

    if (this.demoState) {
      classes.push(`demo-state-${this.demoState}`);
    }

    return classes.join(' ');
  }

  ngAfterViewInit() {
    if (this.showTooltipOnOverflow) {
      // Проверяем переполнение при изменении значения
      this.checkOverflow();

      // Слушаем изменения размера окна
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(150),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.checkOverflow();
        });

      // Слушаем изменения value через MutationObserver
      this.observeValueChanges();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Проверяет переполнение label и обновляет tooltip
   */
  checkOverflow() {
    if (!this.multiselect) return;

    setTimeout(() => {
      const labelElement = this.getLabelElement();
      if (!labelElement) return;

      const isOverflowing = labelElement.scrollWidth > labelElement.clientWidth;

      if (isOverflowing !== this.isOverflowing) {
        this.isOverflowing = isOverflowing;

        if (this.isOverflowing) {
          this.tooltipText = this.getTooltipText();
        } else {
          this.tooltipText = '';
        }

        this.cdr.detectChanges();
      }
    }, 0);
  }

  /**
   * Получает элемент label из MultiSelect
   */
  private getLabelElement(): HTMLElement | null {
    if (!this.multiselect) return null;

    const el = this.multiselect.el.nativeElement;
    return el.querySelector('.p-multiselect-label');
  }

  /**
   * Формирует текст для tooltip
   */
  private getTooltipText(): string {
    if (!this.value || this.value.length === 0) {
      return '';
    }

    // Получаем выбранные элементы
    const selectedItems = this.options.filter(option => {
      const optionValue = this.optionValue
        ? option[this.optionValue]
        : option;
      return this.value.includes(optionValue);
    });

    // Формируем текст
    const labels = selectedItems.map(item =>
      this.optionLabel ? item[this.optionLabel] : item
    );

    return labels.join(', ');
  }

  /**
   * Наблюдает за изменениями в DOM (для обновления tooltip)
   */
  private observeValueChanges() {
    if (!this.multiselect) return;

    const targetNode = this.multiselect.el.nativeElement;
    const config = {
      childList: true,
      subtree: true,
      characterData: true
    };

    const observer = new MutationObserver(() => {
      this.checkOverflow();
    });

    observer.observe(targetNode, config);

    // Отписываемся при уничтожении компонента
    this.destroy$.subscribe(() => {
      observer.disconnect();
    });
  }

  /**
   * Обработчик изменения значения
   */
  onValueChange(event: any) {
    this.checkOverflow();
  }
}
