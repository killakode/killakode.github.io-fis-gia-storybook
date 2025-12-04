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
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
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
    disabled: false,
  },
};

// ========================================
// STATES - Все состояния (только просмотр)
// ========================================
export const States: Story = {
  render: () => ({
    props: {},
    template: `
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
          <h3>Hover & Focus</h3>
          <p style="color: #666; font-size: 0.875rem;">Наведите курсор или используйте Tab для фокуса</p>
          <app-radio-button
            label="Hover/Focus me"
            value="opt5"
            name="state-demo-5">
          </app-radio-button>
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
