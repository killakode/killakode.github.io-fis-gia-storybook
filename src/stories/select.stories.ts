// select.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import {
  SelectComponent,
  SelectOption,
} from '../app/components/select/select.component';

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Массив опций для выбора',
    },
    placeholder: {
      control: 'text',
      description: 'Текст placeholder когда ничего не выбрано',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    showClear: {
      control: 'boolean',
      description: 'Показать кнопку очистки выбранного значения',
    },
    filter: {
      control: 'boolean',
      description: 'Включить поиск/фильтрацию опций',
    },
    invalid: {
      control: 'boolean',
      description: 'Состояние ошибки валидации',
    },
    appendTo: {
      control: 'select',
      options: ['body', null],
      description: 'Куда монтировать overlay (body или родитель)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Компонент выпадающего списка с поддержкой поиска, очистки, валидации и различных состояний. Поддерживает длинные тексты с переносом строк.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

const defaultOptions: SelectOption[] = [
  { label: 'Вариант 1', value: 1 },
  { label: 'Вариант 2', value: 2 },
  { label: 'Вариант 3', value: 3 },
  {
    label: 'Длинный текст варианта который переносится на несколько строк',
    value: 4,
  },
  { label: 'Вариант 5', value: 5, disabled: true },
];

const manyOptions: SelectOption[] = Array.from({ length: 50 }, (_, i) => ({
  label: `Вариант ${i + 1}`,
  value: i + 1,
}));

// ========================================
// PLAYGROUND - Интерактивная песочница
// ========================================
export const Playground: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    disabled: false,
    showClear: false,
    filter: false,
    invalid: false,
  },
};

// ========================================
// ALL STATES - Все состояния
// ========================================
export const AllStates: Story = {
  render: () => ({
    props: {
      defaultOptions,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h3>Default</h3>
          <app-select [options]="defaultOptions" placeholder="Выберите значение" />
        </div>

        <div>
          <h3>With Selected Value</h3>
          <app-select [options]="defaultOptions" placeholder="Выберите значение" [value]="2" />
        </div>

        <div>
          <h3>Invalid</h3>
          <app-select [options]="defaultOptions" placeholder="Выберите значение" [invalid]="true" />
        </div>

        <div>
          <h3>Disabled</h3>
          <app-select [options]="defaultOptions" placeholder="Выберите значение" [disabled]="true" />
        </div>

        <div>
          <h3>With Clear Button</h3>
          <app-select [options]="defaultOptions" placeholder="Выберите значение" [showClear]="true" [value]="1" />
        </div>

        <div>
          <h3>With Filter</h3>
          <app-select [options]="defaultOptions" placeholder="Выберите значение" [filter]="true" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация всех состояний: default, with value, invalid, disabled, with clear, with filter',
      },
    },
  },
};

// ========================================
// BASIC VARIANTS - Базовые варианты
// ========================================
export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
  },
  parameters: {
    docs: {
      description: {
        story: 'Стандартный выпадающий список',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    value: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Выпадающий список с предвыбранным значением',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    options: [
      { label: 'Короткий текст', value: 1 },
      {
        label:
          'Очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень длинный текст опции, который должен переноситься на несколько строк и корректно отображаться в выпадающем списке',
        value: 2,
      },
      { label: 'Обычная опция', value: 3 },
    ],
    placeholder: 'Выберите значение',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Список с длинными текстами, которые переносятся на несколько строк',
      },
    },
  },
};

// ========================================
// STATES - Состояния
// ========================================
export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    disabled: true,
    value: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключенное состояние списка',
      },
    },
  },
};

export const Invalid: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    invalid: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Состояние ошибки валидации (красная рамка)',
      },
    },
  },
};

// ========================================
// FEATURES - Функциональность
// ========================================
export const WithClear: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    showClear: true,
    value: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Список с кнопкой очистки выбранного значения',
      },
    },
  },
};

export const WithFilter: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Выберите значение',
    filter: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Список с поиском/фильтрацией опций',
      },
    },
  },
};

export const ManyOptions: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Выберите значение',
    filter: true,
    showClear: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Список с большим количеством опций, поиском и кастомным скроллбаром',
      },
    },
  },
};


