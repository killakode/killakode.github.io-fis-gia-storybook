import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../app/components/buttons/buttons.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Buttons',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Компонент кнопок проекта на основе PrimeNG p-button.

**⚠️ Важно:** На проекте используются только определённые комбинации \`severity\` + \`styleClass\`.

## Кастомные классы:
- \`.blue-button\` — синяя заполненная кнопка
- \`.white-button\` — белая с синей обводкой
- \`.noborder-button\` — без обводки
- \`.link-button\` — кнопка-ссылка
- \`.white-button-chevron-action\` — белая с шевроном
- \`.button-icon\` — с иконкой
- \`.button-icon-no-border-custom\` — иконка без обводки
- \`.p-button-collapse\` — кнопка сворачивания
- \`.button-no-border\` — без border (inline-block)
- \`.circle-arrow-button\` — с круговой стрелкой
- \`.button-ellipsis\` — с многоточием при переполнении
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ========================================
// 1. BLUE BUTTON (primary)
// ========================================
export const BlueButton: Story = {
  args: {
    label: 'Показать',
    severity: 'primary',
    styleClass: 'blue-button',
    disabled: false,
    loading: false,
  },
  argTypes: {
    severity: {
      control: false,
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: false,
      description: 'Кастомный класс: `.blue-button`',
      table: {
        category: 'Custom Classes',
        defaultValue: { summary: 'blue-button' },
      },
    },
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    icon: {
      control: 'text',
      description: 'Класс иконки (pi pi-check)',
      table: { category: 'Content' },
    },
    iconPos: {
      control: 'radio',
      options: ['left', 'right'],
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    loading: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Синяя заполненная кнопка**

\`\`\`html
<p-button
  label="Показать"
  severity="primary"
  class="blue-button"
/>
\`\`\`

**Кастомный класс:** \`.blue-button\`
**Severity:** \`primary\`
        `,
      },
    },
  },
};

// ========================================
// 2. WHITE BUTTON (secondary)
// ========================================
export const WhiteButton: Story = {
  args: {
    label: 'Отмена',
    severity: 'secondary',
    styleClass: 'white-button',
    disabled: false,
    loading: false,
  },
  argTypes: {
    severity: {
      control: false,
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: false,
      description: 'Кастомный класс: `.white-button`',
      table: {
        category: 'Custom Classes',
        defaultValue: { summary: 'white-button' },
      },
    },
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    icon: {
      control: 'text',
      table: { category: 'Content' },
    },
    iconPos: {
      control: 'radio',
      options: ['left', 'right'],
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    loading: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Белая кнопка с синей обводкой**

\`\`\`html
<p-button
  label="Отмена"
  severity="secondary"
  class="white-button"
/>
\`\`\`

**Кастомный класс:** \`.white-button\`
**Severity:** \`secondary\`
        `,
      },
    },
  },
};

// ========================================
// 3. NO BORDER BUTTON (secondary)
// ========================================
export const NoBorderButton: Story = {
  args: {
    label: 'Добавить комментарий',
    severity: 'secondary',
    styleClass: 'noborder-button',
    disabled: false,
  },
  argTypes: {
    severity: {
      control: false,
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: false,
      description: 'Кастомный класс: `.noborder-button`',
      table: {
        category: 'Custom Classes',
        defaultValue: { summary: 'noborder-button' },
      },
    },
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Кнопка без обводки**

\`\`\`html
<p-button
  label="Добавить комментарий"
  severity="secondary"
  class="noborder-button"
/>
\`\`\`

**Кастомный класс:** \`.noborder-button\`
**Severity:** \`secondary\`
        `,
      },
    },
  },
};

// ========================================
// 4. LINK BUTTON
// ========================================
export const LinkButton: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-direction: column;">
        <p-button styleClass="link-button">
          <i class="pi pi-plus"></i>
          <span>Добавить экзамен</span>
        </p-button>

        <p-button styleClass="link-button" [disabled]="true">
          <i class="pi pi-plus"></i>
          <span>Disabled state</span>
        </p-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
**Кнопка-ссылка**

\`\`\`html
<p-button class="link-button">
  <i class="pi pi-plus"></i>
  <span>Добавить экзамен</span>
</p-button>
\`\`\`

**Кастомный класс:** \`.link-button\`
**Severity:** не используется
**Особенность:** Использует нативную структуру с вложенными элементами
        `,
      },
    },
  },
};

// ========================================
// 5. WHITE BUTTON WITH CHEVRON
// ========================================
export const WhiteButtonChevron: Story = {
  args: {
    label: 'Групповые операции',
    styleClass: 'white-button-chevron-action',
    icon: 'icon-arrow',
    iconPos: 'right',
    disabled: false,
  },
  argTypes: {
    severity: {
      control: false,
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: false,
      description: 'Кастомный класс: `.white-button-chevron-action`',
      table: {
        category: 'Custom Classes',
        defaultValue: { summary: 'white-button-chevron-action' },
      },
    },
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    icon: {
      control: false,
      table: { category: 'Content' },
    },
    iconPos: {
      control: false,
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Белая кнопка с шевроном для меню**

\`\`\`html
<p-button
  label="Групповые операции"
  class="white-button-chevron-action"
  iconPos="right"
  icon="icon-arrow"
/>
\`\`\`

**Кастомный класс:** \`.white-button-chevron-action\`
**Иконка:** \`icon-arrow\` справа
**Особенность:** Анимация поворота шеврона при клике
        `,
      },
    },
  },
};

// ========================================
// 6. BUTTON WITH ICON
// ========================================
export const ButtonWithIcon: Story = {
  args: {
    label: 'Скачать отчёт',
    icon: 'pi pi-download',
    severity: 'success',
    styleClass: 'button-icon',
    disabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    icon: {
      control: 'text',
      table: { category: 'Content' },
    },
    severity: {
      control: 'select',
      options: ['success', 'secondary', 'danger', 'warn', 'help', 'primary'],
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: false,
      description: 'Кастомный класс: `.button-icon`',
      table: {
        category: 'Custom Classes',
        defaultValue: { summary: 'button-icon' },
      },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Кнопка с иконкой**

\`\`\`html
<p-button
  label="Скачать отчёт"
  icon="pi pi-download"
  severity="success"
  class="button-icon"
/>
\`\`\`

**Кастомный класс:** \`.button-icon\`
**Severity:** \`success\`, \`secondary\`, \`danger\`, \`warn\`, \`help\`, \`primary\`
        `,
      },
    },
  },
};

// ========================================
// 7. ICON BUTTON NO BORDER
// ========================================
export const IconButtonNoBorder: Story = {
  args: {
    label: 'Создать новую заявку',
    icon: 'pi pi-plus',
    severity: 'success',
    styleClass: 'button-icon-no-border-custom',
    disabled: false,
  },
  argTypes: {
    severity: {
      control: false,
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: false,
      description: 'Кастомный класс: `.button-icon-no-border-custom`',
      table: {
        category: 'Custom Classes',
        defaultValue: { summary: 'button-icon-no-border-custom' },
      },
    },
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    icon: {
      control: 'text',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Кнопка-иконка без обводки и фона**

\`\`\`html
<p-button
  icon="pi pi-plus"
  label="Создать новую заявку"
  severity="success"
  class="button-icon-no-border-custom"
/>
\`\`\`

**Кастомный класс:** \`.button-icon-no-border-custom\`
**Severity:** \`success\`
        `,
      },
    },
  },
};

// ========================================
// 8. COLLAPSE BUTTON
// ========================================
export const CollapseButton: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <p-button
          icon="icon-collapse"
          styleClass="p-button-icon-only p-button-collapse"
          aria-label="Показать"
        />
        <span style="color: var(--global-gray-color);">Кнопка сворачивания/разворачивания</span>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
**Кнопка сворачивания секций**

\`\`\`html
<p-button
  icon="icon-collapse"
  styleClass="p-button-icon-only p-button-collapse"
  aria-label="Показать"
/>
\`\`\`

**Кастомный класс:** \`.p-button-collapse\`
**Комбинируется с:** \`p-button-icon-only\`
**Иконка:** \`icon-collapse\`
**Особенность:** Анимация поворота при toggle состояния
        `,
      },
    },
  },
};

// ========================================
// 9. BUTTON ELLIPSIS
// ========================================
export const ButtonEllipsis: Story = {
  args: {
    label: 'Очень длинный текст кнопки который должен обрезаться многоточием',
    severity: 'primary',
    styleClass: 'blue-button button-ellipsis',
    disabled: false,
  },
  argTypes: {
    severity: {
      control: false,
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: false,
      description: 'Кастомные классы: `.blue-button .button-ellipsis`',
      table: {
        category: 'Custom Classes',
        defaultValue: { summary: 'blue-button button-ellipsis' },
      },
    },
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Кнопка с многоточием при переполнении**

\`\`\`html
<p-button
  label="Очень длинный текст..."
  severity="primary"
  class="blue-button button-ellipsis"
/>
\`\`\`

**Кастомный класс:** \`.button-ellipsis\`
**Комбинируется с:** \`.blue-button\`, \`.white-button\` и др.
**Особенность:** Текст обрезается с \`text-overflow: ellipsis\`
        `,
      },
    },
  },
};

// ========================================
// 10. ALL STATES
// ========================================
export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <!-- Blue Button States -->
        <div>
          <h3 style="margin-bottom: 1rem; color: var(--global-gray-color);">Blue Button (primary)</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Default"
                severity="primary"
                styleClass="blue-button"
                demoState="locked"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">default</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Hover"
                severity="primary"
                styleClass="blue-button"
                demoState="hover"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">:hover</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Active"
                severity="primary"
                styleClass="blue-button"
                demoState="active"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">:active</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Focus"
                severity="primary"
                styleClass="blue-button"
                demoState="focus"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">:focus-visible</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Loading"
                severity="primary"
                styleClass="blue-button"
                [loading]="true"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">loading</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Disabled"
                severity="primary"
                styleClass="blue-button"
                [disabled]="true"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">disabled</span>
            </div>
          </div>
        </div>

        <!-- White Button States -->
        <div>
          <h3 style="margin-bottom: 1rem; color: var(--global-gray-color);">White Button (secondary)</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Default"
                severity="secondary"
                styleClass="white-button"
                demoState="locked"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">default</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Hover"
                severity="secondary"
                styleClass="white-button"
                demoState="hover"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">:hover</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Active"
                severity="secondary"
                styleClass="white-button"
                demoState="active"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">:active</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Focus"
                severity="secondary"
                styleClass="white-button"
                demoState="focus"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">:focus-visible</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Loading"
                severity="secondary"
                styleClass="white-button"
                [loading]="true"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">loading</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Disabled"
                severity="secondary"
                styleClass="white-button"
                [disabled]="true"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">disabled</span>
            </div>
          </div>
        </div>

        <!-- No Border Button States -->
        <div>
          <h3 style="margin-bottom: 1rem; color: var(--global-gray-color);">No Border Button</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Default"
                severity="secondary"
                styleClass="noborder-button"
                demoState="locked"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">default</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Hover"
                severity="secondary"
                styleClass="noborder-button"
                demoState="hover"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">:hover</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
              <app-button
                label="Disabled"
                severity="secondary"
                styleClass="noborder-button"
                [disabled]="true"
              />
              <span style="font-size: 12px; color: var(--global-gray-color);">disabled</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Все состояния кнопок: default, hover, active, focus, loading, disabled',
      },
    },
  },
};

// ========================================
// 11. PLAYGROUND
// ========================================
export const Playground: Story = {
  args: {
    label: 'Click me',
    severity: 'primary',
    styleClass: 'blue-button',
    disabled: false,
    loading: false,
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
    severity: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'danger',
        'warn',
        'help',
      ],
      description: '⚠️ Комбинируйте с правильным styleClass!',
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: 'select',
      options: [
        'blue-button',
        'white-button',
        'noborder-button',
        'link-button',
        'white-button-chevron-action',
        'button-icon',
        'button-icon-no-border-custom',
        'p-button-collapse',
        'button-ellipsis',
      ],
      description: 'Выберите кастомный класс кнопки',
      table: {
        category: 'Custom Classes',
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'text',
      table: { category: 'Content' },
    },
    iconPos: {
      control: 'radio',
      options: ['left', 'right'],
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    loading: {
      control: 'boolean',
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
## Песочница для экспериментов

**⚠️ Валидные комбинации:**
- \`blue-button\` + \`severity="primary"\`
- \`white-button\` + \`severity="secondary"\`
- \`noborder-button\` + \`severity="secondary"\`
- \`button-icon\` + \`severity="success|secondary|danger|warn|help|primary"\`
- \`button-icon-no-border-custom\` + \`severity="success"\`
- \`link-button\` — без severity
- \`white-button-chevron-action\` — без severity (или \`severity="primary|secondary"\`)
        `,
      },
    },
  },
};
