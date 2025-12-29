// accordion.component.ts

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

/**
 * Конфигурация панели аккордеона
 */
export interface AccordionPanelConfig {
  value: number;
  header: string;
  disabled: boolean;
  isHeaderOnly?: boolean;
}

/**
 * Контекст ng-template
 */
export interface AccordionPanelTemplateContext {
  $implicit: AccordionPanelConfig;
}

/**
 * Общая конфигурация аккордеона
 */
export interface AccordionConfig {
  value: number[];
  multiple: boolean;
  dialog: boolean;
  withExpandableTable?: boolean;
}

/**
 * Demo состояния
 */
export type DemoState = 'hover' | 'active' | 'focus' | 'disabled';

/**
 * Группа отчётов для демо таблицы
 */
export interface ReportGroup {
  value: number;
  name: string;
  reports: Report[];
}

/**
 * Отчёт
 */
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
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  // =======================================================
  // CONFIG
  // =======================================================
  @Input() config: AccordionConfig = {
    value: [0],
    multiple: true,
    dialog: false,
    withExpandableTable: false,
  };

  // =======================================================
  // PANELS
  // =======================================================
  @Input() panels: AccordionPanelConfig[] = [
    { value: 0, header: 'Параметры', disabled: false },
    { value: 1, header: 'Сведения об обучении', disabled: false },
    { value: 2, header: 'Специальные условия', disabled: false },
    { value: 3, header: 'Образовательная организация', disabled: false },
  ];

  // =======================================================
  // DEMO DATA ДЛЯ ТАБЛИЦЫ
  // =======================================================
  @Input() reportGroups: ReportGroup[] = [
    {
      value: 0,
      name: 'Группа отчётов СБ',
      reports: [
        { code: 'SB01', name: 'Отчёт СБ-01' },
        { code: 'SB02', name: 'Отчёт СБ-02' },
        { code: 'SB03', name: 'Отчёт СБ-03' },
      ],
    },
    {
      value: 1,
      name: 'Группа отчётов К',
      reports: [
        { code: 'K01A', name: 'Отчёт К-01А' },
        { code: 'K02', name: 'Отчёт К-02' },
      ],
    },
  ];

  // =======================================================
  // DEMO FORM VALUES (для ngModel)
  // =======================================================
  demoWaveId: number | null = null;
  demoSeparateBy: { [key: string]: string } = {};

  // =======================================================
  // STYLING
  // =======================================================
  @Input() styleClass = '';
  @Input() demoState?: DemoState;

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

  // =======================================================
  // CUSTOM CONTENT TEMPLATE
  // =======================================================
  @ContentChild('panelContent', { static: false })
  panelContent?: TemplateRef<AccordionPanelTemplateContext>;

  // =======================================================
  // TRACK BY FUNCTIONS
  // =======================================================
  trackByValue(index: number, item: ReportGroup): number {
    return item.value;
  }

  // =======================================================
  // TABLE HANDLERS
  // =======================================================
  onRowExpand(event: any) {
    console.log('Row expanded:', event);
  }

  onRowCollapse(event: any) {
    console.log('Row collapsed:', event);
  }

  // =======================================================
  // DEMO HANDLERS
  // =======================================================
  onResetForm(reportCode: string) {
    this.demoWaveId = null;
    this.demoSeparateBy[reportCode] = 'government';
  }

  onGenerateReport(reportCode: string) {
    console.log('Generating report:', reportCode, {
      waveId: this.demoWaveId,
      separateBy: this.demoSeparateBy[reportCode] || 'government',
    });
  }

  // =======================================================
  // DEFAULT DATA (Storybook)
  // =======================================================
  static defaultConfig: AccordionConfig = {
    value: [0],
    multiple: true,
    dialog: false,
    withExpandableTable: false,
  };

  static defaultPanels: AccordionPanelConfig[] = [
    { value: 0, header: 'Параметры', disabled: false },
    { value: 1, header: 'Сведения об обучении', disabled: false },
    { value: 2, header: 'Специальные условия', disabled: false },
    { value: 3, header: 'Образовательная организация', disabled: false },
  ];

  static defaultReportGroups: ReportGroup[] = [
    {
      value: 0,
      name: 'Группа отчётов СБ',
      reports: [
        { code: 'SB01', name: 'Отчёт СБ-01' },
        { code: 'SB02', name: 'Отчёт СБ-02' },
        { code: 'SB03', name: 'Отчёт СБ-03' },
      ],
    },
    {
      value: 1,
      name: 'Группа отчётов К',
      reports: [
        { code: 'K01A', name: 'Отчёт К-01А' },
        { code: 'K02', name: 'Отчёт К-02' },
      ],
    },
  ];
}
