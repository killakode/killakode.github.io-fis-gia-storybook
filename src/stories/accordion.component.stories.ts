import type { Meta, StoryObj } from '@storybook/angular';
import {
  AccordionComponent,
  type AccordionConfig,
  type AccordionPanelConfig,
  type ReportGroup,
} from '../app/components/accordion/accordion.component';

// Интерфейс для события
interface RowEvent {
  type: 'onRowExpand' | 'onRowCollapse';
  data: any;
}

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
      description: `
Дополнительные CSS классы для корневого элемента.
**Доступные модификаторы:**
- \`.dialog\` - для диалогового режима
- \`.compact\` - уменьшенные отступы
      `,
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
- Вложенных таблиц с раскрытием строк (режим withExpandableTable)
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
   - Полностью переопределённые стили
   - Кастомные иконки через icomoon
   - Дополнительные режимы (диалоговый, табличный)

4. **Ограничения**:
   - Максимальное рекомендуемое количество панелей: 15
   - Не поддерживается вложенность аккордеонов
   - В режиме \`withExpandableTable\` не работает \`isHeaderOnly\`

---
## 📜 События

Компонент поддерживает следующие события:

| Событие          | Описание                                      | Данные события                     | Когда использовать |
|------------------|-----------------------------------------------|-------------------------------------|---------------------|
| onPanelOpen      | Срабатывает при открытии панели              | { panel: AccordionPanelConfig }     | Для логирования или загрузки данных при открытии панели |
| onPanelClose     | Срабатывает при закрытии панели              | { panel: AccordionPanelConfig }     | Для сохранения состояния или очистки данных |
| onRowExpand      | Срабатывает при раскрытии строки таблицы     | { data: Report, index: number }     | Только для режима withExpandableTable. Используйте для загрузки детальной информации по строке |
| onRowCollapse    | Срабатывает при сворачивании строки таблицы | { data: Report, index: number }     | Только для режима withExpandableTable |

**Пример использования событий:**
\`\`\`html
<app-accordion
  [config]="config"
  [panels]="panels"
  (onPanelOpen)="onPanelOpen($event)"
  (onRowExpand)="onRowExpand($event)"
>
  <!-- Контент -->
</app-accordion>
\`\`\`

\`\`\`typescript
// В компоненте
onPanelOpen(event: { panel: AccordionPanelConfig }) {
  console.log('Открыта панель:', event.panel.header);
  // Загрузка данных для панели
}

onRowExpand(event: { data: Report, index: number }) {
  console.log('Раскрыта строка:', event.data.name);
  // Загрузка детальной информации для строки
}
\`\`\`

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
\`\`\`        `,
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
// 📊 WITH EXPANDABLE TABLE (Пример из GIA11 Reports)
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
        name: 'Отчёты ГИА-11 за Q1 2024',
        reports: [
          { code: 'GIA11-Q1-01', name: 'Отчёт по регистрации участников' },
          { code: 'GIA11-Q1-02', name: 'Отчёт по распределению по ППЭ' },
          { code: 'GIA11-Q1-03', name: 'Отчёт по конфликтам' },
        ],
      },
      {
        value: 1,
        name: 'Отчёты ГИА-11 за Q2 2024',
        reports: [
          { code: 'GIA11-Q2-01', name: 'Отчёт по апелляциям' },
          { code: 'GIA11-Q2-02', name: 'Отчёт по результатам' },
        ],
      },
    ],
  },
  render: (args) => ({
    template: `
      <app-accordion
        [config]="config"
        [withExpandableTable]="withExpandableTable"
        [reportGroups]="reportGroups"
        (onRowExpand)="onRowExpand($event)"
        (onRowCollapse)="onRowCollapse($event)"
      >
        <ng-template #expandedrow let-report>
          <tr>
            <td colspan="2" style="padding: 1rem; background: #f8f9fa;">
              <div style="display: flex; gap: 1rem; align-items: center;">
                <i class="pi pi-file" style="font-size: 2rem; color: #495057;"></i>
                <div>
                  <h4 style="margin: 0 0 0.5rem; font-size: 1.1rem;">{{ report.name }}</h4>
                  <p style="margin: 0; color: #666;">Код отчёта: {{ report.code }}</p>
                </div>
              </div>
              <div style="margin-top: 1rem;">
                <button pButton label="Скачать" icon="pi pi-download" style="margin-right: 0.5rem;"></button>
                <button pButton label="Редактировать" icon="pi pi-pencil" class="p-button-secondary"></button>
              </div>
            </td>
          </tr>
        </ng-template>
      </app-accordion>

      <div *ngIf="lastEvent" style="margin-top: 1rem; padding: 0.75rem; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 0.875rem;">
        <div style="color: #0d4cd3; margin-bottom: 0.25rem;">Последнее событие:</div>
        <pre style="margin: 0;">{{ lastEvent | json }}</pre>
      </div>
    `,
    props: {
      ...args,
      lastEvent: null as RowEvent | null,
      onRowExpand: function (this: any, event: { data: any; index: number }) {
        this.lastEvent = { type: 'onRowExpand', data: event.data };
        console.log('Row expanded:', event.data);
      },
      onRowCollapse: function (this: any, event: { data: any; index: number }) {
        this.lastEvent = { type: 'onRowCollapse', data: event.data };
        console.log('Row collapsed:', event.data);
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 📊 Аккордеон с таблицей (как в GIA11 Reports)

**Реальный пример из:**
🔗 [Отчёты ГИА-11](https://app-master.oisu-gia.srvdev.ru/planning/gia11-reports)

**Особенности:**
- Включается флагом \`withExpandableTable=true\`
- Требует обязательной передачи \`reportGroups\` (как в \`gia11-reports.component.html\`)
- Поддерживает события \`onRowExpand\`/\`onRowCollapse\` (см. лог ниже)
- Каждая строка таблицы может раскрываться в форму

**Структура reportGroups (как в реальном коде):**
\`\`\`typescript
interface ReportGroup {
  value: number;       // Идентификатор группы (например, квартал)
  name: string;        // Название группы (например, "Q1 2024")
  reports: Array<{
    code: string;      // Код отчёта (например, "GIA11-Q1-01")
    name: string;      // Название отчёта
  }>;
}
\`\`\`

**Пример использования с обработкой событий:**
\`\`\`html
<app-accordion
  [withExpandableTable]="true"
  [config]="{value: [0], multiple: true}"
  [reportGroups]="reportGroups"
  (onRowExpand)="onRowExpand($event)"
  (onRowCollapse)="onRowCollapse($event)"
>
  <ng-template #expandedrow let-report>
    <tr>
      <td colspan="2">
        <!-- Кастомная форма для строки (как в gia11-reports) -->
        <app-report-form [reportCode]="report.code" />
      </td>
    </tr>
  </ng-template>
</app-accordion>
\`\`\`

**TS-код для обработки событий:**
\`\`\`typescript
// В компоненте
lastEvent: { type: string, data: any } | null = null;

onRowExpand(event: { data: Report, index: number }) {
  this.lastEvent = { type: 'onRowExpand', data: event.data };
  console.log('Раскрыта строка:', event.data.name);
  // Загрузка дополнительных данных для строки
}

onRowCollapse(event: { data: Report, index: number }) {
  this.lastEvent = { type: 'onRowCollapse', data: event.data };
  console.log('Свернута строка:', event.data.name);
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

Панель с \`disabled: true\` нельзя раскрыть, и она визуально отличается.

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
// 🏗️ PRACTICAL EXAMPLES (Реальные примеры из проекта)
// =======================================================
export const PracticalExamples: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px;">
        <!-- 1. Форма настроек профиля -->
        <div>
          <h3 style="margin: 0 0 1rem; font-size: 16px; font-weight: 600; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">
            1. Форма настроек профиля (базовый аккордеон)
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
              <div *ngIf="panel.value === 1" style="padding: 1rem;">
                <div style="margin-bottom: 1rem;">
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Телефон</label>
                  <input type="tel" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
              </div>
            </ng-template>
          </app-accordion>
        </div>

        <!-- 2. Отчёты по кварталам (как в GIA11 Reports) -->
        <div>
          <h3 style="margin: 0 0 1rem; font-size: 16px; font-weight: 600; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">
            2. Отчёты ГИА-11 по кварталам (с таблицей)
            <small style="display: block; margin-top: 0.25rem; color: #666;">
              🔗 <a href="https://app-master.oisu-gia.srvdev.ru/planning/gia11-reports" target="_blank">Реальный пример в системе</a>
            </small>
          </h3>
          <app-accordion
            [withExpandableTable]="true"
            [config]="{value: [0], multiple: true, dialog: false}"
            [reportGroups]="[
              {
                value: 0,
                name: 'GIA11: Q1 2024',
                reports: [
                  {code: 'GIA11-Q1-01', name: 'Отчёт по регистрации участников'},
                  {code: 'GIA11-Q1-02', name: 'Отчёт по распределению по ППЭ'},
                  {code: 'GIA11-Q1-03', name: 'Отчёт по конфликтам'}
                ]
              },
              {
                value: 1,
                name: 'GIA11: Q2 2024',
                reports: [
                  {code: 'GIA11-Q2-01', name: 'Отчёт по апелляциям'},
                  {code: 'GIA11-Q2-02', name: 'Отчёт по результатам'}
                ]
              }
            ]"
            (onRowExpand)="onRowExpand($event)"
            (onRowCollapse)="onRowCollapse($event)"
          >
            <ng-template #expandedrow let-report>
              <tr>
                <td colspan="2" style="padding: 1rem; background: #f8f9fa;">
                  <!-- Кастомная форма для строки (как в реальном проекте) -->
                  <div style="display: flex; gap: 1rem; align-items: center;">
                    <i class="pi pi-file" style="font-size: 2rem; color: #495057;"></i>
                    <div>
                      <h4 style="margin: 0 0 0.5rem; font-size: 1.1rem;">{{ report.name }}</h4>
                      <p style="margin: 0; color: #666;">Код отчёта: {{ report.code }}</p>
                    </div>
                  </div>
                  <div style="margin-top: 1rem;">
                    <button pButton label="Скачать" icon="pi pi-download" style="margin-right: 0.5rem;"></button>
                    <button pButton label="Редактировать" icon="pi pi-pencil" class="p-button-secondary"></button>
                  </div>
                </td>
              </tr>
            </ng-template>
          </app-accordion>
        </div>
      </div>

      <!-- Скрытый блок для демонстрации обработки событий -->
      <div *ngIf="lastEvent" style="margin-top: 2rem; padding: 1rem; background: #f0f0f0; border-radius: 4px;">
        <h4 style="margin: 0 0 0.5rem;">Последнее событие:</h4>
        <pre style="margin: 0; font-size: 0.875rem;">{{ lastEvent | json }}</pre>
      </div>
    `,
    component: class {
      lastEvent: RowEvent | null = null;

      onRowExpand(event: { data: any; index: number }) {
        this.lastEvent = { type: 'onRowExpand', data: event.data };
        console.log('Row expanded:', event.data);
      }

      onRowCollapse(event: { data: any; index: number }) {
        this.lastEvent = { type: 'onRowCollapse', data: event.data };
        console.log('Row collapsed:', event.data);
      }
    },
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 🏗️ Практические примеры использования (из реального проекта)

Реальные сценарии использования аккордеона в системе ОИСУ ГИА.

---

#### 1️⃣ **Форма настроек профиля**
Базовый аккордеон для группировки полей в форме.
**Когда использовать:**
- Простые формы с 2-4 группами полей
- Когда нужно показать одну группу полей за раз

---

#### 2️⃣ **Отчёты ГИА-11 по кварталам**
**Реальный пример:** [Отчёты ГИА-11](https://app-master.oisu-gia.srvdev.ru/planning/gia11-reports)
**Особенности:**
- Режим \`withExpandableTable=true\`
- Кастомный контент в раскрытой строке (\`<ng-template #expandedrow>\`)
- Обработка событий \`onRowExpand\`/\`onRowCollapse\` (см. лог ниже)
- Данные загружаются динамически при раскрытии строки

**Структура reportGroups (как в реальном коде):**
\`\`\`typescript
// Пример из gia11-reports.component.ts
this.reportGroups = [
  {
    value: 1, // ID квартала
    name: 'GIA11: Q1 2024',
    reports: [
      { code: 'GIA11-Q1-01', name: 'Отчёт по регистрации' },
      { code: 'GIA11-Q1-02', name: 'Отчёт по распределению' }
    ]
  }
];
\`\`\`

---
### 📌 Рекомендации по использованию
| Сценарий | Рекомендуемый компонент | Пример использования |
|----------|-------------------------|----------------------|
| Простые формы с группировкой полей | Базовый аккордеон (\`p-accordion\`) | Настройки профиля |
| Иерархические данные с таблицами | \`withExpandableTable=true\` | Отчёты ГИА-11 |
        `,
      },
    },
  },
};
