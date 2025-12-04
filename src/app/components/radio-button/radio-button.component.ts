// radio-button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

export type RadioButtonState =
  | 'default'
  | 'checked'
  | 'disabled'
  | 'disabled-checked'
  | 'hover'
  | 'focus';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() label: string = 'Radio option';
  @Input() value: string = '';
  @Input() name: string = 'radioGroup';
  @Input() disabled: boolean = false;
  @Input() selectedValue: string = '';
  @Input() state: RadioButtonState = 'default'; // ← Добавили

  @Output() selectedValueChange = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.selectedValueChange.emit(newValue);
  }

  // Вычисляемые свойства для состояний
  get isChecked(): boolean {
    return (
      this.state === 'checked' ||
      this.state === 'disabled-checked' ||
      this.selectedValue === this.value
    );
  }

  get isDisabled(): boolean {
    return (
      this.state === 'disabled' ||
      this.state === 'disabled-checked' ||
      this.disabled
    );
  }

  get stateClass(): string {
    if (this.state === 'hover') return 'forced-hover';
    if (this.state === 'focus') return 'forced-focus';
    return '';
  }
}
