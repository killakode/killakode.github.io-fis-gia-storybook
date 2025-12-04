// radio-button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

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
  @Output() selectedValueChange = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.selectedValueChange.emit(newValue);
  }
}
