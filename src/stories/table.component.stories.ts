import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FluidModule } from 'primeng/fluid';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import {
  DataTableComponent,
  TableColumnConfig,
  TreeColumnConfig,
} from '../app/components/table/table.component';

// =========================================================
// КОНФИГУРАЦИЯ 1: Демо с фильтрами
// =========================================================
const filterDemoColumns: TableColumnConfig[] = [
  {
    field: 'id',
    header: 'ID',
    width: '80px',
    sortable: true,
    filterable: true,
    filterType: 'numeric',
  },
  {
    field: 'name',
    header: 'Название',
    width: '200px',
    sortable: true,
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'count',
    header: 'Кол-во',
    width: '120px',
    sortable: true,
    filterable: true,
    filterType: 'numeric',
  },
  {
    field: 'date',
    header: 'Дата создания',
    width: '150px',
    filterable: true,
    filterType: 'date',
  },
  {
    field: 'status',
    header: 'Статус',
    width: '140px',
    filterable: true,
    filterType: 'multiselect',
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
    width: '160px',
    filterable: true,
    filterType: 'multiselect',
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
    width: '120px',
    filterable: true,
    filterType: 'boolean',
  },
  {
    field: 'code',
    header: 'Код',
    width: '100px',
    filterable: true,
    filterType: 'text',
  },
];

const filterDemoData = [
  {
    id: 1,
    name: 'Документ 1',
    count: 10,
    date: '2024-01-15',
    status: 'active',
    category: 'doc',
    active: true,
    code: 'A1',
  },
  {
    id: 2,
    name: 'Договор 2',
    count: 5,
    date: '2024-01-20',
    status: 'pending',
    category: 'contract',
    active: false,
    code: 'B2',
  },
  {
    id: 3,
    name: 'Счет 3',
    count: 8,
    date: '2024-01-25',
    status: 'completed',
    category: 'invoice',
    active: true,
    code: 'C3',
  },
  {
    id: 4,
    name: 'Акт 4',
    count: 15,
    date: '2024-01-30',
    status: 'active',
    category: 'act',
    active: true,
    code: 'D4',
  },
  {
    id: 5,
    name: 'Отчет 5',
    count: 3,
    date: '2024-02-01',
    status: 'rejected',
    category: 'report',
    active: false,
    code: 'E5',
  },
  {
    id: 6,
    name: 'Заявка 6',
    count: 12,
    date: '2024-02-05',
    status: 'pending',
    category: 'doc',
    active: true,
    code: 'F6',
  },
  {
    id: 7,
    name: 'Документ 7',
    count: 7,
    date: '2024-02-10',
    status: 'completed',
    category: 'contract',
    active: true,
    code: 'G7',
  },
  {
    id: 8,
    name: 'Соглашение 8',
    count: 20,
    date: '2024-02-15',
    status: 'active',
    category: 'invoice',
    active: false,
    code: 'H8',
  },
  {
    id: 9,
    name: 'Протокол 9',
    count: 6,
    date: '2024-02-20',
    status: 'pending',
    category: 'act',
    active: true,
    code: 'I9',
  },
  {
    id: 10,
    name: 'Решение 10',
    count: 14,
    date: '2024-02-25',
    status: 'completed',
    category: 'report',
    active: true,
    code: 'J10',
  },
];

// =========================================================
// КОНФИГУРАЦИЯ 2: Демо со скроллом (широкая таблица)
// =========================================================
const scrollDemoColumns: TableColumnConfig[] = [
  {
    field: 'id',
    header: 'ID',
    width: '80px',
    sortable: true,
    filterable: true,
    filterType: 'numeric',
  },
  {
    field: 'name',
    header: 'Наименование',
    width: '200px',
    sortable: true,
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'category',
    header: 'Категория',
    width: '150px',
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'vendor',
    header: 'Поставщик',
    width: '180px',
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'price',
    header: 'Цена',
    width: '120px',
    sortable: true,
    filterable: true,
    filterType: 'numeric',
  },
  {
    field: 'quantity',
    header: 'Количество',
    width: '130px',
    sortable: true,
    filterable: true,
    filterType: 'numeric',
  },
  {
    field: 'status',
    header: 'Статус',
    width: '140px',
    filterable: true,
    filterType: 'multiselect',
    filterOptions: [
      { label: 'В наличии', value: 'in_stock' },
      { label: 'Под заказ', value: 'on_order' },
      { label: 'Нет в наличии', value: 'out_of_stock' },
      { label: 'Снят с производства', value: 'discontinued' },
    ],
  },
  {
    field: 'warehouse',
    header: 'Склад',
    width: '150px',
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'createdDate',
    header: 'Дата создания',
    width: '150px',
    filterable: true,
    filterType: 'date',
  },
  {
    field: 'updatedDate',
    header: 'Дата обновления',
    width: '150px',
    filterable: true,
    filterType: 'date',
  },
  {
    field: 'responsible',
    header: 'Ответственный',
    width: '170px',
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'department',
    header: 'Отдел',
    width: '140px',
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'project',
    header: 'Проект',
    width: '160px',
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'priority',
    header: 'Приоритет',
    width: '120px',
    filterable: true,
    filterType: 'multiselect',
    filterOptions: [
      { label: 'Высокий', value: 'high' },
      { label: 'Средний', value: 'medium' },
      { label: 'Низкий', value: 'low' },
    ],
  },
  {
    field: 'notes',
    header: 'Примечания',
    width: '200px',
    filterable: true,
    filterType: 'text',
  },
];

const scrollDemoData = [
  {
    id: 1,
    name: 'Ноутбук Dell XPS 13',
    category: 'Электроника',
    vendor: 'Dell',
    price: 125000,
    quantity: 8,
    status: 'in_stock',
    warehouse: 'Основной',
    createdDate: '2024-01-10',
    updatedDate: '2024-03-15',
    responsible: 'Иванов И.И.',
    department: 'IT',
    project: 'Оборудование',
    priority: 'high',
    notes: 'Для новых сотрудников',
  },
  {
    id: 2,
    name: 'Монитор Samsung 27"',
    category: 'Электроника',
    vendor: 'Samsung',
    price: 35000,
    quantity: 15,
    status: 'in_stock',
    warehouse: 'Основной',
    createdDate: '2024-02-05',
    updatedDate: '2024-03-10',
    responsible: 'Петров П.П.',
    department: 'IT',
    project: 'Оборудование',
    priority: 'medium',
    notes: '4K разрешение',
  },
  {
    id: 3,
    name: 'Клавиатура механическая',
    category: 'Аксессуары',
    vendor: 'Logitech',
    price: 8500,
    quantity: 25,
    status: 'in_stock',
    warehouse: 'Основной',
    createdDate: '2024-01-20',
    updatedDate: '2024-03-05',
    responsible: 'Сидоров С.С.',
    department: 'IT',
    project: 'Оборудование',
    priority: 'low',
    notes: 'RGB подсветка',
  },
  {
    id: 4,
    name: 'Мышь беспроводная',
    category: 'Аксессуары',
    vendor: 'Razer',
    price: 6500,
    quantity: 0,
    status: 'out_of_stock',
    warehouse: 'Основной',
    createdDate: '2023-12-15',
    updatedDate: '2024-02-28',
    responsible: 'Иванов И.И.',
    department: 'IT',
    project: 'Оборудование',
    priority: 'medium',
    notes: 'Ожидается поставка',
  },
  {
    id: 5,
    name: 'Проектор Epson',
    category: 'Оборудование',
    vendor: 'Epson',
    price: 89000,
    quantity: 3,
    status: 'on_order',
    warehouse: 'Склад 2',
    createdDate: '2024-02-10',
    updatedDate: '2024-03-12',
    responsible: 'Петров П.П.',
    department: 'Маркетинг',
    project: 'Конференц-зал',
    priority: 'high',
    notes: 'Для презентаций',
  },
  {
    id: 6,
    name: 'Серверная стойка',
    category: 'Оборудование',
    vendor: 'HP',
    price: 120000,
    quantity: 2,
    status: 'in_stock',
    warehouse: 'Основной',
    createdDate: '2024-01-05',
    updatedDate: '2024-02-20',
    responsible: 'Сидоров С.С.',
    department: 'IT',
    project: 'Серверная',
    priority: 'high',
    notes: '42U высота',
  },
  {
    id: 7,
    name: 'Сетевой коммутатор',
    category: 'Сетевое оборудование',
    vendor: 'Cisco',
    price: 45000,
    quantity: 5,
    status: 'in_stock',
    warehouse: 'Основной',
    createdDate: '2024-02-15',
    updatedDate: '2024-03-08',
    responsible: 'Иванов И.И.',
    department: 'IT',
    project: 'Сеть',
    priority: 'medium',
    notes: '48 портов',
  },
  {
    id: 8,
    name: 'ИБП APC',
    category: 'Оборудование',
    vendor: 'APC',
    price: 28000,
    quantity: 7,
    status: 'in_stock',
    warehouse: 'Склад 2',
    createdDate: '2024-01-25',
    updatedDate: '2024-03-01',
    responsible: 'Петров П.П.',
    department: 'IT',
    project: 'Серверная',
    priority: 'medium',
    notes: '1500VA',
  },
  {
    id: 9,
    name: 'Веб-камера 4K',
    category: 'Электроника',
    vendor: 'Logitech',
    price: 12000,
    quantity: 18,
    status: 'in_stock',
    warehouse: 'Основной',
    createdDate: '2024-02-28',
    updatedDate: '2024-03-14',
    responsible: 'Сидоров С.С.',
    department: 'IT',
    project: 'Удаленная работа',
    priority: 'low',
    notes: 'С микрофоном',
  },
  {
    id: 10,
    name: 'Беспроводная гарнитура',
    category: 'Аксессуары',
    vendor: 'Jabra',
    price: 9500,
    quantity: 12,
    status: 'in_stock',
    warehouse: 'Основной',
    createdDate: '2024-01-30',
    updatedDate: '2024-03-07',
    responsible: 'Иванов И.И.',
    department: 'Продажи',
    project: 'Call-центр',
    priority: 'high',
    notes: 'Шумоподавление',
  },
];

// =========================================================
// КОНФИГУРАЦИЯ 3: TreeTable данные
// =========================================================
const treeTableColumns: TreeColumnConfig[] = [
  {
    field: 'name',
    header: 'Наименование',
    sortable: true,
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'size',
    header: 'Размер',
    sortable: true,
    filterable: true,
    filterType: 'numeric',
  },
  {
    field: 'type',
    header: 'Тип',
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'modified',
    header: 'Дата изменения',
    filterable: true,
    filterType: 'date',
  },
  {
    field: 'owner',
    header: 'Владелец',
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'status',
    header: 'Статус',
    filterable: true,
    filterType: 'multiselect',
    filterOptions: [
      { label: 'Активный', value: 'active' },
      { label: 'В архиве', value: 'archived' },
      { label: 'Черновик', value: 'draft' },
      { label: 'Удален', value: 'deleted' },
    ],
  },
];

const treeTableData: TreeNode[] = [
  {
    key: '0',
    data: {
      name: 'Документы компании',
      size: '',
      type: 'Папка',
      modified: '2024-03-20',
      owner: 'Администратор',
      status: 'active',
    },
    children: [
      {
        key: '0-0',
        data: {
          name: 'Договоры',
          size: '',
          type: 'Папка',
          modified: '2024-03-19',
          owner: 'Иванов И.И.',
          status: 'active',
        },
        children: [
          {
            key: '0-0-0',
            data: {
              name: 'Договор аренды офиса.pdf',
              size: '2.4 MB',
              type: 'PDF документ',
              modified: '2024-03-15',
              owner: 'Иванов И.И.',
              status: 'active',
            },
          },
          {
            key: '0-0-1',
            data: {
              name: 'Договор с поставщиком.docx',
              size: '1.8 MB',
              type: 'Word документ',
              modified: '2024-03-10',
              owner: 'Петров П.П.',
              status: 'active',
            },
          },
        ],
      },
      {
        key: '0-1',
        data: {
          name: 'Финансовые отчеты',
          size: '',
          type: 'Папка',
          modified: '2024-03-18',
          owner: 'Петров П.П.',
          status: 'active',
        },
        children: [
          {
            key: '0-1-0',
            data: {
              name: 'Отчет за Q1 2024.xlsx',
              size: '4.2 MB',
              type: 'Excel файл',
              modified: '2024-03-31',
              owner: 'Петров П.П.',
              status: 'active',
            },
          },
        ],
      },
    ],
  },
  {
    key: '1',
    data: {
      name: 'Персональные файлы',
      size: '',
      type: 'Папка',
      modified: '2024-03-20',
      owner: 'Иванов И.И.',
      status: 'active',
    },
    children: [
      {
        key: '1-0',
        data: {
          name: 'Резюме и сертификаты',
          size: '',
          type: 'Папка',
          modified: '2024-03-01',
          owner: 'Иванов И.И.',
          status: 'active',
        },
        children: [
          {
            key: '1-0-0',
            data: {
              name: 'Резюме Иванов И.И..pdf',
              size: '456 KB',
              type: 'PDF документ',
              modified: '2024-02-15',
              owner: 'Иванов И.И.',
              status: 'active',
            },
          },
        ],
      },
    ],
  },
];

// =========================================================
// ЗАМОРОЖЕННЫЕ КОЛОНКИ
// =========================================================
const frozenColumnsForTesting: TableColumnConfig[] = [
  {
    field: 'id',
    header: 'ID',
    width: '80',
    sortable: true,
    filterable: true,
    filterType: 'numeric',
  },
  {
    field: 'name',
    header: 'Наименование',
    width: '200',
    sortable: true,
    filterable: true,
    filterType: 'text',
  },
  {
    field: 'category',
    header: 'Категория',
    width: '150',
    filterable: true,
    filterType: 'text',
  },
];

const meta: Meta<DataTableComponent> = {
  title: 'Components/Table',
  component: DataTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        CardModule,
        FluidModule,
        PrimeTableModule,
        TreeTableModule,
      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['table', 'tree'],
      description: 'Тип таблицы',
    },
    tableColumns: { control: 'object' },
    tableValue: { control: 'object' },
    frozenTableColumns: { control: 'object' },
    treeColumns: { control: 'object' },
    treeValue: { control: 'object' },
    frozenTreeColumns: { control: 'object' },
    paginator: { control: 'boolean' },
    rows: { control: 'number' },
    rowsPerPageOptions: { control: 'object' },
    scrollable: { control: 'boolean' },
    scrollHeight: { control: 'text' },
    showGridlines: { control: 'boolean' },
    selectionMode: {
      control: 'select',
      options: [undefined, 'single', 'multiple'],
    },
    loading: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DataTableComponent>;

// =========================================================
// ИСТОРИЯ 1: Песочница (базовая таблица с фильтрами)
// =========================================================
export const Sandbox: Story = {
  args: {
    type: 'table',
    tableColumns: filterDemoColumns,
    tableValue: filterDemoData,
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [5, 10, 20],
    showGridlines: true,
    selectionMode: undefined,
    loading: false,
    emptyMessage: 'Нет данных',
  },
  name: 'Песочница',
  parameters: {
    docs: {
      description: {
        story: 'Таблица с разными типами фильтров',
      },
    },
  },
};

// =========================================================
// ИСТОРИЯ 2: Таблица со скроллом + замороженные колонки
// =========================================================
export const TableHorizontalScrollWithFrozen: Story = {
  args: {
    type: 'table',
    tableColumns: scrollDemoColumns,
    tableValue: scrollDemoData,
    frozenTableColumns: frozenColumnsForTesting,
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [5, 10, 20],
    scrollable: true,
    scrollHeight: '380px',
    showGridlines: true,
    selectionMode: undefined,
    loading: false,
    emptyMessage: 'Нет данных',
  },
  name: '2. Скролл + замороженные колонки',
  parameters: {
    docs: {
      description: {
        story: 'Таблица с замороженными колонками и скроллом',
      },
    },
  },
};

// =========================================================
// ИСТОРИЯ 3: Простой TreeTable
// =========================================================
export const SimpleTreeTable: Story = {
  args: {
    type: 'tree',
    treeColumns: treeTableColumns,
    treeValue: treeTableData,
    // Добавляем поддержку фильтров
    filterValues: {}, // Начальные значения фильтров
    paginator: false,
    scrollable: true,
    scrollHeight: '400px',
    showGridlines: true,
    selectionMode: 'single',
    loading: false,
    emptyMessage: 'Нет данных',
  },
  name: '3. Простой TreeTable',
  parameters: {
    docs: {
      description: {
        story:
          'Базовая древовидная таблица с кастомными фильтрами в заголовке.',
      },
    },
  },
};

// =========================================================
// ИСТОРИЯ 4: TreeTable с чекбоксами
// =========================================================
export const TreeTableWithCheckboxes: Story = {
  args: {
    type: 'tree',
    treeColumns: treeTableColumns,
    treeValue: treeTableData,
    selectionMode: 'multiple',
    paginator: true,
    rows: 5,
    rowsPerPageOptions: [5, 10, 20],
    scrollable: true,
    scrollHeight: '400px',
    showGridlines: true,
    loading: false,
    emptyMessage: 'Нет данных',
  },
  name: '4. TreeTable с чекбоксами',
  parameters: {
    docs: {
      description: {
        story: 'Древовидная таблица с выбором через чекбоксы',
      },
    },
  },
};
