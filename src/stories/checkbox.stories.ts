import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    // ===== MAIN PROPS =====
    checked: {
      control: 'boolean',
      description:
        'Состояние чекбокса (`true` — отмечен, `false` — не отмечен).',
      table: {
        category: 'Main Props',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Блокирует взаимодействие с чекбоксом.',
      table: {
        category: 'Main Props',
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: `
        Режим "только для чтения".
        **Отличие от \`disabled\`:**
        - Визуально идентичен \`disabled\`.
        - **Не блокирует события** (можно кликать, но состояние не изменится).
      `,
      table: {
        category: 'Main Props',
        defaultValue: { summary: 'false' },
      },
    },
    // ===== CONTENT =====
    label: {
      control: 'text',
      description: 'Текстовая метка рядом с чекбоксом.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' },
      },
    },
    inputId: {
      control: 'text',
      description:
        'HTML ID для связи с `label` (автогенерируется, если не указан).',
      table: {
        category: 'Content',
        defaultValue: { summary: 'auto-generated' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Checkbox (PrimeNG)

Кастомный компонент чекбокса на базе **PrimeNG** с поддержкой:
- Состояний: **default**, **hover**, **checked**, **disabled**, **readonly**.
- Двусторонней привязки (\`[(checked)]\`).
- Автоматической генерации \`inputId\`.
- Кастомных стилей (цвета, иконки через \`icomoon\`).

---

## Особенности
### 1. Поддерживаемые состояния
| Состояние       | Описание                                                                 | Пример кода                                  |
|------------------|-------------------------------------------------------------------------|----------------------------------------------|
| **Default**      | Базовое состояние.                                                      | \`<p-checkbox />\`                          |
| **Hover**        | Подсветка при наведении (\`--global-light-gray-4-color\`).               | \`.p-checkbox:hover\`                        |
| **Checked**      | Отмеченный чекбокс (синяя галочка).                                     | \`[checked]="true"\`                          |
| **Disabled**     | Недоступный чекбокс (серый фон).                                       | \`[disabled]="true"\`                         |
| **Readonly**     | Только для чтения (визуально как \`disabled\`, но **не блокирует события**). | \`[readonly]="true"\`                     |

### 2. Отличия от стандартного PrimeNG
- **\`readonly\`:** В вашей реализации **не блокирует события** (в отличие от \`disabled\`).
- **Стили:** Полностью переопределены (нет стандартных \`focus\`/\`active\` состояний).

### 3. Неиспользуемые свойства PrimeNG
| Свойство       | Почему не используется                          |
|----------------|-------------------------------------------------|
| \`name\`       | Нет обработки форм с \`name\`.                  |
| \`value\`      | Используется только булево \`checked\`.         |
| \`tabindex\`   | Нет кастомной логики фокуса.                    |
| \`styleClass\` | Стили жёстко заданы в CSS.                      |
| \`icon\`       | Иконка фиксирована (\`$icon-check\` из \`icomoon\`). |

---
## Примеры использования
### Базовый чекбокс
\`\`\`html
<p-checkbox [(checked)]="isAgreed" label="Согласен с условиями" />
\`\`\`

### Чекбокс только для чтения
\`\`\`html
<p-checkbox
  [readonly]="true"
  [checked]="true"
  label="Настройка по умолчанию"
/>
\`\`\`

### В форме с \`ReactiveForms\`
\`\`\`typescript
this.form = this.fb.group({
  subscribe: [false]
});
\`\`\`
\`\`\`html
<p-checkbox
  formControlName="subscribe"
  label="Подписаться на рассылку"
/>
\`\`\`
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
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🎮 Интерактивная песочница
Экспериментируйте с комбинациями свойств.

**Поддерживаемые свойства:**
- \`checked\` (двусторонняя привязка).
- \`disabled\` / \`readonly\` (см. отличия выше).

**⚠️ Важно:**
- \`readonly\` **не блокирует события** (в отличие от \`disabled\`).
        `,
      },
    },
  },
};

// ========================================
// 📊 ALL STATES (Только реальные состояния)
// ========================================
export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- UNCHECKED STATES -->
        <div>
          <h3 style="margin: 0 0 1rem;">⬜ Unchecked States</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
            <div style="text-align: center;">
              <app-checkbox label="Default" />
              <div style="font-size: 0.75rem; color: #666;">Default</div>
            </div>
            <div style="text-align: center;">
              <app-checkbox label="Hover" class="p-checkbox-hover" />
              <div style="font-size: 0.75rem; color: #666;">Hover</div>
            </div>
            <div style="text-align: center;">
              <app-checkbox label="Disabled" [disabled]="true" />
              <div style="font-size: 0.75rem; color: #666;">Disabled</div>
            </div>
            <div style="text-align: center;">
              <app-checkbox label="Readonly" [readonly]="true" />
              <div style="font-size: 0.75rem; color: #666;">Readonly</div>
            </div>
          </div>
        </div>

        <!-- CHECKED STATES -->
        <div>
          <h3 style="margin: 0 0 1rem;">✅ Checked States</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
            <div style="text-align: center;">
              <app-checkbox label="Default" [checked]="true" />
              <div style="font-size: 0.75rem; color: #666;">Default</div>
            </div>
            <div style="text-align: center;">
              <app-checkbox label="Hover" [checked]="true" class="p-checkbox-hover" />
              <div style="font-size: 0.75rem; color: #666;">Hover</div>
            </div>
            <div style="text-align: center;">
              <app-checkbox label="Disabled" [checked]="true" [disabled]="true" />
              <div style="font-size: 0.75rem; color: #666;">Disabled</div>
            </div>
            <div style="text-align: center;">
              <app-checkbox label="Readonly" [checked]="true" [readonly]="true" />
              <div style="font-size: 0.75rem; color: #666;">Readonly</div>
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
### 📊 Все **реальные** состояния компонента
Демонстрация **всех поддерживаемых состояний** (без вымышленных \`focus\`/\`active\`).

**Unchecked (⬜):**
- \`default\`, \`hover\`, \`disabled\`, \`readonly\`.

**Checked (✅):**
- \`default\`, \`hover\`, \`disabled\`, \`readonly\`.

**Пример кода:**
\`\`\`html
<!-- Readonly (можно кликать, но не меняет состояние) -->
<p-checkbox [readonly]="true" [checked]="true" label="Фиксированное значение" />
\`\`\`
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
        <app-checkbox label="Подписаться на рассылку новостей" [checked]="true" />
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
### 📝 Чекбоксы с метками
Реальные сценарии использования в формах.

**Когда использовать:**
- ✅ Формы согласия (регистрация, обработка данных).
- ✅ Настройки уведомлений.
- ✅ Фильтры в поиске.

**Пример:**
\`\`\`html
<p-checkbox
  label="Согласен с условиями *"
  [(checked)]="acceptTerms"
/>
\`\`\`
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

**Когда использовать:**
- ✅ Таблицы с множественным выбором.
- ✅ Компактные списки опций.

**Пример:**
\`\`\`html
<!-- В таблице -->
<tr *ngFor="let item of items">
  <td>
    <p-checkbox [(checked)]="item.selected" />
  </td>
  <td>{{ item.name }}</td>
</tr>
\`\`\`
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
        <h4 style="margin: 0; font-size: 14px; font-weight: 600;">
          Двусторонняя привязка \`[(checked)]\`
        </h4>

        <app-checkbox
          [(checked)]="isChecked"
          label="Согласен с условиями использования"
        />

        <div style="padding: 12px; background: #f7f8fa; border-radius: 6px; font-family: monospace;">
          <div><strong>isChecked:</strong> {{ isChecked }}</div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button (click)="isChecked = true" style="padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;">
            Set True
          </button>
          <button (click)="isChecked = false" style="padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;">
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
Компонент поддерживает \`[(checked)]\` для синхронизации с переменными.

**Пример:**
\`\`\`typescript
// Component
isSubscribed = false;
\`\`\`
\`\`\`html
<p-checkbox
  [(checked)]="isSubscribed"
  label="Подписаться на рассылку"
/>

<button [disabled]="!isSubscribed">
  Отправить
</button>
\`\`\`
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
    label="Согласен с условиями *"
    [(checked)]="acceptTerms"
  />
  <p-checkbox
    label="Подписаться на рассылку"
    [(checked)]="newsletter"
  />
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
    label="SMS уведомления"
    [disabled]="true"
  />
</div>
\`\`\`

#### 3️⃣ Фильтры поиска
\`\`\`html
<div class="filters">
  <p-checkbox
    label="В наличии"
    [(checked)]="filters.inStock"
  />
  <p-checkbox
    label="Со скидкой"
    [(checked)]="filters.onSale"
  />
</div>
\`\`\`
        `,
      },
    },
  },
};
