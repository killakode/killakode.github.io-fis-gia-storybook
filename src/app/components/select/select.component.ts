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
  OnChanges,
  SimpleChanges,
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
  styleUrls: ['./select.component.scss', '../../styles/input.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements AfterViewInit, OnChanges, OnDestroy {
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

  ngOnChanges(changes: SimpleChanges) {
    // Проверяем переполнение при изменении value или options
    if (changes['value'] || changes['options']) {
      // Используем setTimeout для ожидания рендера
      setTimeout(() => this.checkOverflow(), 0);
    }
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
      // Также проверяем переполнение при изменении размера
      this.checkOverflow();
    });

    this.resizeObserver.observe(selectElement);
  }

  private setupWindowListeners() {
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

    this.overlayElement.style.width = `${width}px`;
    this.overlayElement.style.minWidth = `${width}px`;
    this.overlayElement.style.maxWidth = `${width}px`;
  }

  private updateOverlayPosition() {
    const selectElement = this.selectElement?.nativeElement;
    if (!selectElement || !this.overlayElement) return;

    this.overlayElement.style.transform = 'none !important';
    this.overlayElement.style.inset = 'unset';

    const rect = selectElement.getBoundingClientRect();
    const overlayRect = this.overlayElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    const overlayHeight =
      overlayRect.height || this.overlayElement.offsetHeight;

    const spaceBelow = windowHeight - rect.bottom;
    const spaceAbove = rect.top;

    const gap = 3;

    let top: number;

    if (spaceBelow >= overlayHeight || spaceBelow >= spaceAbove) {
      top = rect.bottom + scrollTop + gap;
    } else {
      top = rect.top + scrollTop - overlayHeight - gap;
    }

    const left = rect.left + scrollLeft;

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

        this.overlayElement.classList.add('custom-positioned');

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
