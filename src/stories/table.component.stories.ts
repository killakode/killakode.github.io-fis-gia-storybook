import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from '../app/components/table/table.component';

const bigTableData = Array.from({ length: 120 }).map((_, i) => ({
  name: 'Документ ' + (i + 1),
  count: Math.round(Math.random() * 50),
  code: 'C' + (1000 + i),
}));

const bigTreeData = Array.from({ length: 30 }).map((_, i) => ({
  data: { name: 'Раздел ' + (i + 1), count: 10 + i, code: 'R' + i },
  children: Array.from({ length: 5 }).map((_, j) => ({
    data: {
      name: `Подраздел ${i + 1}.${j + 1}`,
      count: j * 2,
      code: `R${i}-${j}`,
    },
  })),
}));

const meta: Meta<TableComponent> = {
  title: 'Components/Table',
  component: TableComponent,
  tags: ['autodocs'],

  argTypes: {
    type: {
      control: 'select',
      options: ['table', 'tree'],
      description: 'Тип таблицы',
      table: { category: 'Mode' },
    },

    tableColumns: { control: false, table: { disable: true } },
    tableValue: { control: false, table: { disable: true } },

    treeColumns: { control: false, table: { disable: true } },
    treeValue: { control: false, table: { disable: true } },

    paginator: { control: 'boolean', table: { category: 'Pagination' } },
    rows: { control: 'number', table: { category: 'Pagination' } },
    rowsPerPageOptions: {
      control: 'object',
      table: { category: 'Pagination' },
    },
    totalRecords: { control: 'number', table: { category: 'Pagination' } },

    scrollable: { control: 'boolean', table: { category: 'Layout' } },
    scrollHeight: { control: 'text', table: { category: 'Layout' } },
    resizableColumns: { control: 'boolean', table: { category: 'Layout' } },
    columnResizeMode: {
      control: 'select',
      options: ['fit', 'expand'],
      table: { category: 'Layout' },
    },
    reorderableColumns: { control: 'boolean', table: { category: 'Layout' } },
    autoLayout: { control: 'boolean', table: { category: 'Layout' } },

    selectionMode: {
      control: 'select',
      options: ['single', 'multiple', undefined],
      table: { category: 'Selection' },
    },
    emptyMessage: { control: 'text', table: { category: 'Content' } },
  },

  parameters: {
    docs: {
      description: {
        component: `
# Table Component

Универсальная таблица с поддержкой:

- p-table
- p-treeTable
- сортировки
- фильтров
- ресайза колонок
- скролла
- пагинации
- шаблонов ячеек
- frozenColumns
- Lazy Loading

Стили Storybook не влияют на продакшен.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<TableComponent>;

// ----------------------------------------------------------
// PLAYGROUND
// ----------------------------------------------------------
export const Playground: Story = {
  args: {
    type: 'table',

    tableColumns: TableComponent.defaultTableColumns,
    tableValue: bigTableData,

    treeColumns: TableComponent.defaultTreeColumns,
    treeValue: bigTreeData,

    paginator: true,
    rows: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    totalRecords: bigTableData.length,

    scrollable: false,
    resizableColumns: false,
    columnResizeMode: 'fit',
    reorderableColumns: false,
    autoLayout: false,

    emptyMessage: 'Нет данных',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🎮 Playground

Интерактивная песочница, в которой можно переключать режимы таблиц,
тестировать пагинацию, ресайз колонок, скролл и т.д.
        `,
      },
    },
  },
};

// ----------------------------------------------------------
// TABLE BASIC
// ----------------------------------------------------------
export const TableBasic: Story = {
  args: {
    type: 'table',
    tableColumns: TableComponent.defaultTableColumns,
    tableValue: bigTableData,
    paginator: true,
    rows: 10,
    totalRecords: bigTableData.length,
  },

  parameters: {
    docs: {
      description: {
        story: `
# 📝 Базовая таблица

Плоская таблица с сортировкой и фильтрами.
        `,
      },
    },
  },
};

// ----------------------------------------------------------
// TREETABLE BASIC
// ----------------------------------------------------------
export const TreeTableBasic: Story = {
  args: {
    type: 'tree',
    treeColumns: TableComponent.defaultTreeColumns,
    treeValue: bigTreeData,
    paginator: true,
    rows: 10,
    totalRecords: bigTreeData.length,
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🌳 Дерево-таблица (p-treeTable)

Поддерживает вложенные узлы, сортировку,
фильтры и пагинацию.
        `,
      },
    },
  },
};
