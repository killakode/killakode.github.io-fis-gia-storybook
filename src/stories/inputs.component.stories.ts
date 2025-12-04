import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from '../app/components/input/input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст label над полем ввода',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder текст внутри поля',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number'],
      description: 'Тип input элемента',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения',
    },
    invalid: {
      control: 'boolean',
      description: 'Состояние ошибки валидации',
    },
    errorMessage: {
      control: 'text',
      description:
        'Текст сообщения об ошибке (если пусто - показывается дефолтный)',
    },
    showIcon: {
      control: 'boolean',
      description: 'Показать иконку поиска слева',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Компонент текстового поля с поддержкой FloatLabel, валидации, иконок и различных состояний',
      },
    },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

// ========================================
// PLAYGROUND - Интерактивная песочница
// ========================================
export const Playground: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'Введите имя',
    type: 'text',
    disabled: false,
    readonly: false,
    invalid: false,
    errorMessage: '',
    showIcon: false,
  },
};

// ========================================
// BASIC VARIANTS - Базовые варианты
// ========================================
export const Default: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'Введите имя',
  },
  parameters: {
    docs: {
      description: {
        story: 'Стандартное текстовое поле с label',
      },
    },
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Поиск...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода без label, только с placeholder',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'user@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле с предзаполненным значением',
      },
    },
  },
};

// ========================================
// STATES - Состояния
// ========================================
export const Disabled: Story = {
  args: {
    label: 'Заблокированное поле',
    value: 'Нельзя редактировать',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключенное состояние поля',
      },
    },
  },
};

export const Readonly: Story = {
  args: {
    label: 'Только для чтения',
    value: 'Константное значение',
    readonly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Режим только для чтения (без рамки и отступов)',
      },
    },
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    invalid: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Состояние ошибки с дефолтным сообщением об ошибке',
      },
    },
  },
};

// ========================================
// INPUT TYPES - Типы полей
// ========================================
export const Password: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле для ввода пароля',
      },
    },
  },
};

export const SearchField: Story = {
  args: {
    type: 'text',
    placeholder: 'Поиск по документам...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле поиска без label',
      },
    },
  },
};

// ========================================
// WITH ICON - С иконкой
// ========================================
export const WithIcon: Story = {
  args: {
    label: 'Поиск',
    type: 'text',
    placeholder: 'Введите запрос',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле с иконкой поиска слева',
      },
    },
  },
};

export const WithIconNoLabel: Story = {
  args: {
    type: 'text',
    placeholder: 'Поиск...',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле с иконкой без label',
      },
    },
  },
};

// ========================================
// ALL STATES - Все состояния
// ========================================
export const AllStates: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h3>Default</h3>
          <app-input label="Email" placeholder="example@mail.com" />
        </div>

        <div>
          <h3>With Value</h3>
          <app-input label="Email" value="user@example.com" />
        </div>

        <div>
          <h3>Invalid</h3>
          <app-input label="Email" value="invalid-email" [invalid]="true" placeholder="example@mail.com"/>
        </div>

        <div>
          <h3>Disabled</h3>
          <app-input label="Email" value="disabled@mail.com" [disabled]="true" placeholder="example@mail.com" />
        </div>

        <div>
          <h3>Readonly</h3>
          <app-input label="Email" value="readonly@mail.com" [readonly]="true" placeholder="example@mail.com" />
        </div>

        <div>
          <h3>With Icon</h3>
          <app-input label="Search" placeholder="Type to search..." [showIcon]="true" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация всех состояний: default, with value, invalid, disabled, readonly, with icon',
      },
    },
  },
};
