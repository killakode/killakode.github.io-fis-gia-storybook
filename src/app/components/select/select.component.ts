// select.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Выберите значение';
  @Input() disabled: boolean = false;
  @Input() showClear: boolean = false;
  @Input() filter: boolean = false;
  @Input() appendTo: string = 'body';
  @Input() maxWidth: string = '34rem';
  @Input() invalid: boolean = false;

  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();

  onChange(event: any) {
    this.valueChange.emit(event.value);
  }
}
