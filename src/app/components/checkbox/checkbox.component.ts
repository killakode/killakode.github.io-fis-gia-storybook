import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';

let nextUniqueId = 0;

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, CardModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent implements ControlValueAccessor {
  /**
   * Текстовая метка рядом с чекбоксом.
   */
  @Input() label?: string;

  /**
   * Блокирует взаимодействие с чекбоксом.
   */
  @Input() disabled = false;

  /**
   * Разрешает только просмотр (визуально как disabled, но не блокирует события).
   */
  @Input() readonly = false;

  /**
   * Состояние чекбокса (checked/unchecked).
   */
  @Input() checked = false;

  /**
   * Неопределённое состояние (визуально — прочерк).
   * Устанавливается через атрибут [attr.data-indeterminate].
   */
  @Input() indeterminate = false;

  /**
   * HTML ID для связи с label (автогенерируется, если не указан).
   */
  @Input() inputId?: string;

  /**
   * Уникальный ID (автогенерируется, если не передан inputId).
   */
  uniqueId: string = `checkbox-${++nextUniqueId}`;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    if (this.inputId) {
      this.uniqueId = this.inputId;
    }
  }

  writeValue(value: boolean): void {
    this.checked = value || false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onCheckboxChange(event: any): void {
    if (this.readonly) return;
    this.checked = event.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  /**
   * Возвращает классы для состояний (используется в шаблоне).
   * В текущей реализации не применяется (стилизация через CSS).
   */
  getStateClass(): string {
    return ''; // Стили определены в CSS, этот метод не нужен
  }
}
