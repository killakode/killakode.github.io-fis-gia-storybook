import {
  Component,
  Input,
  ViewEncapsulation,
  HostBinding,
  TemplateRef,
  ContentChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { FluidModule } from 'primeng/fluid';


export interface TableColumnConfig {
  field: string;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'number' | 'date' | 'select';
}

export interface TreeColumnConfig {
  field: string;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'number' | 'date' | 'select';
}

export type DemoState = 'hover' | 'active' | 'focus' | 'disabled';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, TreeTableModule, CardModule, FluidModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  // =======================================================
  // MODE
  // =======================================================
  @Input() type: 'table' | 'tree' = 'table';

  // =======================================================
  // TABLE
  // =======================================================
  @Input() tableColumns: TableColumnConfig[] = [];
  @Input() tableValue: any[] = [];

  // FROZEN COLUMNS (PrimeNG 18 API)
  @Input() frozenTableColumns: TableColumnConfig[] = [];

  // =======================================================
  // TREE TABLE
  // =======================================================
  @Input() treeColumns: TreeColumnConfig[] = [];
  @Input() treeValue: TreeNode[] = [];

  @Input() frozenTreeColumns: TreeColumnConfig[] = [];

  // =======================================================
  // PAGINATION
  // =======================================================
  @Input() paginator = false;
  @Input() rows = 10;
  @Input() rowsPerPageOptions: number[] = [10, 20, 50, 100];

  @Input() totalRecords: number = 0;

  @Input() showCurrentPageReport = false;
  @Input() currentPageReportTemplate = '{first} - {last} из {totalRecords}';
  @Input() showFirstLastIcon = true;

  // =======================================================
  // SCROLL / RESIZE / LAYOUT
  // =======================================================
  @Input() scrollable = false;
  @Input() scrollHeight?: string;

  @Input() resizableColumns = false;
  @Input() columnResizeMode: 'fit' | 'expand' = 'fit';

  @Input() reorderableColumns = false;
  @Input() autoLayout = false;

  @Input() showGridlines = true;

  // =======================================================
  // SELECTION
  // =======================================================
  // PrimeNG 18: "checkbox" removed from types officially
  @Input() selectionMode?: 'single' | 'multiple';
  @Input() selection: any;
  @Input() dataKey?: string;

  // =======================================================
  // LAZY LOADING
  // =======================================================
  @Input() lazy = false;
  @Input() loading = false;

  // =======================================================
  // CONTENT
  // =======================================================
  @Input() emptyMessage = 'Нет данных';

  // =======================================================
  // STYLING
  // =======================================================
  @Input() styleClass?: string;
  @Input() demoState?: DemoState;

  @HostBinding('class')
  get hostClasses() {
    return [
      this.styleClass ?? '',
      this.demoState ? `demo-${this.demoState}` : '',
    ].join(' ');
  }

  // =======================================================
  // CUSTOM CELL TEMPLATES
  // =======================================================
  @ContentChild('cellTemplate', { static: false })
  cellTemplate?: TemplateRef<any>;

  @ContentChild('treeCellTemplate', { static: false })
  treeCellTemplate?: TemplateRef<any>;

  // =======================================================
  // DEFAULT DATA (для Storybook)
  // =======================================================
  static defaultTableColumns: TableColumnConfig[] = [
    {
      field: 'name',
      header: 'Название',
      sortable: true,
      filterable: true,
      filterType: 'text',
    },
    { field: 'count', header: 'Кол-во', sortable: true },
    { field: 'code', header: 'Код', width: '150px' },
  ];

  static defaultTableData = [
    { name: 'Документ 1', count: 10, code: 'A1' },
    { name: 'Документ 2', count: 5, code: 'B2' },
    { name: 'Документ 3', count: 8, code: 'C3' },
  ];

  static defaultTreeColumns: TreeColumnConfig[] = [
    { field: 'name', header: 'Наименование', sortable: true },
    { field: 'count', header: 'Кол-во', sortable: true },
    { field: 'code', header: 'Код' },
  ];

  static defaultTreeValue: TreeNode[] = [
    {
      data: { name: 'Раздел 1', count: 10, code: 'A' },
      children: [
        { data: { name: 'Подраздел 1.1', count: 4, code: 'A1' } },
        { data: { name: 'Подраздел 1.2', count: 6, code: 'A2' } },
      ],
    },
    {
      data: { name: 'Раздел 2', count: 5, code: 'B' },
      children: [{ data: { name: 'Подраздел 2.1', count: 5, code: 'B1' } }],
    },
  ];
}
