// select.component.ts
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
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, TooltipModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements AfterViewInit, OnDestroy {
  @ViewChild('selectElement', { read: ElementRef }) selectElement!: ElementRef;

  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Выберите значение';
  @Input() disabled: boolean = false;
  @Input() showClear: boolean = false;
  @Input() filter: boolean = false;
  @Input() appendTo: string = 'body';
  @Input() invalid: boolean = false;

  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();

  showTooltip: boolean = false;
  selectedLabel: string = '';

  private resizeObserver?: ResizeObserver;
  private overlayElement?: HTMLElement;
  private scrollListener?: () => void;
  private resizeListener?: () => void;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    this.setupResizeObserver();
    this.checkOverflow();
    this.setupWindowListeners();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.removeWindowListeners();
  }

  private setupResizeObserver() {
    const selectElement = this.selectElement?.nativeElement;
    if (!selectElement) return;

    this.resizeObserver = new ResizeObserver(() => {
      if (this.overlayElement) {
        this.updateOverlayWidth();
      }
    });

    this.resizeObserver.observe(selectElement);
  }

  private setupWindowListeners() {
    // Отслеживаем скролл и ресайз окна для обновления позиции
    this.scrollListener = () => {
      if (this.overlayElement) {
        this.updateOverlayPosition();
      }
    };

    this.resizeListener = () => {
      if (this.overlayElement) {
        this.updateOverlayWidth();
        this.updateOverlayPosition();
      }
    };

    window.addEventListener('scroll', this.scrollListener, true);
    window.addEventListener('resize', this.resizeListener);
  }

  private removeWindowListeners() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener, true);
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private updateOverlayWidth() {
    const selectElement = this.selectElement?.nativeElement;
    if (!selectElement || !this.overlayElement) return;

    const width = selectElement.offsetWidth;

    // Устанавливаем ТОЛЬКО ширину
    this.overlayElement.style.width = `${width}px`;
    this.overlayElement.style.minWidth = `${width}px`;
    this.overlayElement.style.maxWidth = `${width}px`;
  }

  private updateOverlayPosition() {
    const selectElement = this.selectElement?.nativeElement;
    if (!selectElement || !this.overlayElement) return;

    // Полностью сбрасываем позиционирование PrimeNG
    this.overlayElement.style.transform = 'none !important';
    this.overlayElement.style.inset = 'unset';

    const rect = selectElement.getBoundingClientRect();
    const overlayRect = this.overlayElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    // Высота overlay
    const overlayHeight =
      overlayRect.height || this.overlayElement.offsetHeight;

    // Доступное пространство
    const spaceBelow = windowHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Отступ
    const gap = 3;

    let top: number;

    // Логика позиционирования
    if (spaceBelow >= overlayHeight || spaceBelow >= spaceAbove) {
      // Вниз
      top = rect.bottom + scrollTop + gap;
    } else {
      // Вверх
      top = rect.top + scrollTop - overlayHeight - gap;
    }

    const left = rect.left + scrollLeft;

    // Применяем стили с высоким приоритетом
    Object.assign(this.overlayElement.style, {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      transform: 'none',
      inset: 'unset',
      margin: '0',
    });
  }

  onChange(event: any) {
    this.value = event.value;
    this.valueChange.emit(event.value);

    setTimeout(() => this.checkOverflow(), 0);
  }

  onShow() {
    setTimeout(() => {
      const overlays = this.document.querySelectorAll('.p-select-overlay');
      if (overlays.length > 0) {
        this.overlayElement = overlays[overlays.length - 1] as HTMLElement;

        // Добавляем класс для нашего кастомного позиционирования
        this.overlayElement.classList.add('custom-positioned');

        // Многократное применение позиции для перебивания PrimeNG
        const applyPosition = () => {
          this.updateOverlayWidth();
          this.updateOverlayPosition();
        };

        setTimeout(applyPosition, 0);
        setTimeout(applyPosition, 10);
        setTimeout(applyPosition, 50);
        requestAnimationFrame(applyPosition);

        const overlayResizeObserver = new ResizeObserver(() => {
          this.updateOverlayPosition();
        });
        overlayResizeObserver.observe(this.overlayElement!);

        (this.overlayElement as any).__resizeObserver = overlayResizeObserver;
      }
    }, 0);
  }

  onHide() {
    // Очищаем observer если он был создан
    if (this.overlayElement && (this.overlayElement as any).__resizeObserver) {
      (this.overlayElement as any).__resizeObserver.disconnect();
      delete (this.overlayElement as any).__resizeObserver;
    }

    this.overlayElement = undefined;
  }

  checkOverflow() {
    const selectElement = this.selectElement?.nativeElement;
    if (!selectElement) return;

    const labelElement = selectElement.querySelector('.p-select-label');
    if (!labelElement) return;

    const isOverflowing = labelElement.scrollWidth > labelElement.clientWidth;
    this.showTooltip = isOverflowing;

    const selectedOption = this.options.find((opt) => opt.value === this.value);
    this.selectedLabel = selectedOption?.label || '';

    this.cdr.detectChanges();
  }
}
