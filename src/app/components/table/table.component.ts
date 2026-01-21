import {
  Component,
  Input,
  ViewEncapsulation,
  HostBinding,
  TemplateRef,
  ContentChild,
  EventEmitter,
  Output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { FluidModule } from 'primeng/fluid';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

export interface TableColumnConfig {
  field: string;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'numeric' | 'date' | 'boolean' | 'multiselect';
  filterOptions?: { label: string; value: any }[];
}

export interface TreeColumnConfig {
  field: string;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'numeric' | 'date' | 'boolean' | 'multiselect';
  filterOptions?: { label: string; value: any }[];
}

export type DemoState = 'hover' | 'active' | 'focus' | 'disabled';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TreeTableModule,
    CardModule,
    FluidModule,
    MultiSelectModule,
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class DataTableComponent {
  filterValues: { [key: string]: any } = {};
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
  @Input() showCheckbox = false;
  @Input() checkboxSelection = false;

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
  @Input() filterOptions?: { [field: string]: { label: string; value: any }[] };

  @Output() treeLazyLoad = new EventEmitter<any>();
  @Output() treeNodeExpand = new EventEmitter<any>();
  @Output() treeSelectionChange = new EventEmitter<any>();

  onTreeLazyLoad(event: any) {
    this.treeLazyLoad.emit(event);
  }

  onTreeNodeExpand(event: any) {
    this.treeNodeExpand.emit(event);
  }

  onTreeSelectionChange(event: any) {
    this.selection = event;
    this.treeSelectionChange.emit(event);
  }

  @HostBinding('class')
  get hostClasses() {
    return [
      this.styleClass ?? '',
      this.demoState ? `demo-${this.demoState}` : '',
    ].join(' ');
  }

  getFilterType(filterType: string | undefined): string {
    if (!filterType || filterType === 'multiselect') {
      return 'text'; // по умолчанию или для multiselect
    }
    return filterType;
  }

  getScrollableColumns(): TableColumnConfig[] {
    // Возвращаем все колонки кроме первых 2 (они frozen)
    // Проверяем что tableColumns существует и имеет длину > 2
    if (!this.tableColumns || this.tableColumns.length <= 2) {
      return [];
    }
    return this.tableColumns.slice(2);
  }

  applyTreeFilter(): void {
    if (!this.treeValue || this.type !== 'tree') return;

    const filteredValue = this.filterTreeNodes([...this.treeValue]);
    // Здесь можно добавить логику для обновления treeValue или эмитить событие
    // Например:
    this.treeValue = filteredValue;
  }

  // Рекурсивная фильтрация узлов дерева (с корректной типизацией)
  private filterTreeNodes(nodes: TreeNode[]): TreeNode[] {
    return nodes.flatMap((node) => {
      // Рекурсивно фильтруем дочерние узлы (если они есть)
      const filteredChildren = node.children
        ? this.filterTreeNodes(node.children)
        : [];

      // Проверяем, проходит ли текущий узел по фильтрам
      const passesFilter = this.checkNodeAgainstFilters(node.data);

      // Возвращаем узел, если:
      // 1. Он проходит фильтр, ИЛИ
      // 2. У него есть дочерние узлы, которые прошли фильтр
      if (passesFilter || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }
      return []; // Возвращаем пустой массив, чтобы исключить узел
    });
  }

  // Проверяем, проходит ли данные узла по текущим фильтрам
  private checkNodeAgainstFilters(data: any): boolean {
    for (const [field, filterValue] of Object.entries(this.filterValues)) {
      if (
        filterValue === undefined ||
        filterValue === null ||
        filterValue === ''
      ) {
        continue; // Пропускаем пустые фильтры
      }

      const cellValue = data[field];
      if (cellValue === undefined) return false;

      // Логика сравнения в зависимости от типа фильтра
      if (Array.isArray(filterValue)) {
        // Для мультиселекта (проверяем вхождение в массив)
        if (!filterValue.includes(cellValue)) return false;
      } else if (typeof filterValue === 'boolean') {
        // Для булевых значений
        if (cellValue !== filterValue) return false;
      } else if (typeof filterValue === 'string' && filterValue.includes(':')) {
        // Для дат (например, "2024-01-01:2024-01-31")
        const [startDate, endDate] = filterValue.split(':');
        if (
          new Date(cellValue) < new Date(startDate) ||
          new Date(cellValue) > new Date(endDate)
        ) {
          return false;
        }
      } else {
        // Для текстовых и числовых фильтров (простое совпадение)
        if (
          String(cellValue)
            .toLowerCase()
            .indexOf(String(filterValue).toLowerCase()) === -1
        ) {
          return false;
        }
      }
    }
    return true;
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
