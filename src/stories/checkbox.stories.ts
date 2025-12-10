import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../app/components/checkbox/checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    // ===== PRIMENG PROPS =====
    checked: {
      control: 'boolean',
      description: 'Состояние чекбокса (checked/unchecked)',
      table: {
        category: 'PrimeNG Props',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие с чекбоксом',
      table: {
        category: 'PrimeNG Props',
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения (можно видеть, но нельзя изменить)',
      table: {
        category: 'PrimeNG Props',
        defaultValue: { summary: 'false' },
      },
    },

    // ===== CONTENT =====
    label: {
      control: 'text',
      description: 'Текстовая метка рядом с чекбоксом',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
      },
    },
    inputId: {
      control: 'text',
      description:
        'HTML ID для связи с label (генерируется автоматически если не указан)',
      table: {
        category: 'Content',
        defaultValue: { summary: 'auto-generated' },
      },
    },

    // ===== DEMO STATE =====
    state: {
      control: 'select',
      options: [
        'default',
        'hover',
        'focus',
        'active',
        'hover-checked',
        'active-checked',
      ],
      description: `
⚠️ Только для демонстрации в Storybook. Имитирует псевдо-состояния.

**Автоматическая установка checked:**
- \`default\`, \`hover\`, \`focus\`, \`active\` → \`checked = false\`
- \`hover-checked\`, \`active-checked\` → \`checked = true\`
      `,
      table: {
        category: 'Demo State',
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  // ========================================
  // 🔥 ГЛОБАЛЬНЫЙ ДЕКОРАТОР
  // ========================================
  decorators: [
    (story, context) => {
      // Автоматически устанавливаем checked в зависимости от state
      const checkedStates = ['hover-checked', 'active-checked'];

      if (context.args.state && checkedStates.includes(context.args.state)) {
        context.args.checked = true;
      } else if (context.args.state) {
        // Если выбрано состояние без -checked, сбрасываем checked
        // (но только если пользователь не установил его вручную)
        if (
          context.args.checked === undefined ||
          context.initialArgs.state !== context.args.state
        ) {
          context.args.checked = false;
        }
      }

      return story();
    },
  ],
  parameters: {
    docs: {
      description: {
        component: `
# Checkbox Component

Кастомный компонент чекбокса на базе **PrimeNG Checkbox** с поддержкой:
- ✅ Состояний: default, hover, focus, active, disabled, readonly
- ✅ Двусторонняя привязка через \`[(checked)]\`
- ✅ Автоматическая генерация уникальных ID

## Базовое использование

\`\`\`html
<!-- Простой чекбокс -->
<p-checkbox label="Согласен с условиями" />

<!-- С двусторонней привязкой -->
<p-checkbox
  [(checked)]="isSubscribed"
  label="Подписаться на рассылку"
/>

<!-- Readonly чекбокс -->
<p-checkbox
  [checked]="true"
  [readonly]="true"
  label="Настройка по умолчанию (неизменяемая)"
/>

<!-- Disabled чекбокс -->
<p-checkbox
  [disabled]="true"
  label="Опция недоступна"
/>
\`\`\`

## PrimeNG Reference

Компонент является оберткой над \`p-checkbox\`:

\`\`\`html
<!-- Нативный PrimeNG аналог -->
<p-checkbox
  #myCheckbox
  checkboxIcon="icon-check"
  [(ngModel)]="checked"
  [binary]="true"
  [disabled]="false"
  [readonly]="false"
/>
\`\`\`

## 🎮 Demo States в Storybook

При выборе \`state\` в контролах, \`checked\` устанавливается автоматически:

| State | Auto checked |
|-------|--------------|
| \`default\` | \`false\` |
| \`hover\` | \`false\` |
| \`focus\` | \`false\` |
| \`active\` | \`false\` |
| \`hover-checked\` | \`true\` ✅ |
| \`active-checked\` | \`true\` ✅ |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// ========================================
// 🎮 PLAYGROUND
// ========================================
export const Playground: Story = {
  args: {
    label: 'Checkbox label',
    checked: false,
    disabled: false,
    readonly: false,
    state: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🎮 Интерактивная песочница

Экспериментируйте с различными комбинациями свойств.

**💡 Подсказка:** При выборе \`state\` со значением \`*-checked\`,
свойство \`checked\` автоматически устанавливается в \`true\`.

**Валидные комбинации:**

| checked | disabled | readonly | Описание |
|---------|----------|----------|----------|
| ✅      | ❌       | ❌       | Обычный отмеченный чекбокс |
| ❌      | ❌       | ❌       | Обычный пустой чекбокс |
| ✅/❌   | ✅       | ❌       | Disabled (любое состояние) |
| ✅/❌   | ❌       | ✅       | Readonly (можно видеть, нельзя менять) |

**⚠️ Несовместимые комбинации:**
- \`disabled + readonly\` — используйте что-то одно

\`\`\`html
<p-checkbox
  label="Checkbox label"
  [checked]="false"
  [disabled]="false"
  [readonly]="false"
/>
\`\`\`
        `,
      },
    },
  },
};

// ========================================
// 📊 ALL STATES
// ========================================
export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; font-family: Inter, system-ui;">

        <!-- UNCHECKED STATES -->
        <div>
          <h3 style="margin: 0 0 1.5rem; font-size: 16px; font-weight: 600; color: #1d2129;">
            ⬜ Unchecked States
          </h3>
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 2rem;">

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Default" state="default" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Default</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Hover" state="hover" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Hover</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Focus" state="focus" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Focus</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Active" state="active" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Active</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Disabled" [disabled]="true" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Disabled</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Readonly" [readonly]="true" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Readonly</span>
            </div>
          </div>
        </div>

        <!-- CHECKED STATES -->
        <div>
          <h3 style="margin: 0 0 1.5rem; font-size: 16px; font-weight: 600; color: #1d2129;">
            ✅ Checked States
          </h3>
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 2rem;">

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Default" [checked]="true" state="default" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Default</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Hover" state="hover-checked" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Hover</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Focus" [checked]="true" state="focus" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Focus</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Active" state="active-checked" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Active</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Disabled" [checked]="true" [disabled]="true" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Disabled</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <app-checkbox label="Readonly" [checked]="true" [readonly]="true" />
              <span style="font-size: 12px; color: #86909c; font-weight: 500;">Readonly</span>
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
### 📊 Все состояния компонента

Полная визуализация всех состояний чекбокса.

**Unchecked (⬜):**
- **Default** — базовое состояние
- **Hover** — при наведении мыши
- **Focus** — при фокусе с клавиатуры (Tab)
- **Active** — при клике (нажатие кнопки мыши)
- **Disabled** — недоступен для взаимодействия
- **Readonly** — видимый, но неизменяемый

**Checked (✅):**
- **Default** — отмеченный чекбокс
- **Hover** — отмеченный + наведение
- **Focus** — отмеченный + фокус
- **Active** — отмеченный + клик
- **Disabled** — отмеченный + недоступен
- **Readonly** — отмеченный + только чтение

\`\`\`html
<!-- Пример использования состояний в коде -->
<p-checkbox label="Default" />
<p-checkbox label="Checked" [checked]="true" />
<p-checkbox label="Disabled" [disabled]="true" />
<p-checkbox label="Readonly" [readonly]="true" [checked]="true" />
\`\`\`

**💡 В Playground:** При выборе \`hover-checked\` или \`active-checked\`
в контроле \`state\`, чекбокс автоматически становится отмеченным.
        `,
      },
    },
  },
};

// ========================================
// 📝 WITH LABELS
// ========================================
export const WithLabels: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
        <app-checkbox label="Согласен с условиями использования" />
        <app-checkbox label="Подписаться на рассылку новостей и обновлений" [checked]="true" />
        <app-checkbox label="Запомнить меня на этом устройстве (30 дней)" />
        <app-checkbox label="Получать уведомления по email" [disabled]="true" />
        <app-checkbox label="Разрешить доступ к геолокации" [checked]="true" [disabled]="true" />
        <app-checkbox label="Автоматически сохранять черновики" [checked]="true" [readonly]="true" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 📝 Примеры с метками

Реальные сценарии использования чекбоксов в формах.

\`\`\`html
<!-- Согласие с условиями -->
<p-checkbox label="Согласен с условиями использования" />

<!-- С предустановленным значением -->
<p-checkbox
  label="Подписаться на рассылку"
  [checked]="true"
/>

<!-- Недоступный чекбокс -->
<p-checkbox
  label="Получать уведомления (недоступно)"
  [disabled]="true"
/>

<!-- Readonly (нельзя изменить) -->
<p-checkbox
  label="Автоматически сохранять черновики"
  [checked]="true"
  [readonly]="true"
/>
\`\`\`

**Когда использовать:**
- ✅ Формы регистрации/авторизации
- ✅ Настройки приложения
- ✅ Фильтры и параметры поиска
- ✅ Согласие с условиями
        `,
      },
    },
  },
};

// ========================================
// 🎨 WITHOUT LABELS
// ========================================
export const WithoutLabels: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <app-checkbox />
        <app-checkbox [checked]="true" />
        <app-checkbox [disabled]="true" />
        <app-checkbox [checked]="true" [disabled]="true" />
        <app-checkbox [readonly]="true" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 🎨 Без меток

Чекбоксы без текстовых меток для компактного размещения.

\`\`\`html
<!-- В таблице -->
<tr *ngFor="let item of items">
  <td>
    <p-checkbox [(checked)]="item.selected" />
  </td>
  <td>{{ item.name }}</td>
</tr>

<!-- В header таблицы -->
<th>
  <p-checkbox
    [(checked)]="allSelected"
    (onChange)="toggleAll()"
  />
</th>
\`\`\`

**Когда использовать:**
- ✅ Таблицы с множественным выбором
- ✅ Компактные списки
- ✅ Визуальные чеклисты
        `,
      },
    },
  },
};

// ========================================
// 🔄 TWO-WAY BINDING
// ========================================
export const TwoWayBinding: Story = {
  render: () => ({
    props: {
      isChecked: false,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
        <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: #1d2129;">
          Двусторонняя привязка [(checked)]
        </h4>

        <app-checkbox
          [(checked)]="isChecked"
          label="Согласен с условиями использования"
        />

        <div style="padding: 12px; background: #f7f8fa; border-radius: 6px; font-size: 13px; font-family: 'Courier New', monospace;">
          <div><strong>isChecked:</strong> {{ isChecked }}</div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button
            (click)="isChecked = true"
            style="padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;"
          >
            Set True
          </button>
          <button
            (click)="isChecked = false"
            style="padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;"
          >
            Set False
          </button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 🔄 Двусторонняя привязка

Компонент поддерживает двустороннюю привязку через \`[(checked)]\`.

\`\`\`typescript
// Component
export class MyComponent {
  isAccepted = false;
  isSubscribed = true;
}
\`\`\`

\`\`\`html
<!-- Template -->
<p-checkbox
  [(checked)]="isAccepted"
  label="Согласен с условиями"
/>

<p-checkbox
  [(checked)]="isSubscribed"
  label="Получать новости"
/>

<button
  [disabled]="!isAccepted"
  (click)="submit()"
>
  Отправить
</button>
\`\`\`

**Как работает:**
- Изменение в компоненте → обновляется чекбокс
- Клик по чекбоксу → обновляется переменная в компоненте
        `,
      },
    },
  },
};

// ========================================
// 🎯 PRACTICAL EXAMPLES
// ========================================
export const PracticalExamples: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">

        <!-- 1. Форма регистрации -->
        <div>
          <h4 style="margin: 0 0 1rem; font-size: 14px; font-weight: 600;">
            1. Форма регистрации
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <app-checkbox label="Согласен с условиями использования *" />
            <app-checkbox label="Согласен на обработку персональных данных *" />
            <app-checkbox label="Подписаться на рассылку новостей" [checked]="true" />
          </div>
        </div>

        <!-- 2. Настройки уведомлений -->
        <div>
          <h4 style="margin: 0 0 1rem; font-size: 14px; font-weight: 600;">
            2. Настройки уведомлений
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <app-checkbox label="Email уведомления" [checked]="true" />
            <app-checkbox label="Push уведомления" [checked]="true" />
            <app-checkbox label="SMS уведомления" [disabled]="true" />
          </div>
        </div>

        <!-- 3. Фильтры поиска -->
        <div>
          <h4 style="margin: 0 0 1rem; font-size: 14px; font-weight: 600;">
            3. Фильтры товаров
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <app-checkbox label="В наличии" [checked]="true" />
            <app-checkbox label="Со скидкой" />
            <app-checkbox label="Новинки" />
            <app-checkbox label="Бесплатная доставка" />
          </div>
        </div>

      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 🎯 Практические примеры

Реальные сценарии использования чекбоксов.

#### 1️⃣ Форма регистрации
\`\`\`html
<form>
  <p-checkbox
    label="Согласен с условиями использования *"
    [(checked)]="acceptTerms"
  />
  <p-checkbox
    label="Согласен на обработку персональных данных *"
    [(checked)]="acceptPrivacy"
  />
  <p-checkbox
    label="Подписаться на рассылку"
    [(checked)]="newsletter"
  />

  <button [disabled]="!acceptTerms || !acceptPrivacy">
    Зарегистрироваться
  </button>
</form>
\`\`\`

#### 2️⃣ Настройки уведомлений
\`\`\`html
<div class="settings">
  <p-checkbox
    label="Email уведомления"
    [(checked)]="notifications.email"
  />
  <p-checkbox
    label="Push уведомления"
    [(checked)]="notifications.push"
  />
  <p-checkbox
    label="SMS уведомления"
    [disabled]="!hasSMS"
  />
</div>
\`\`\`

#### 3️⃣ Фильтры поиска
\`\`\`html
<div class="filters">
  <p-checkbox
    label="В наличии"
    [(checked)]="filters.inStock"
    (onChange)="applyFilters()"
  />
  <p-checkbox
    label="Со скидкой"
    [(checked)]="filters.onSale"
    (onChange)="applyFilters()"
  />
  <p-checkbox
    label="Новинки"
    [(checked)]="filters.isNew"
    (onChange)="applyFilters()"
  />
</div>
\`\`\`
        `,
      },
    },
  },
};
