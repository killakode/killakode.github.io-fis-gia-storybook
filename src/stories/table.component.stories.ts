import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import {
  TableComponent,
  TableColumnConfig,
} from '../app/components/table/table.component';

// Конфигурации колонок для демонстрации фильтров
const filterDemoColumns: TableColumnConfig[] = [
  {
    field: 'name',
    header: 'Название',
    sortable: true,
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'count',
    header: 'Кол-во',
    sortable: true,
    filterable: true,
    filterType: 'numeric',
    width: '120px',
  },
  {
    field: 'date',
    header: 'Дата создания',
    filterable: true,
    filterType: 'date',
    width: '150px',
  },
  {
    field: 'status',
    header: 'Статус',
    filterable: true,
    filterType: 'multiselect',
    width: '140px',
    filterOptions: [
      { label: 'Активный', value: 'active' },
      { label: 'В ожидании', value: 'pending' },
      { label: 'Завершен', value: 'completed' },
      { label: 'Отклонен', value: 'rejected' },
    ],
  },
  {
    field: 'category',
    header: 'Категория',
    filterable: true,
    filterType: 'multiselect',
    width: '160px',
    filterOptions: [
      { label: 'Документ', value: 'doc' },
      { label: 'Договор', value: 'contract' },
      { label: 'Счет', value: 'invoice' },
      { label: 'Акт', value: 'act' },
      { label: 'Отчет', value: 'report' },
    ],
  },
  {
    field: 'active',
    header: 'Активный',
    filterable: true,
    filterType: 'boolean',
    width: '120px',
  },
  {
    field: 'code',
    header: 'Код',
    filterable: true,
    filterType: 'text',
    width: '100px',
  },
];

// Данные для демонстрации фильтров
const filterDemoData = [
  {
    name: 'Документ 1',
    count: 10,
    date: '2024-01-15',
    status: 'active',
    category: 'doc',
    active: true,
    code: 'A1',
  },
  {
    name: 'Договор 2',
    count: 5,
    date: '2024-01-20',
    status: 'pending',
    category: 'contract',
    active: false,
    code: 'B2',
  },
  {
    name: 'Счет 3',
    count: 8,
    date: '2024-01-25',
    status: 'completed',
    category: 'invoice',
    active: true,
    code: 'C3',
  },
  {
    name: 'Акт 4',
    count: 15,
    date: '2024-01-30',
    status: 'active',
    category: 'act',
    active: true,
    code: 'D4',
  },
  {
    name: 'Отчет 5',
    count: 3,
    date: '2024-02-01',
    status: 'rejected',
    category: 'report',
    active: false,
    code: 'E5',
  },
  {
    name: 'Заявка 6',
    count: 12,
    date: '2024-02-05',
    status: 'pending',
    category: 'doc',
    active: true,
    code: 'F6',
  },
  {
    name: 'Документ 7',
    count: 7,
    date: '2024-02-10',
    status: 'completed',
    category: 'contract',
    active: true,
    code: 'G7',
  },
  {
    name: 'Соглашение 8',
    count: 20,
    date: '2024-02-15',
    status: 'active',
    category: 'invoice',
    active: false,
    code: 'H8',
  },
  {
    name: 'Протокол 9',
    count: 6,
    date: '2024-02-20',
    status: 'pending',
    category: 'act',
    active: true,
    code: 'I9',
  },
  {
    name: 'Решение 10',
    count: 14,
    date: '2024-02-25',
    status: 'completed',
    category: 'report',
    active: true,
    code: 'J10',
  },
];

const meta: Meta<TableComponent> = {
  title: 'Components/Table',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        CardModule,
        FluidModule,
        TableModule,
        TreeTableModule,
      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    // =======================================================
    // MODE
    // =======================================================
    type: {
      control: 'select',
      options: ['table', 'tree'],
      description: 'Тип таблицы: обычная или древовидная',
      table: {
        category: 'Mode',
      },
    },

    // =======================================================
    // TABLE DATA
    // =======================================================
    tableColumns: {
      control: 'object',
      description: 'Конфигурация колонок для обычной таблицы',
      table: {
        category: 'Table Data',
      },
    },
    tableValue: {
      control: 'object',
      description: 'Данные для обычной таблицы',
      table: {
        category: 'Table Data',
      },
    },
    frozenTableColumns: {
      control: 'object',
      description: 'Замороженные колонки (PrimeNG 18 API)',
      table: {
        category: 'Table Data',
      },
    },

    // =======================================================
    // TREE TABLE DATA
    // =======================================================
    treeColumns: {
      control: 'object',
      description: 'Конфигурация колонок для древовидной таблицы',
      table: {
        category: 'Tree Table Data',
      },
    },
    treeValue: {
      control: 'object',
      description: 'Данные для древовидной таблицы',
      table: {
        category: 'Tree Table Data',
      },
    },
    frozenTreeColumns: {
      control: 'object',
      description: 'Замороженные колонки для древовидной таблицы',
      table: {
        category: 'Tree Table Data',
      },
    },

    // =======================================================
    // PAGINATION
    // =======================================================
    paginator: {
      control: 'boolean',
      description: 'Включить пагинацию',
      table: {
        category: 'Pagination',
      },
    },
    rows: {
      control: 'number',
      description: 'Количество строк на странице',
      table: {
        category: 'Pagination',
      },
    },
    rowsPerPageOptions: {
      control: 'object',
      description: 'Опции для выбора количества строк',
      table: {
        category: 'Pagination',
      },
    },
    totalRecords: {
      control: 'number',
      description: 'Общее количество записей (для lazy loading)',
      table: {
        category: 'Pagination',
      },
    },
    showCurrentPageReport: {
      control: 'boolean',
      description: 'Показывать отчет о текущей странице',
      table: {
        category: 'Pagination',
      },
    },
    showFirstLastIcon: {
      control: 'boolean',
      description: 'Показывать иконки первой/последней страницы',
      table: {
        category: 'Pagination',
      },
    },

    // =======================================================
    // SCROLL / RESIZE / LAYOUT
    // =======================================================
    scrollable: {
      control: 'boolean',
      description: 'Включить скроллирование',
      table: {
        category: 'Scroll & Layout',
      },
    },
    scrollHeight: {
      control: 'text',
      description: 'Высота для скролла (например: "200px")',
      table: {
        category: 'Scroll & Layout',
      },
    },
    resizableColumns: {
      control: 'boolean',
      description: 'Разрешить изменение ширины колонок',
      table: {
        category: 'Scroll & Layout',
      },
    },
    columnResizeMode: {
      control: 'select',
      options: ['fit', 'expand'],
      description: 'Режим изменения ширины колонок',
      table: {
        category: 'Scroll & Layout',
      },
    },
    reorderableColumns: {
      control: 'boolean',
      description: 'Разрешить перетаскивание колонок',
      table: {
        category: 'Scroll & Layout',
      },
    },
    autoLayout: {
      control: 'boolean',
      description:
        'Автоматическая раскладка таблицы (лучше оставить false с нашими стилями)',
      table: {
        category: 'Scroll & Layout',
      },
    },

    // =======================================================
    // SELECTION
    // =======================================================
    selectionMode: {
      control: 'select',
      options: [undefined, 'single', 'multiple'],
      description: 'Режим выбора строк',
      table: {
        category: 'Selection',
      },
    },
    dataKey: {
      control: 'text',
      description: 'Ключ данных для выборки (используется с selectionMode)',
      table: {
        category: 'Selection',
      },
    },

    // =======================================================
    // LOADING
    // =======================================================
    loading: {
      control: 'boolean',
      description: 'Показать индикатор загрузки',
      table: {
        category: 'Loading',
      },
    },
    lazy: {
      control: 'boolean',
      description: 'Ленивая загрузка данных',
      table: {
        category: 'Loading',
      },
    },

    // =======================================================
    // CONTENT
    // =======================================================
    emptyMessage: {
      control: 'text',
      description: 'Сообщение при пустой таблице',
      table: {
        category: 'Content',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Sandbox: Story = {
  args: {
    // Тип и данные (используем демо с фильтрами по умолчанию)
    type: 'table',
    tableColumns: filterDemoColumns,
    tableValue: filterDemoData,

    // Пагинация
    paginator: true,
    rows: 5,
    rowsPerPageOptions: [5, 10, 20],

    // Стили проекта
    showGridlines: true,

    // Редко используемые
    autoLayout: false,
    selectionMode: undefined,

    // Состояния
    loading: false,

    // Контент
    emptyMessage: 'Нет данных',
  },
  name: 'Песочница',
  parameters: {
    docs: {
      description: {
        story:
          'Таблица с разными типами фильтров: текстовый, числовой, дата, мультиселект, булевый. Используйте Controls для настройки.',
      },
    },
  },
};
