import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent, TabItem } from '../app/components/tabs/tabs.component';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],

  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'select-button', 'tabs-in-card'],
      description: `Вариант отображения табов (согласно документации):
- **standard**: p-tabs с styleClass="tabview" (основные табы на странице)
- **select-button**: p-selectButton с class="datatable-tabs" (табы внутри карточки)
- **tabs-in-card**: p-tabs с class="datatable-tabs" на p-tablist (табы как в карточке, в диалогах)`,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'standard' },
      },
    },
    tabs: {
      control: 'object',
      description: 'Массив табов для отображения',
      table: {
        category: 'Data',
      },
    },
    activeTab: {
      control: 'text',
      description: 'Значение активного таба',
      table: {
        category: 'State',
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Режим "только иконки" (автоматически переключает на tabs-in-card)',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    showCard: {
      control: 'boolean',
      description: 'Показывать компонент внутри p-card',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    styleClass: {
      control: 'text',
      description: 'Дополнительный CSS-класс',
      table: {
        category: 'Styling',
      },
    },
    tabChange: {
      action: 'tabChange',
      description: 'Событие при смене активного таба',
      table: {
        category: 'Events',
      },
    },
  },

  parameters: {
    docs: {
      description: {
        component: `
# Tabs Component

Универсальный компонент табов с поддержкой **трёх вариантов** согласно документации проекта.

## 📋 Варианты табов:

### 1️⃣ Standard (p-tabs)
**Основные табы на странице**
- Компонент: \`p-tabs\`
- Класс стилей: \`styleClass="tabview"\`
- Пример: Участники ГИА - Добавить
- URL: https://app-master.oisu-gia.srvdev.ru/planning/gia-participants/new

### 2️⃣ Select Button (p-selectButton)
**Табы внутри карточки, компонент**
- Компонент: \`p-selectButton\`
- Класс стилей: \`class="datatable-tabs"\`
- Пример: Участники ГИА - Добавить (внутри карточки)
- URL: https://app-master.oisu-gia.srvdev.ru/planning/gia-participants/new

### 3️⃣ Tabs in Card (p-tabs)
**Табы как в карточке, компонент**
- Компонент: \`p-tabs\`
- Класс стилей: \`class="datatable-tabs"\` на \`p-tablist\`
- Пример: Планирование ППЭ - Рассадка - Автоматическая рассадка (в диалоге "Отчет")
- URL: https://app-master.oisu-gia.srvdev.ru/planning/planning/seating-ppe-exam-assignment

## ✨ Основные возможности:
- ✅ **3 визуальных варианта** согласно документации
- ✅ **Поддержка иконок** и режима "только иконки"
- ✅ **Индикатор ошибок** (красный кружок с числом)
- ✅ **Disabled состояние** для отдельных табов
- ✅ **Focus states** с жёлтым фоном и фиолетовой рамкой
- ✅ **Интеграция с PrimeNG** (p-tabs, p-selectButton)
- ✅ **Оптимизация производительности** (trackBy функции)

## 📝 Пример использования:

### Standard (основные табы):
\`\`\`html
<app-tabs
  variant="standard"
  [tabs]="tabs"
  [activeTab]="'0'"
  (tabChange)="onTabChange($event)"
></app-tabs>
\`\`\`

### Select Button (табы внутри карточки):
\`\`\`html
<app-tabs
  variant="select-button"
  [tabs]="tabs"
  [activeTab]="'0'"
></app-tabs>
\`\`\`

### Tabs in Card (табы в диалогах):
\`\`\`html
<app-tabs
  variant="tabs-in-card"
  [tabs]="tabs"
  [activeTab]="'0'"
></app-tabs>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

// =======================================================
// 🎮 PLAYGROUND
// =======================================================

export const Playground: Story = {
  args: {
    variant: 'standard',
    tabs: [
      { label: 'Отчеты ГИА-11', value: '0', icon: 'pi pi-chart-bar' },
      { label: 'Конструктор', value: '1', icon: 'pi pi-wrench' },
      { label: 'Сохранены', value: '2', icon: 'pi pi-save' },
    ],
    activeTab: '0',
    iconOnly: false,
    showCard: false,
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🎮 Playground

Интерактивная песочница для экспериментов со всеми вариантами табов.

## Попробуйте:
1. Переключите \`variant\` между **standard**, **select-button** и **tabs-in-card**
2. Включите \`showCard\` для отображения в карточке
3. Включите \`iconOnly\` для режима только иконок (автоматически → tabs-in-card)
4. Добавьте \`errorCount\` в один из табов
5. Установите \`disabled: true\` для таба
        `,
      },
    },
  },
};

// =======================================================
// 📝 STANDARD TABS (Вариант №1)
// =======================================================

export const StandardTabs: Story = {
  args: {
    variant: 'standard',
    tabs: [
      { label: 'Основная информация', value: '0' },
      { label: 'Экзамены', value: '1' },
      { label: 'Документы', value: '2' },
    ],
    activeTab: '0',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 📝 Standard Tabs (p-tabs)

**Основные табы на странице** — вариант №1 из документации.

## Компонент:
\`p-tabs\` с \`styleClass="tabview"\`

## Пример из проекта:
**Участники ГИА - Добавить**
\`https://app-master.oisu-gia.srvdev.ru/planning/gia-participants/new\`

## Код из проекта:
\`\`\`html
<p-tabs styleClass="tabview" [value]="selectedTabHeader">
  <p-tabpanels>
    <p-tabpanel [value]="0">...</p-tabpanel>
    <p-tabpanel [value]="1">...</p-tabpanel>
  </p-tabpanels>
</p-tabs>
\`\`\`

## Особенности:
- Серый фон контейнера (\`#ecf0f8\`)
- Синяя линия под активным табом
- Hover-эффект со светло-синей линией
- Focus state с жёлтым фоном и фиолетовой рамкой
        `,
      },
    },
  },
};

// =======================================================
// 🔘 SELECT BUTTON TABS (Вариант №2)
// =======================================================

export const SelectButtonTabs: Story = {
  args: {
    variant: 'select-button',
    tabs: [
      { label: 'Предстоящие экзамены', value: '0' },
      { label: 'Экзамены для итогового сочинения (изложения)', value: '1' },
    ],
    activeTab: '0',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🔘 Select Button Tabs (p-selectButton)

**Табы внутри карточки, компонент** — вариант №2 из документации.

## Компонент:
\`p-selectButton\` с \`class="datatable-tabs"\`

## Пример из проекта:
**Участники ГИА - Добавить** (внутри карточки)
\`https://app-master.oisu-gia.srvdev.ru/planning/gia-participants/new\`

Файл: \`/src/app/gia-participant/gia-participant-card/gia-participant-card.component.html\`

## Код из проекта:
\`\`\`html
<p-selectButton
  class="datatable-tabs"
  [options]="options"
  [(ngModel)]="selectedValue"
></p-selectButton>
\`\`\`

## Особенности:
- Серый контейнер с border-radius (12px)
- Активная кнопка — белый фон
- Компактный вид для переключения режимов
- Идеально для фильтров внутри карточек
- Класс \`datatable-tabs\` задаёт стили
        `,
      },
    },
  },
};

// =======================================================
// 🎯 TABS IN CARD (Вариант №3)
// =======================================================

export const TabsInCard: Story = {
  args: {
    variant: 'tabs-in-card',
    tabs: [
      { label: 'Сводные данные', value: '0' },
      { label: 'Предупреждения', value: '1' },
    ],
    activeTab: '0',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🎯 Tabs in Card (p-tabs)

**Табы как в карточке, компонент** — вариант №3 из документации.

## Компонент:
\`p-tabs\` с \`class="datatable-tabs"\` на \`p-tablist\`

## Пример из проекта:
**Планирование ППЭ - Рассадка - Автоматическая рассадка** (в диалоге "Отчет")
\`https://app-master.oisu-gia.srvdev.ru/planning/planning/seating-ppe-exam-assignment\`

Файл: \`/src/app/planning/seating/station-list/seating-result/seating-result-form.component.html\`

## Код из проекта:
\`\`\`html
<p-tabs styleClass="tabview" value="0">
  <p-tablist class="datatable-tabs">
    <p-tab value="0">Сводные данные</p-tab>
    <p-tab value="1">Предупреждения</p-tab>
  </p-tablist>
  <p-tabpanels>
    <p-tabpanel value="0"></p-tabpanel>
    <p-tabpanel value="1"></p-tabpanel>
  </p-tabpanels>
</p-tabs>
\`\`\`

## Особенности:
- Серый контейнер с border-radius
- Активный таб — белый фон
- Используется в диалоговых окнах
- Компактное отображение для ограниченного пространства
- Класс \`datatable-tabs\` применяется на \`p-tablist\`
        `,
      },
    },
  },
};

// =======================================================
// 🔘 ICON ONLY TABS
// =======================================================

export const IconOnlyTabs: Story = {
  args: {
    variant: 'standard',
    iconOnly: true,
    tabs: [
      { label: 'Редактировать', value: '0', icon: 'pi pi-home' },
      { label: 'Удалить', value: '1', icon: 'pi pi-trash' },
      { label: 'Настройки', value: '2', icon: 'pi pi-check' },
    ],
    activeTab: '0',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🔘 Табы только с иконками

Компактный режим с отображением только иконок (24x24px).

## Особенности:
- Автоматически переключается на \`variant="tabs-in-card"\`
- Квадратные кнопки 24x24px
- Только иконка без текста
- Класс \`.icon-only\`

## CSS:
\`\`\`scss
.icon-only {
  width: 24px;
  font-size: 24px;
}
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// ⚠️ TABS WITH ERRORS
// =======================================================

export const TabsWithErrors: Story = {
  args: {
    variant: 'standard',
    tabs: [
      { label: 'Валидные данные', value: '0' },
      { label: 'Есть ошибки', value: '1', errorCount: 3 },
      { label: 'Критические ошибки', value: '2', errorCount: 12 },
    ],
    activeTab: '1',
  },

  parameters: {
    docs: {
      description: {
        story: `
# ⚠️ Табы с индикатором ошибок

Красный кружок с числом ошибок рядом с названием таба.

## Работает во всех вариантах:
- ✅ Standard
- ✅ Select Button
- ✅ Tabs in Card

## CSS:
\`\`\`scss
.p-error.p-error-exclamation {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.563rem;  // 25px
  height: 1.25rem;  // 20px
  background: var(--global-red-color);
  border-radius: 0.625rem;  // 10px
  color: var(--global-white-color);
  margin-left: 0.5rem;
}
\`\`\`
        `,
      },
    },
  },
};

// =======================================================
// 🚫 DISABLED TABS
// =======================================================

export const DisabledTabs: Story = {
  args: {
    variant: 'standard',
    tabs: [
      { label: 'Активный таб', value: '0' },
      { label: 'Заблокирован', value: '1', disabled: true },
      { label: 'Доступен', value: '2' },
    ],
    activeTab: '0',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🚫 Заблокированные табы

Табы в состоянии \`disabled\`.

## Особенности:
- Серый цвет текста
- Нет hover-эффекта
- Нельзя переключиться
- Курсор \`not-allowed\`
        `,
      },
    },
  },
};

// =======================================================
// 📊 SELECT BUTTON WITH ERRORS
// =======================================================

export const SelectButtonWithErrors: Story = {
  args: {
    variant: 'select-button',
    tabs: [
      { label: 'Предстоящие экзамены', value: '0', errorCount: 5 },
      { label: 'Экзамены ОПУС', value: '1' },
    ],
    activeTab: '0',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 📊 Select Button с ошибками

Демонстрация индикатора ошибок в варианте \`select-button\`.

## Особенности:
- Красный кружок справа от текста
- Работает аналогично стандартным табам
- Использует кастомный template для p-selectButton
        `,
      },
    },
  },
};

// =======================================================
// 🎨 TABS IN CARD WITH ICONS
// =======================================================

export const TabsInCardWithIcons: Story = {
  args: {
    variant: 'tabs-in-card',
    tabs: [
      { label: 'Сводные данные', value: '0', icon: 'pi pi-chart-bar' },
      { label: 'Предупреждения', value: '1', icon: 'pi pi-exclamation-triangle' },
      { label: 'Статистика', value: '2', icon: 'pi pi-calculator' },
    ],
    activeTab: '0',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🎨 Tabs in Card с иконками

Табы как в карточке с иконками и текстом.

## Использование:
Идеально для диалоговых окон с несколькими разделами.

## Пример:
Диалог "Отчет" в рассадке ППЭ.
        `,
      },
    },
  },
};

// =======================================================
// 📦 IN CARD WRAPPER
// =======================================================

export const InCardWrapper: Story = {
  args: {
    variant: 'select-button',
    showCard: true,
    tabs: [
      { label: 'Предстоящие экзамены', value: '0' },
      { label: 'Экзамены ОПУС', value: '1' },
    ],
    activeTab: '0',
  },

  parameters: {
    docs: {
      description: {
        story: `
# 📦 Табы внутри карточки (обёртка)

Демонстрация табов внутри \`p-card\`.

## Особенности:
- Установлен \`showCard={true}\`
- Табы отображаются внутри карточки
- Используется для \`select-button\` варианта
        `,
      },
    },
  },
};

// =======================================================
// 📋 ALL VARIANTS COMPARISON
// =======================================================

export const AllVariantsComparison: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h2>1️⃣ Standard (p-tabs)</h2>
          <p style="color: #666; margin-bottom: 1rem;">Основные табы на странице</p>
          <app-tabs
            variant="standard"
            [tabs]="[
              { label: 'Таб 1', value: '0' },
              { label: 'Таб 2', value: '1' },
              { label: 'Таб 3', value: '2' }
            ]"
            [activeTab]="'0'"
          ></app-tabs>
        </div>

        <div>
          <h2>2️⃣ Select Button (p-selectButton)</h2>
          <p style="color: #666; margin-bottom: 1rem;">Табы внутри карточки</p>
          <app-tabs
            variant="select-button"
            [tabs]="[
              { label: 'Режим 1', value: '0' },
              { label: 'Режим 2', value: '1' }
            ]"
            [activeTab]="'0'"
          ></app-tabs>
        </div>

        <div>
          <h2>3️⃣ Tabs in Card (p-tabs)</h2>
          <p style="color: #666; margin-bottom: 1rem;">Табы как в карточке (в диалогах)</p>
          <app-tabs
            variant="tabs-in-card"
            [tabs]="[
              { label: 'Сводные данные', value: '0' },
              { label: 'Предупреждения', value: '1' }
            ]"
            [activeTab]="'0'"
          ></app-tabs>
        </div>
      </div>
    `,
  }),

  parameters: {
    docs: {
      description: {
        story: `
# 📋 Сравнение всех вариантов

Демонстрация всех трёх вариантов табов из документации на одной странице.

## Визуальные различия:
1. **Standard** — широкие табы с серым фоном и синей линией снизу
2. **Select Button** — компактные кнопки в сером контейнере
3. **Tabs in Card** — компактные табы с datatable-tabs стилями
        `,
      },
    },
  },
};
