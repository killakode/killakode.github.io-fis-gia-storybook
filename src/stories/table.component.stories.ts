import { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from '../app/components/table/table.component';

const meta: Meta<TableComponent> = {
  title: 'Components/Table',
  component: TableComponent,
  tags: ['autodocs'],
  argTypes: {
    showGridlines: {
      control: 'boolean',
      description: 'Показывать линии сетки таблицы',
    },
    paginator: {
      control: 'boolean',
      description: 'Включить пагинацию',
    },
    rows: {
      control: 'number',
      description: 'Количество строк на странице',
    },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

// Базовая таблица
export const Basic: Story = {
  args: {
    columns: [
      { field: 'id', header: 'ID', sortable: true, width: '100px' },
      { field: 'name', header: 'Имя', sortable: true, filterable: true },
      { field: 'email', header: 'Email', filterable: true },
      { field: 'status', header: 'Статус' },
    ],
    data: [
      {
        id: 1,
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        status: 'Активен',
      },
      {
        id: 2,
        name: 'Петр Петров',
        email: 'petr@example.com',
        status: 'Неактивен',
      },
      {
        id: 3,
        name: 'Сидор Сидоров',
        email: 'sidor@example.com',
        status: 'Активен',
      },
    ],
    showGridlines: true,
    paginator: false,
  },
};

// С пагинацией
export const WithPagination: Story = {
  args: {
    ...Basic.args,
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [10, 25, 50],
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Пользователь ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: i % 2 === 0 ? 'Активен' : 'Неактивен',
    })),
  },
};

// Пустая таблица
export const Empty: Story = {
  args: {
    ...Basic.args,
    data: [],
    emptyMessage: 'Не найдено данных, удовлетворяющих запросу',
  },
};
