import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../app/components/checkbox/checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Состояние чекбокса',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенный чекбокс',
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения',
    },
    label: {
      control: 'text',
      description: 'Текст метки',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'active'],
      description: 'Состояние для демонстрации (только для Storybook)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Компонент чекбокса на базе PrimeNG с кастомной стилизацией.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// ========================================
// PLAYGROUND
// ========================================
export const Playground: Story = {
  args: {
    label: 'Checkbox label',
    checked: false,
    disabled: false,
    readonly: false,
    state: 'default',
  },
};

// ========================================
// STATES
// ========================================
export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem;">

        <!-- UNCHECKED STATES -->
        <div>
          <h3 style="margin: 0 0 1.5rem; font-size: 16px; font-weight: 600;">Unchecked States</h3>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2rem;">

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Default" state="default" />
              <span style="font-size: 12px; color: #86909c;">Default</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Hover" state="hover" />
              <span style="font-size: 12px; color: #86909c;">Hover</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Focus" state="focus" />
              <span style="font-size: 12px; color: #86909c;">Focus</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Disabled" [disabled]="true" />
              <span style="font-size: 12px; color: #86909c;">Disabled</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Readonly" [readonly]="true" />
              <span style="font-size: 12px; color: #86909c;">Readonly</span>
            </div>
          </div>
        </div>

        <!-- CHECKED STATES -->
        <div>
          <h3 style="margin: 0 0 1.5rem; font-size: 16px; font-weight: 600;">Checked States</h3>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2rem;">

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Default" [checked]="true" state="default" />
              <span style="font-size: 12px; color: #86909c;">Default</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Hover" [checked]="true" state="hover" />
              <span style="font-size: 12px; color: #86909c;">Hover</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Focus" [checked]="true" state="focus" />
              <span style="font-size: 12px; color: #86909c;">Focus</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Disabled" [checked]="true" [disabled]="true" />
              <span style="font-size: 12px; color: #86909c;">Disabled</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Readonly" [checked]="true" [readonly]="true" />
              <span style="font-size: 12px; color: #86909c;">Readonly</span>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Все состояния чекбокса для unchecked и checked вариантов.
        `,
      },
    },
  },
};

// ========================================
// WITH LABELS
// ========================================
export const WithLabels: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <app-checkbox label="Согласен с условиями использования" />
        <app-checkbox label="Подписаться на рассылку новостей" [checked]="true" />
        <app-checkbox label="Запомнить меня на этом устройстве" />
        <app-checkbox label="Получать уведомления по email" [disabled]="true" />
        <app-checkbox label="Разрешить доступ к геолокации" [checked]="true" [disabled]="true" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Примеры чекбоксов с различными текстовыми метками для форм и настроек',
      },
    },
  },
};
