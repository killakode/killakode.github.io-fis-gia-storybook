import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  [key: string]: any; // Для кастомных полей
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    SelectModule,
    DropdownModule,
    MultiSelectModule,
    FloatLabelModule,
    SelectButtonModule,
    TooltipModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements AfterViewInit {
  @Input() mode: 'select' | 'dropdown' | 'multiselect' = 'select';
  @Input() options: SelectOption[] = [];
  @Input() value: any | any[] = null;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() showClear: boolean = false;
  @Input() appendTo: 'body' | null = null;
  @Input() useFloatLabel: boolean = false;
  @Input() floatLabelText: string = '';
  @Input() panelStyleClass: string = '';
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() maxSelectedLabels: number = 3;
  @Input() selectionLimit: number | undefined;
  @Input() selectedItemsLabel: string = 'Выбрано: {0}';
  @Input() showHeader: boolean = false;

  @Output() valueChange = new EventEmitter<any>();

  @ViewChild('selectContainer') selectContainer!: ElementRef;
  isOverflowing: boolean = false;
  tooltipText: string = '';

  ngAfterViewInit() {
    this.checkOverflow();
  }

  checkOverflow() {
    if (this.selectContainer) {
      const element = this.selectContainer.nativeElement;
      this.isOverflowing = element.scrollWidth > element.clientWidth;
      if (this.isOverflowing) {
        this.tooltipText = element.textContent?.trim() || '';
      }
    }
  }

  onChange(event: any) {
    this.valueChange.emit(event.value);
  }

  onShow() {
    this.checkOverflow();
  }

  onHide() {}

  getPanelStyleClass(): string {
    return this.panelStyleClass;
  }
}
