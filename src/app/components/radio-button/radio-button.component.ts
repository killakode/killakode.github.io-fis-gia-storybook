// radio-button.component.ts
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';


export type RadioButtonState =
  | 'default'
  | 'checked'
  | 'disabled'
  | 'disabled-checked'
  | 'hover'
  | 'hover-checked' // ← Добавили
  | 'focus';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule, CardModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RadioButtonComponent {
  @Input() label: string = 'Radio option';
  @Input() value: string = '';
  @Input() name: string = 'radioGroup';
  @Input() disabled: boolean = false;
  @Input() selectedValue: string = '';
  @Input() state: RadioButtonState = 'default';

  @Output() selectedValueChange = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.selectedValueChange.emit(newValue);
  }

  // Для демонстрации: если state установлен в checked/disabled-checked/hover-checked, показываем checked
  get effectiveSelectedValue(): string {
    if (
      this.state === 'checked' ||
      this.state === 'disabled-checked' ||
      this.state === 'hover-checked'
    ) {
      return this.value;
    }
    return this.selectedValue;
  }

  // Вычисляемые свойства для состояний
  get isDisabled(): boolean {
    return (
      this.state === 'disabled' ||
      this.state === 'disabled-checked' ||
      this.disabled
    );
  }

  get stateClass(): string {
    if (this.state === 'hover') return 'forced-hover';
    if (this.state === 'hover-checked') return 'forced-hover-checked'; // ← Добавили
    if (this.state === 'focus') return 'forced-focus';
    return '';
  }
}
