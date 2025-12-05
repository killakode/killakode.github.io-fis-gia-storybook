// checkbox.component.ts
import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

let nextUniqueId = 0; // ← Счётчик для уникальных ID

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule],
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
  @Input() label?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() state?: 'default' | 'hover' | 'focus' | 'active';
  @Input() indeterminate = false;
  @Input() checked = false;
  @Input() inputId?: string; // ← Возможность передать свой ID

  // Генерируем уникальный ID, если не передан
  uniqueId: string = `checkbox-${++nextUniqueId}`;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    // Если inputId передан извне, используем его
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

  getStateClass(): string {
    return this.state ? `state-${this.state}` : '';
  }
}
