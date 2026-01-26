import type { Meta, StoryObj } from '@storybook/angular';
import {
  AccordionComponent,
  type AccordionConfig,
  type AccordionPanelConfig,
  type ReportGroup,
} from '../app/components/accordion/accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    // ===== MAIN CONFIG =====
    config: {
      control: 'object',
      description: `
Основная конфигурация аккордеона:
- **value**: Массив идентификаторов открытых панелей (например, [0, 1])
- **multiple**: Разрешает множественное раскрытие панелей
- **dialog**: Включает специальные стили для диалоговых окон
      `,
      table: {
        category: 'Main Config',
        defaultValue: {
          summary: '{ value: [0], multiple: false, dialog: false }',
        },
      },
    },

    // ===== TABLE MODE =====
    withExpandableTable: {
      control: 'boolean',
      description: `
Включает режим с вложенными таблицами и раскрывающимися строками.
**Требует обязательной передачи \`reportGroups\` при значении \`true\`.**
      `,
      table: {
        category: 'Table Mode',
        defaultValue: { summary: 'false' },
      },
    },

    // ===== PANELS =====
    panels: {
      control: 'object',
      description: `
Массив панелей аккордеона. Каждый элемент содержит:
- **value**: Уникальный идентификатор панели
- **header**: Заголовок панели
- **disabled**: Отключает панель (boolean)
- **isHeaderOnly**: Делает панель без возможности раскрытия (boolean)
      `,
      table: {
        category: 'Panels',
        defaultValue: { summary: '[]' },
      },
    },

    // ===== TABLE DATA =====
    reportGroups: {
      control: 'object',
      description: `
Группы отчётов для режима таблицы (используется когда \`withExpandableTable=true\`).
Структура:
- **value**: Идентификатор группы
- **name**: Название группы
- **reports**: Массив отчётов ({ code, name })
      `,
      table: {
        category: 'Table Data',
        defaultValue: { summary: '[]' },
      },
    },

    // ===== STYLING =====
    styleClass: {
      control: 'text',
      description: 'Дополнительные CSS классы для корневого элемента',
      table: {
        category: 'Styling',
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Accordion Component

Универсальный компонент аккордеона на базе **PrimeNG** с поддержкой:
- Одиночного и множественного раскрытия панелей
- Вложенных таблиц с раскрывающимися строками
- Кастомного контента через \`<ng-template>\`
- Разных режимов отображения (диалоговый, обычный)
- Отключённых панелей и режима "только заголовок"

---

## 🔧 Основные возможности

| Возможность               | Описание                                  | Пример кода |
|---------------------------|-------------------------------------------|--------------|
| Множественное раскрытие   | Одновременно открыто несколько панелей   | [config]="{multiple: true}" |
| Табличный режим           | Вложенные таблицы с раскрытием строк      | [withExpandableTable]="true" |
| Диалоговый режим          | Специальные стили для модальных окон      | [config]="{dialog: true}" |
| Кастомный контент         | Переопределение контента через шаблон     | <ng-template #panelContent> |
| Отключённые панели        | Визуально и функционально заблокированы   | [disabled]="true" |
| Только заголовок          | Панель без возможности раскрытия          | [isHeaderOnly]="true" |

---

## ⚠️ Особенности и ограничения

1. **Режим withExpandableTable**:
   - Требует обязательной передачи \`reportGroups\`
   - Включает дополнительные стили для таблицы и формы
   - Поддерживает события \`onRowExpand\`/\`onRowCollapse\`

2. **Стили**:
   - Не изменять классы \`.accordion\` и \`.p-accordion.p-component\` (завязаны на логику)
   - Для кастомизации использовать \`styleClass\`

3. **Отличия от PrimeNG**:
   - Полностью переопределённые стили (нет зависимости от \`p-fieldset\`)
   - Кастомные иконки через icomoon
   - Дополнительные режимы (диалоговый, табличный)

---
## 📄 Примеры использования

### 1. Базовый аккордеон
\`\`\`html
<p-accordion
  [config]="{value: [0], multiple: false, dialog: false}"
  [panels]="[
    {value: 0, header: 'Панель 1', disabled: false},
    {value: 1, header: 'Панель 2', disabled: false}
  ]"
/>
\`\`\`

### 2. С таблицей и раскрытием
\`\`\`html
<p-accordion
  [withExpandableTable]="true"
  [config]="{value: [0], multiple: true, dialog: false}"
  [reportGroups]="[
    {
      value: 0,
      name: 'Отчёты Q1',
      reports: [
        {code: 'R1', name: 'Отчёт 1'},
        {code: 'R2', name: 'Отчёт 2'}
      ]
    }
  ]"
/>
\`\`\`

### 3. В диалоговом окне
\`\`\`html
<p-accordion
  [config]="{value: [0], multiple: false, dialog: true}"
  [panels]="[
    {value: 0, header: 'Настройки', disabled: false},
    {value: 1, header: 'Уведомления', disabled: false}
  ]"
/>
\`\`\`

### 4. С кастомным контентом
\`\`\`html
<p-accordion [panels]="panels">
  <ng-template #panelContent let-panel>
    <div *ngIf="panel.value === 0">
      <!-- Кастомный контент для панели -->
      <div class="custom-content">
        Специальный контент для панели "{{ panel.header }}"
      </div>
    </div>
  </ng-template>
</p-accordion>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

// =======================================================
// 🎮 PLAYGROUND
// =======================================================
export const Playground: Story = {
  args: {
    config: {
      value: [0],
      multiple: true,
      dialog: false,
    },
    withExpandableTable: false,
    panels: [
      { value: 0, header: 'Параметры', disabled: false },
      { value: 1, header: 'Сведения об обучении', disabled: false },
      { value: 2, header: 'Специальные условия', disabled: false },
    ],
    reportGroups: AccordionComponent.defaultReportGroups,
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🎮 Интерактивная песочница

**Доступные свойства для экспериментов:**
- \`config.value\`: Управление открытыми панелями (например, [0, 1])
- \`config.multiple\`: Разрешить множественное раскрытие
- \`config.dialog\`: Включить диалоговый режим
- \`withExpandableTable\`: Включить режим с таблицей
- \`panels[].disabled\`: Отключить панель
- \`panels[].isHeaderOnly\`: Сделать панель "только заголовок"

**⚠️ Важно:**
- В режиме \`withExpandableTable=true\` обязательно передавайте \`reportGroups\`
- Для кастомного контента используйте \`<ng-template #panelContent>\`
        `,
      },
    },
  },
};

// =======================================================
// 📊 ALL STATES
// =======================================================
export const AllStates: Story = {
  render: () => ({
    template: `
      <div class="states-demo">
        <!-- Базовые состояния -->
        <div class="state-group">
          <h3>📄 Базовые состояния</h3>
          <div class="states-grid">
            <div class="state-item">
              <app-accordion
                [config]="{value: [0], multiple: false, dialog: false}"
                [withExpandableTable]="false"
                [panels]="[{value: 0, header: 'Default', disabled: false}]"
              />
              <div class="state-label">Default</div>
            </div>
            <div class="state-item">
              <app-accordion
                [config]="{value: [], multiple: false, dialog: false}"
                [withExpandableTable]="false"
                [panels]="[{value: 0, header: 'Disabled', disabled: true}]"
              />
              <div class="state-label">Disabled</div>
            </div>
            <div class="state-item">
              <app-accordion
                [config]="{value: [], multiple: false, dialog: false}"
                [withExpandableTable]="false"
                [panels]="[{value: 0, header: 'Header Only', disabled: false, isHeaderOnly: true}]"
              />
              <div class="state-label">Header Only</div>
            </div>
          </div>
        </div>

        <!-- Специальные режимы -->
        <div class="state-group">
          <h3>⚙️ Специальные режимы</h3>
          <div class="states-grid">
            <div class="state-item">
              <app-accordion
                [config]="{value: [0,1], multiple: true, dialog: false}"
                [withExpandableTable]="false"
                [panels]="[
                  {value: 0, header: 'Панель 1', disabled: false},
                  {value: 1, header: 'Панель 2', disabled: false}
                ]"
              />
              <div class="state-label">Multiple Open</div>
            </div>
            <div class="state-item">
              <app-accordion
                [config]="{value: [0], multiple: false, dialog: false}"
                [withExpandableTable]="true"
                [reportGroups]="[
                  {
                    value: 0,
                    name: 'Отчёты',
                    reports: [{code: 'R1', name: 'Отчёт 1'}]
                  }
                ]"
              />
              <div class="state-label">With Table</div>
            </div>
            <div class="state-item">
              <app-accordion
                [config]="{value: [0], multiple: false, dialog: true}"
                [withExpandableTable]="false"
                [panels]="[{value: 0, header: 'Dialog Mode', disabled: false}]"
              />
              <div class="state-label">Dialog Mode</div>
            </div>
          </div>
        </div>
      </div>

      <style>
        .states-demo { display: flex; flex-direction: column; gap: 2rem; }
        .state-group { display: flex; flex-direction: column; gap: 1rem; }
        .states-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .state-item { display: flex; flex-direction: column; gap: 0.5rem; }
        .state-label { font-size: 0.75rem; color: #666; text-align: center; }
        app-accordion { width: 100%; max-width: 300px; margin: 0 auto; }
      </style>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 📊 Все состояния компонента

Демонстрация **всех реальных состояний** аккордеона:

#### Базовые состояния:
- **Default** - Стандартная панель
- **Disabled** - Отключенная панель
- **Header Only** - Панель без возможности раскрытия

#### Специальные режимы:
- **Multiple Open** - Множественное раскрытие панелей
- **With Table** - Режим с вложенной таблицей
- **Dialog Mode** - Специальные стили для диалоговых окон

**Пример кода для Header Only:**
\`\`\`html
<p-accordion
  [panels]="[
    {value: 0, header: 'Только заголовок', isHeaderOnly: true, disabled: false}
  ]"
/>
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// 📝 BASIC ACCORDION
// =======================================================
export const BasicAccordion: Story = {
  args: {
    config: {
      value: [0],
      multiple: false,
      dialog: false,
    },
    withExpandableTable: false,
    panels: [
      { value: 0, header: 'Основная информация', disabled: false },
      { value: 1, header: 'Дополнительные настройки', disabled: false },
      { value: 2, header: 'Расширенные опции', disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### 📝 Базовый аккордеон

Простой аккордеон с одиночным раскрытием панелей.

**Особенности:**
- Открыта только одна панель
- Нет вложенных таблиц
- Поддерживаются отключённые панели

**Когда использовать:**
- ✅ Простые формы с группировкой полей
- ✅ Настройки с небольшим количеством секций
- ✅ Когда нужно показать одну секцию за раз

**Пример кода:**
\`\`\`html
<p-accordion
  [config]="{value: [0], multiple: false, dialog: false}"
  [panels]="[
    {value: 0, header: 'Панель 1', disabled: false},
    {value: 1, header: 'Панель 2', disabled: false}
  ]"
/>
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// 📊 WITH EXPANDABLE TABLE
// =======================================================
export const WithExpandableTable: Story = {
  args: {
    config: {
      value: [0],
      multiple: true,
      dialog: false,
    },
    withExpandableTable: true,
    reportGroups: [
      {
        value: 0,
        name: 'Отчёты Q1 2024',
        reports: [
          { code: 'Q1-01', name: 'Отчёт по продажам' },
          { code: 'Q1-02', name: 'Финансовый отчёт' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### 📊 Аккордеон с таблицей

Сложная структура с вложенными таблицами и раскрывающимися строками.

**Особенности:**
- Включается флагом \`withExpandableTable=true\`
- Требует обязательной передачи \`reportGroups\`
- Поддерживает события \`onRowExpand\`/\`onRowCollapse\`
- Каждая строка таблицы может раскрываться в форму

**Когда использовать:**
- ✅ Отображение иерархических данных
- ✅ Когда нужно показать детализированную информацию по каждому элементу
- ✅ Для сложных отчётов с возможностью редактирования

**Пример кода:**
\`\`\`html
<p-accordion
  [withExpandableTable]="true"
  [config]="{value: [0], multiple: true, dialog: false}"
  [reportGroups]="[
    {
      value: 0,
      name: 'Отчёты Q1',
      reports: [
        {code: 'R1', name: 'Отчёт 1'},
        {code: 'R2', name: 'Отчёт 2'}
      ]
    }
  ]"
/>
\`\`\`

**Структура reportGroups:**
\`\`\`typescript
interface ReportGroup {
  value: number;       // Идентификатор группы
  name: string;        // Название группы
  reports: Array<{
    code: string;      // Код отчёта
    name: string;      // Название отчёта
  }>;
}
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// 📂 MULTIPLE PANELS
// =======================================================
export const MultiplePanels: Story = {
  args: {
    config: {
      value: [0, 1],
      multiple: true,
      dialog: false,
    },
    withExpandableTable: false,
    panels: [
      { value: 0, header: 'Основная информация', disabled: false },
      { value: 1, header: 'Дополнительные настройки', disabled: false },
      { value: 2, header: 'Расширенные опции', disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### 📂 Множественное раскрытие

Аккордеон с возможностью одновременного раскрытия нескольких панелей.

**Особенности:**
- Управляется через \`config.multiple = true\`
- Состояние хранится в \`config.value\` (массив идентификаторов)
- Полезно для сравнения информации в разных секциях

**Когда использовать:**
- ✅ Когда нужно показать несколько секций одновременно
- ✅ Для сравнения данных из разных панелей
- ✅ В административных интерфейсах

**Пример кода:**
\`\`\`html
<p-accordion
  [config]="{value: [0, 1], multiple: true, dialog: false}"
  [panels]="[
    {value: 0, header: 'Панель 1', disabled: false},
    {value: 1, header: 'Панель 2', disabled: false},
    {value: 2, header: 'Панель 3', disabled: false}
  ]"
/>
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// 🚫 DISABLED PANEL
// =======================================================
export const DisabledPanel: Story = {
  args: {
    config: {
      value: [0],
      multiple: false,
      dialog: false,
    },
    withExpandableTable: false,
    panels: [
      { value: 0, header: 'Активная панель', disabled: false },
      { value: 1, header: 'Отключенная панель', disabled: true },
      { value: 2, header: 'Ещё одна панель', disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🚫 Отключённая панель

Панель с \`disabled: true\` нельзя раскрыть и она визуально отличается.

**Особенности:**
- Визуально затемнена и неактивна
- Не реагирует на клики
- Полезно для временного отключения секций

**Когда использовать:**
- ✅ Для временно недоступных секций
- ✅ Когда нужно показать, что панель недоступна в текущем контексте
- ✅ Для панелей, требующих специальных прав доступа

**Пример кода:**
\`\`\`html
<p-accordion
  [panels]="[
    {value: 0, header: 'Активная панель', disabled: false},
    {value: 1, header: 'Отключенная', disabled: true},
    {value: 2, header: 'Другая панель', disabled: false}
  ]"
/>
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// 📌 HEADER ONLY
// =======================================================
export const HeaderOnly: Story = {
  args: {
    config: {
      value: [],
      multiple: false,
      dialog: false,
    },
    withExpandableTable: false,
    panels: [
      { value: 0, header: 'Обычная панель', disabled: false },
      {
        value: 1,
        header: 'Только заголовок',
        disabled: false,
        isHeaderOnly: true,
      },
      { value: 2, header: 'Ещё одна панель', disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### 📌 Режим "только заголовок"

Панель без возможности раскрытия, используется для статичных заголовков.

**Особенности:**
- Нет иконки раскрытия
- Не реагирует на клики
- Полезно для группировки контента без дополнительных действий

**Когда использовать:**
- ✅ Для визуального разделения секций
- ✅ Когда нужно показать заголовок без контента
- ✅ Для информационных блоков

**Пример кода:**
\`\`\`html
<p-accordion
  [panels]="[
    {value: 0, header: 'Обычная панель', disabled: false},
    {value: 1, header: 'Только заголовок', disabled: false, isHeaderOnly: true},
    {value: 2, header: 'Другая панель', disabled: false}
  ]"
/>
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// 💬 DIALOG MODE
// =======================================================
export const DialogMode: Story = {
  args: {
    config: {
      value: [0],
      multiple: false,
      dialog: true,
    },
    withExpandableTable: false,
    panels: [
      { value: 0, header: 'Настройки профиля', disabled: false },
      { value: 1, header: 'Уведомления', disabled: false },
      { value: 2, header: 'Безопасность', disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### 💬 Диалоговый режим

Специальные стили для использования аккордеона в модальных окнах.

**Особенности:**
- Включается через \`config.dialog = true\`
- Изменяет отступы и стили заголовков
- Оптимизирован для компактного отображения в диалогах

**Когда использовать:**
- ✅ В модальных окнах
- ✅ Во всплывающих панелиях
- ✅ Когда нужно сэкономить вертикальное пространство

**Пример кода:**
\`\`\`html
<div class="dialog">
  <p-accordion
    [config]="{value: [0], multiple: false, dialog: true}"
    [panels]="[
      {value: 0, header: 'Настройки', disabled: false},
      {value: 1, header: 'Уведомления', disabled: false}
    ]"
  />
</div>
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// 🏗️ PRACTICAL EXAMPLES
// =======================================================
export const PracticalExamples: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px;">
        <!-- 1. Форма настроек профиля -->
        <div>
          <h3 style="margin: 0 0 1rem; font-size: 16px; font-weight: 600; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">
            1. Форма настроек профиля
          </h3>
          <app-accordion
            [config]="{value: [0], multiple: false, dialog: false}"
            [panels]="[
              {value: 0, header: 'Основная информация', disabled: false},
              {value: 1, header: 'Контактные данные', disabled: false},
              {value: 2, header: 'Безопасность', disabled: false}
            ]"
          >
            <ng-template #panelContent let-panel>
              <div *ngIf="panel.value === 0" style="padding: 1rem;">
                <div style="margin-bottom: 1rem;">
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Имя пользователя</label>
                  <input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 1rem;">
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
                  <input type="email" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
              </div>
            </ng-template>
          </app-accordion>
        </div>

        <!-- 2. Отчёты по кварталам -->
        <div>
          <h3 style="margin: 0 0 1rem; font-size: 16px; font-weight: 600; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">
            2. Отчёты по кварталам (с таблицей)
          </h3>
          <app-accordion
            [withExpandableTable]="true"
            [config]="{value: [0], multiple: true, dialog: false}"
            [reportGroups]="[
              {
                value: 0,
                name: 'Q1 2024',
                reports: [
                  {code: 'Q1-01', name: 'Отчёт по продажам'},
                  {code: 'Q1-02', name: 'Финансовый отчёт'}
                ]
              },
              {
                value: 1,
                name: 'Q2 2024',
                reports: [
                  {code: 'Q2-01', name: 'Отчёт по логистике'},
                  {code: 'Q2-02', name: 'Маркетинговый отчёт'}
                ]
              }
            ]"
          />
        </div>

        <!-- 3. Диалоговые настройки -->
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; background: #f8f9fa; max-width: 500px;">
          <h3 style="margin: 0 0 1rem; font-size: 16px; font-weight: 600;">
            3. Настройки уведомлений (диалоговый режим)
          </h3>
          <app-accordion
            [config]="{value: [0], multiple: false, dialog: true}"
            [panels]="[
              {value: 0, header: 'Email уведомления', disabled: false},
              {value: 1, header: 'Push уведомления', disabled: false},
              {value: 2, header: 'SMS уведомления', disabled: true}
            ]"
          >
            <ng-template #panelContent let-panel>
              <div *ngIf="panel.value === 0" style="padding: 1rem;">
                <div style="margin-bottom: 1rem;">
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Частота уведомлений</label>
                  <select style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option>Ежедневно</option>
                    <option>Еженедельно</option>
                    <option>Ежемесячно</option>
                  </select>
                </div>
                <button style="padding: 0.5rem 1rem; background: #0d4cd3; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  Сохранить настройки
                </button>
              </div>
            </ng-template>
          </app-accordion>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 🏗️ Практические примеры использования

Реальные сценарии использования аккордеона в приложении:

#### 1️⃣ Форма настроек профиля
\`\`\`html
<app-accordion [config]="{dialog: false}">
  <ng-template #panelContent let-panel>
    <div *ngIf="panel.value === 0">
      <!-- Форма редактирования профиля -->
    </div>
  </ng-template>
</app-accordion>
\`\`\`

#### 2️⃣ Отчёты по кварталам с таблицей
\`\`\`html
<app-accordion
  [withExpandableTable]="true"
  [reportGroups]="reportGroups"
/>
\`\`\`

#### 3️⃣ Настройки в диалоговом окне
\`\`\`html
<div class="dialog">
  <app-accordion [config]="{dialog: true}">
    <!-- Контент -->
  </app-accordion>
</div>
\`\`\`

**Рекомендации по использованию:**
- Для простых форм используйте базовый аккордеон
- Для сложных иерархических данных - режим с таблицей
- В модальных окнах всегда используйте \`dialog: true\`
- Для временно недоступных секций используйте \`disabled: true\`
        `,
      },
    },
  },
};
