import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule, CardModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None, // Важно для ::ng-deep
})
export class RadioButtonComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() selectedValue: string = '';
  @Input() demoMode: boolean = false; // Новый инпут для демо-режима

  @Output() selectedValueChange = new EventEmitter<string>();

  get isInteractive(): boolean {
    return !this.demoMode && !this.disabled;
  }

  onValueChange(newValue: string) {
    if (this.isInteractive) {
      this.selectedValueChange.emit(newValue);
    }
  }
}
