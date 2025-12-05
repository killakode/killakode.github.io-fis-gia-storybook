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
      options: [
        'default',
        'checked',
        'disabled',
        'disabled-checked',
        'hover',
        'hover-checked',
        'focus',
      ],
      description: 'Состояние радиокнопки для демонстрации',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Компонент радиокнопки с поддержкой состояний: default, checked, disabled, hover, hover-checked, focus',
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
  render: (args) => ({
    props: {
      state: args.state,
      interactiveGroupValue: 'opt1', // ← Добавили переменную
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0;">Single Radio (State Demo)</h4>
          <p style="color: #666; font-size: 0.875rem; margin: 0 0 1rem 0;">
            Current state: <strong>{{ state }}</strong>
          </p>

          <app-radio-button
            label="Demo radio button"
            value="demo"
            name="single-demo"
            [state]="state">
          </app-radio-button>
        </div>

        <div style="border-top: 1px solid #e0e0e0; padding-top: 1rem;">
          <h4 style="margin: 0 0 0.5rem 0;">Interactive Group (Normal Behavior)</h4>
          <p style="color: #666; font-size: 0.875rem; margin: 0 0 1rem 0;">
            Try clicking to see real interaction | Selected: <strong>{{ interactiveGroupValue }}</strong>
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <app-radio-button
              label="Option 1"
              value="opt1"
              name="interactive-group"
              [(selectedValue)]="interactiveGroupValue">
            </app-radio-button>

            <app-radio-button
              label="Option 2"
              value="opt2"
              name="interactive-group"
              [(selectedValue)]="interactiveGroupValue">
            </app-radio-button>
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    state: 'default',
  },
};

// ========================================
// STATES - Все состояния
// ========================================
export const States: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3>Default State</h3>
          <app-radio-button
            label="Unchecked option"
            value="opt1"
            name="state-demo-1"
            state="default">
          </app-radio-button>
        </div>

        <div>
          <h3>Checked State</h3>
          <app-radio-button
            label="Checked option"
            value="opt2"
            name="state-demo-2"
            state="checked">
          </app-radio-button>
        </div>

        <div>
          <h3>Hover State</h3>
          <app-radio-button
            label="Hover state"
            value="opt-hover"
            name="state-demo-hover"
            state="hover">
          </app-radio-button>
        </div>

        <div>
          <h3>Hover Checked State</h3>
          <app-radio-button
            label="Hover checked state"
            value="opt-hover-checked"
            name="state-demo-hover-checked"
            state="hover-checked">
          </app-radio-button>
        </div>

        <div>
          <h3>Focus State</h3>
          <app-radio-button
            label="Focus state"
            value="opt-focus"
            name="state-demo-focus"
            state="focus">
          </app-radio-button>
        </div>

        <div>
          <h3>Disabled States</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <app-radio-button
              label="Disabled unchecked"
              value="opt3"
              name="state-demo-3"
              state="disabled">
            </app-radio-button>
            <app-radio-button
              label="Disabled checked"
              value="opt4"
              name="state-demo-4"
              state="disabled-checked">
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
          'Демонстрация всех состояний радиокнопок: default, checked, hover, hover-checked, focus, disabled (unchecked/checked).',
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
