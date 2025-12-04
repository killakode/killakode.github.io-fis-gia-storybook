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
    state: {
      control: 'select',
      options: ['default', 'checked', 'disabled', 'disabled-checked', 'hover', 'focus'],
      description: 'Состояние радиокнопки для демонстрации',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Компонент радиокнопки с поддержкой состояний: default, checked, disabled, hover, focus',
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
    state: 'default',
  },
  render: (args) => ({
    props: {
      ...args,
      isChecked: args.state === 'checked' || args.state === 'disabled-checked',
      isDisabled: args.state === 'disabled' || args.state === 'disabled-checked',
      stateClass: args.state === 'hover' ? 'forced-hover' : args.state === 'focus' ? 'forced-focus' : '',
    },
    template: `
      <style>
        .forced-hover .p-radiobutton-box {
          --p-radiobutton-background: var(--global-light-gray-4-color) !important;
          --p-radiobutton-border-color: var(--global-blue-3-color) !important;
        }
        .forced-focus .p-radiobutton-box {
          --p-radiobutton-background: var(--global-light-gray-4-color) !important;
          --p-radiobutton-focus-border-color: var(--global-blue-3-color) !important;
          outline: 2px solid var(--global-blue-3-color);
          outline-offset: 2px;
        }
      </style>

      <div [class]="stateClass">
        <app-radio-button
          [label]="label"
          value="playground"
          name="playground-demo"
          [selectedValue]="isChecked ? 'playground' : ''"
          [disabled]="isDisabled">
        </app-radio-button>
      </div>
    `,
  }),
};

// ========================================
// STATES - Все состояния (только просмотр)
// ========================================
export const States: Story = {
  render: () => ({
    props: {},
    template: `
      <style>
        .forced-hover .p-radiobutton-box {
          --p-radiobutton-background: var(--global-light-gray-4-color) !important;
          --p-radiobutton-border-color: var(--global-blue-3-color) !important;
        }
        .forced-focus .p-radiobutton-box {
          --p-radiobutton-background: var(--global-light-gray-4-color) !important;
          --p-radiobutton-focus-border-color: var(--global-blue-3-color) !important;
          outline: 2px solid var(--global-blue-3-color);
          outline-offset: 2px;
        }
      </style>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3>Default State</h3>
          <div style="pointer-events: none;">
            <app-radio-button
              label="Unchecked option"
              value="opt1"
              name="state-demo-1">
            </app-radio-button>
          </div>
        </div>

        <div>
          <h3>Checked State</h3>
          <div style="pointer-events: none;">
            <app-radio-button
              label="Checked option"
              value="opt2"
              name="state-demo-2"
              selectedValue="opt2">
            </app-radio-button>
          </div>
        </div>

        <div>
          <h3>Hover State</h3>
          <div style="pointer-events: none;" class="forced-hover">
            <app-radio-button
              label="Hover state"
              value="opt-hover"
              name="state-demo-hover">
            </app-radio-button>
          </div>
        </div>

        <div>
          <h3>Focus State</h3>
          <div style="pointer-events: none;" class="forced-focus">
            <app-radio-button
              label="Focus state"
              value="opt-focus"
              name="state-demo-focus">
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
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация всех состояний радиокнопок: default, checked, hover, focus, disabled (unchecked/checked). Состояния зафиксированы для визуального просмотра.',
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
        <h3>Radio Group Example</h3>
        <p style="color: #666; font-size: 0.875rem;">Selected: {{ groupValue }}</p>

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

// ========================================
// MULTIPLE GROUPS - Несколько групп
// ========================================
export const MultipleGroups: Story = {
  render: () => ({
    props: {
      paymentValue: 'card',
      deliveryValue: 'standard',
    },
    template: `
      <div style="display: flex; gap: 3rem;">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <h3>Payment Method</h3>
          <p style="color: #666; font-size: 0.875rem;">Selected: {{ paymentValue }}</p>

          <app-radio-button
            label="Credit Card"
            value="card"
            name="payment"
            [(selectedValue)]="paymentValue">
          </app-radio-button>

          <app-radio-button
            label="PayPal"
            value="paypal"
            name="payment"
            [(selectedValue)]="paymentValue">
          </app-radio-button>

          <app-radio-button
            label="Bank Transfer"
            value="bank"
            name="payment"
            [(selectedValue)]="paymentValue">
          </app-radio-button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <h3>Delivery Method</h3>
          <p style="color: #666; font-size: 0.875rem;">Selected: {{ deliveryValue }}</p>

          <app-radio-button
            label="Standard (3-5 days)"
            value="standard"
            name="delivery"
            [(selectedValue)]="deliveryValue">
          </app-radio-button>

          <app-radio-button
            label="Express (1-2 days)"
            value="express"
            name="delivery"
            [(selectedValue)]="deliveryValue">
          </app-radio-button>

          <app-radio-button
            label="Next Day"
            value="next"
            name="delivery"
            [(selectedValue)]="deliveryValue">
          </app-radio-button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Несколько независимых групп радиокнопок с разными name',
      },
    },
  },
};

// ========================================
// WITH LONG LABELS - Длинные метки
// ========================================
export const WithLongLabels: Story = {
  render: () => ({
    props: {
      termsValue: 'agree',
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        <h3>Radio with Long Text</h3>

        <app-radio-button
          label="I agree to the terms and conditions, privacy policy, and data processing agreement"
          value="agree"
          name="terms"
          [(selectedValue)]="termsValue">
        </app-radio-button>

        <app-radio-button
          label="I disagree and wish to proceed without accepting the terms"
          value="disagree"
          name="terms"
          [(selectedValue)]="termsValue">
        </app-radio-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Радиокнопки с длинными текстовыми метками',
      },
    },
  },
};
