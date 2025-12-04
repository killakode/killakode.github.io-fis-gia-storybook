import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../app/components/buttons/buttons.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Buttons',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'danger', 'warn', 'help'],
      description: 'Тип кнопки (severity)'
    },
    variant: {
      control: 'select',
      options: ['default', 'link', 'noborder', 'chevron'],
      description: 'Вариант отображения'
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus', 'focus-active'],
      description: 'Состояние для демонстрации'
    },
    label: {
      control: 'text',
      description: 'Текст кнопки'
    },
    icon: {
      control: 'text',
      description: 'Класс иконки (pi pi-check или кастомная)'
    },
    iconPos: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Позиция иконки'
    },
    outlined: {
      control: 'boolean',
      description: 'Outlined стиль'
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенная кнопка'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Компонент кнопки с поддержкой всех severity, вариантов и состояний PrimeNG'
      }
    }
  }
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ========================================
// PLAYGROUND - Интерактивная песочница
// ========================================
export const Playground: Story = {
  args: {
    label: 'Click me',
    severity: 'primary',
    variant: 'default',
    state: 'default',
    outlined: false,
    loading: false,
    disabled: false
  }
};

// ========================================
// ALL SEVERITIES - Все типы кнопок
// ========================================
export const AllSeverities: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <app-button label="Primary" severity="primary" />
        <app-button label="Secondary" severity="secondary" />
        <app-button label="Success" severity="success" />
        <app-button label="Info" severity="info" />
        <app-button label="Danger" severity="danger" />
        <app-button label="Warn" severity="warn" />
        <app-button label="Help" severity="help" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные severity для кнопок'
      }
    }
  }
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
          <h3>Primary Button States</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <app-button label="Default" severity="primary" state="default" />
            <app-button label="Hover" severity="primary" state="hover" />
            <app-button label="Active" severity="primary" state="active" />
            <app-button label="Focus" severity="primary" state="focus" />
            <app-button label="Focus Active" severity="primary" state="focus-active" />
            <app-button label="Loading" severity="primary" [loading]="true" />
            <app-button label="Disabled" severity="primary" [disabled]="true" />
          </div>
        </div>

        <div>
          <h3>Secondary Button States</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <app-button label="Default" severity="secondary" state="default" />
            <app-button label="Hover" severity="secondary" state="hover" />
            <app-button label="Active" severity="secondary" state="active" />
            <app-button label="Focus" severity="secondary" state="focus" />
            <app-button label="Focus Active" severity="secondary" state="focus-active" />
            <app-button label="Loading" severity="secondary" [loading]="true" />
            <app-button label="Disabled" severity="secondary" [disabled]="true" />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех состояний кнопок: default, hover, active, focus, loading, disabled'
      }
    }
  }
};

// ========================================
// WITH ICONS - С иконками
// ========================================
export const WithIcons: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <app-button label="Save" icon="pi pi-check" severity="primary" />
        <app-button label="Delete" icon="pi pi-trash" severity="danger" />
        <app-button label="Search" icon="pi pi-search" iconPos="right" severity="secondary" />
        <app-button icon="pi pi-cog" severity="primary" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки с иконками: слева, справа, только иконка'
      }
    }
  }
};

// ========================================
// VARIANTS - Варианты кнопок
// ========================================
export const Variants: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3>Default</h3>
          <div style="display: flex; gap: 1rem;">
            <app-button label="Primary" severity="primary" variant="default" />
            <app-button label="Secondary" severity="secondary" variant="default" />
          </div>
        </div>

        <div>
          <h3>Link Style</h3>
          <div style="display: flex; gap: 1rem;">
            <app-button label="Link Button" severity="primary" variant="link" />
            <app-button label="With Icon" severity="primary" variant="link" icon="pi pi-external-link" />
          </div>
        </div>

        <div>
          <h3>No Border</h3>
          <div style="display: flex; gap: 1rem;">
            <app-button label="No Border" severity="secondary" variant="noborder" />
          </div>
        </div>

        <div>
          <h3>With Chevron (Dropdown)</h3>
          <div style="display: flex; gap: 1rem;">
            <app-button label="Primary Chevron" severity="primary" variant="chevron" icon="pi pi-chevron-down" iconPos="right" />
            <app-button label="Secondary Chevron" severity="secondary" variant="chevron" icon="pi pi-chevron-down" iconPos="right" />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Различные варианты отображения кнопок: default, link, noborder, chevron'
      }
    }
  }
};

// ========================================
// OUTLINED - Outlined стиль
// ========================================
export const Outlined: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <app-button label="Primary" severity="primary" [outlined]="true" />
        <app-button label="Secondary" severity="secondary" [outlined]="true" />
        <app-button label="Success" severity="success" [outlined]="true" />
        <app-button label="Info" severity="info" [outlined]="true" />
        <app-button label="Danger" severity="danger" [outlined]="true" />
      </div>
    `
  })
};
