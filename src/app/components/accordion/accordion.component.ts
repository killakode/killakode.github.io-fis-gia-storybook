import {
  Component,
  Input,
  ViewEncapsulation,
  HostBinding,
  ContentChild,
  TemplateRef,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';

export interface AccordionPanelConfig {
  value: number;
  header: string;
  disabled: boolean;
  isHeaderOnly?: boolean;
}

export interface AccordionPanelTemplateContext {
  $implicit: AccordionPanelConfig;
}

export interface AccordionConfig {
  value: number[];
  multiple: boolean;
  dialog: boolean;
}

export interface ReportGroup {
  value: number;
  name: string;
  reports: Report[];
}

export interface Report {
  code: string;
  name: string;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    CardModule,
    TableModule,
    ButtonModule,
    SelectModule,
    RadioButtonModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() config: AccordionConfig = {
    value: [0],
    multiple: false,
    dialog: false,
  };

  @Input() withExpandableTable = false;
  @Input() panels: AccordionPanelConfig[] = [
    { value: 0, header: 'Параметры', disabled: false },
    { value: 1, header: 'Сведения об обучении', disabled: false },
    { value: 2, header: 'Специальные условия', disabled: false },
  ];

  @Input() reportGroups: ReportGroup[] = [
    {
      value: 0,
      name: 'Группа отчётов СБ',
      reports: [
        { code: 'SB01', name: 'Отчёт СБ-01' },
        { code: 'SB02', name: 'Отчёт СБ-02' },
      ],
    },
  ];

  @Input() styleClass = '';
  @Input() demoState?: 'hover' | 'active' | 'focus' | 'disabled';

  @ContentChild('panelContent', { static: false })
  panelContent?: TemplateRef<AccordionPanelTemplateContext>;

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'accordion',
      this.config.dialog ? 'accordion-dialog' : '',
      this.styleClass,
      this.demoState ? `demo-${this.demoState}` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  trackByValue(index: number, item: ReportGroup): number {
    return item.value;
  }

  onRowExpand(event: any) {
    console.log('Row expanded:', event);
  }

  onRowCollapse(event: any) {
    console.log('Row collapsed:', event);
  }

  static defaultPanels: AccordionPanelConfig[] = [
    { value: 0, header: 'Параметры', disabled: false },
    { value: 1, header: 'Сведения об обучении', disabled: false },
    { value: 2, header: 'Специальные условия', disabled: false },
  ];

  static defaultReportGroups: ReportGroup[] = [
    {
      value: 0,
      name: 'Группа отчётов СБ',
      reports: [
        { code: 'SB01', name: 'Отчёт СБ-01' },
        { code: 'SB02', name: 'Отчёт СБ-02' },
      ],
    },
  ];
}
