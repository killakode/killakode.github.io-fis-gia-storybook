// radio-button.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { RadioButtonComponent } from '../app/components/radio-button/radio-button.component';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

const meta: Meta<RadioButtonComponent> = {
  title: 'Components/RadioButton',
  component: RadioButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст метки радиокнопки',
    },
    value: {
      control: 'text',
      description: 'Значение радиокнопки',
    },
    name: {
      control: 'text',
      description: 'Имя группы (для объединения радиокнопок)',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    selectedValue: {
      control: 'text',
      description: 'Текущее выбранное значение в группе',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Компонент радиокнопки с поддержкой состояний: default, hover, checked, disabled, focus',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;

// ========================================
// PLAYGROUND - Интерактивная песочница
// ========================================
export const Playground: Story = {
  args: {
    label: 'Option 1',
    value: 'option1',
    name: 'demo',
    disabled: false,
    selectedValue: '',
  },
};

// ========================================
// STATES - Все состояния
// ========================================
export const States: Story = {
  render: () => ({
    props: {},
    template: `
      <style>
        .state-demo-readonly input {
          pointer-events: none;
        }
        .state-demo-readonly label {
          pointer-events: none;
          user-select: none;
        }
      </style>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3>Default State</h3>
          <div class="state-demo-readonly">
            <app-radio-button
              label="Unchecked option"
              value="opt1"
              name="state-demo-1">
            </app-radio-button>
          </div>
        </div>

        <div>
          <h3>Checked State</h3>
          <div class="state-demo-readonly">
            <app-radio-button
              label="Checked option"
              value="opt2"
              name="state-demo-2"
              selectedValue="opt2">
            </app-radio-button>
          </div>
        </div>

        <div>
          <h3>Disabled States</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <app-radio-button
              label="Disabled unchecked"
              value="opt3"
              name="state-demo-3"
              [disabled]="true">
            </app-radio-button>
            <app-radio-button
              label="Disabled checked"
              value="opt4"
              name="state-demo-4"
              selectedValue="opt4"
              [disabled]="true">
            </app-radio-button>
          </div>
        </div>

        <div>
          <h3>Hover State (статичный)</h3>
          <style>
            .forced-hover .p-radiobutton-box {
              --p-radiobutton-background: var(--global-light-gray-4-color) !important;
              --p-radiobutton-border-color: var(--global-blue-3-color) !important;
            }
          </style>
          <div class="state-demo-readonly forced-hover">
            <app-radio-button
              label="Hover state"
              value="opt5"
              name="state-demo-5">
            </app-radio-button>
          </div>
        </div>

        <div>
          <h3>Focus State (статичный)</h3>
          <style>
            .forced-focus .p-radiobutton-box {
              --p-radiobutton-background: var(--global-light-gray-4-color) !important;
              --p-radiobutton-focus-border-color: var(--global-blue-3-color) !important;
              outline: 2px solid var(--global-blue-3-color);
              outline-offset: 2px;
            }
          </style>
          <div class="state-demo-readonly forced-focus">
            <app-radio-button
              label="Focus state"
              value="opt6"
              name="state-demo-6">
            </app-radio-button>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация всех состояний радиокнопок: default, checked, disabled, hover, focus. Состояния зафиксированы для визуального просмотра.',
      },
    },
  },
};

// ========================================
// GROUP - Группа радиокнопок
// ========================================
export const Group: Story = {
  render: () => ({
    props: {
      groupValue: 'opt1',
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">

        <app-radio-button
          label="Option 1"
          value="opt1"
          name="group1"
          [(selectedValue)]="groupValue">
        </app-radio-button>

        <app-radio-button
          label="Option 2"
          value="opt2"
          name="group1"
          [(selectedValue)]="groupValue">
        </app-radio-button>

        <app-radio-button
          label="Option 3"
          value="opt3"
          name="group1"
          [(selectedValue)]="groupValue">
        </app-radio-button>

        <app-radio-button
          label="Option 4 (disabled)"
          value="opt4"
          name="group1"
          [(selectedValue)]="groupValue"
          [disabled]="true">
        </app-radio-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Пример группы радиокнопок с общим name. Только одна кнопка может быть выбрана одновременно.',
      },
    },
  },
};
