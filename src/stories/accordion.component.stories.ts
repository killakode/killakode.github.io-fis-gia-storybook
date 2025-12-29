import type { Meta, StoryObj } from '@storybook/angular';
import {
  AccordionComponent,
  type AccordionConfig,
  type AccordionPanelConfig,
} from '../app/components/accordion/accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],

  argTypes: {
    config: {
      control: 'object',
      description: 'Общая конфигурация аккордеона',
      table: { category: 'Config' },
    },
    panels: {
      control: 'object',
      description: 'Массив панелей',
      table: { category: 'Config' },
    },
    reportGroups: {
      control: 'object',
      description: 'Группы отчётов для таблицы',
      table: { category: 'Data' },
    },
    styleClass: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
      table: { category: 'Styling' },
    },
    demoState: {
      control: 'select',
      options: ['hover', 'active', 'focus', 'disabled', undefined],
      description: 'Демо-состояние для Storybook',
      table: { category: 'Styling' },
    },
    panelContent: {
      control: false,
      table: { disable: true },
    },
  },

  parameters: {
    docs: {
      description: {
        component: `
# Accordion Component

Универсальный компонент аккордеона на базе PrimeNG.

## Основные возможности:
- ✅ Одиночное/множественное раскрытие
- ✅ Отключение панелей
- ✅ Кастомный контент через ng-template
- ✅ Режим "только заголовок"
- ✅ Вложенные аккордеоны
- ✅ Таблицы с раскрывающимися строками
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
      withExpandableTable: false,
    },
    panels: AccordionComponent.defaultPanels,
    reportGroups: AccordionComponent.defaultReportGroups,
    styleClass: '',
    demoState: undefined,
  },
};

// =======================================================
// 📝 BASIC
// =======================================================
export const Basic: Story = {
  args: {
    config: {
      value: [0],
      multiple: false,
      dialog: false,
      withExpandableTable: false,
    },
    panels: [
      { value: 0, header: 'Параметры', disabled: false },
      { value: 1, header: 'Сведения об обучении', disabled: false },
      { value: 2, header: 'Специальные условия', disabled: false },
    ],
  },

  parameters: {
    docs: {
      description: {
        story: `
# 📝 Базовый аккордеон

Простой аккордеон с одной открытой панелью.
        `,
      },
    },
  },
};

// =======================================================
// 📊 ACCORDION С ТАБЛИЦЕЙ И РАСКРЫВАЮЩИМИСЯ СТРОКАМИ
// =======================================================
export const WithExpandableTable: Story = {
  args: {
    config: {
      value: [0],
      multiple: true,
      dialog: false,
      withExpandableTable: true, // ← ВКЛЮЧАЕМ РЕЖИМ ТАБЛИЦЫ
    },
    reportGroups: AccordionComponent.defaultReportGroups,
  },

  parameters: {
    docs: {
      description: {
        story: `
# 📊 Аккордеон с таблицей и раскрывающимися строками

Сложная вложенная структура:

1. **Аккордеон** — группы отчётов
2. **Таблица** внутри каждой панели аккордеона
3. **Раскрывающиеся строки** — при клике на строку показывается форма отчёта

Включается флагом \`withExpandableTable: true\` в конфигурации.

## Функционал формы (визуальная имитация):
- Выбор этапа сдачи (p-select)
- Радиокнопки для разбивки отчёта
- Кнопки "Сформировать" и "Сбросить"

Все стили применяются из \`accordion.component.scss\`.
        `,
      },
    },
  },
};

// =======================================================
// 📂 MULTIPLE OPEN
// =======================================================
export const MultipleOpen: Story = {
  args: {
    config: {
      value: [0, 1],
      multiple: true,
      dialog: false,
      withExpandableTable: false,
    },
    panels: AccordionComponent.defaultPanels,
  },

  parameters: {
    docs: {
      description: {
        story: `
# 📂 Множественное раскрытие

Несколько панелей открыты одновременно.
        `,
      },
    },
  },
};

// =======================================================
// 🚫 WITH DISABLED PANEL
// =======================================================
export const WithDisabledPanel: Story = {
  args: {
    config: {
      value: [0],
      multiple: true,
      dialog: false,
      withExpandableTable: false,
    },
    panels: [
      { value: 0, header: 'Параметры', disabled: false },
      { value: 1, header: 'Сведения (отключено)', disabled: true },
      { value: 2, header: 'Специальные условия', disabled: false },
    ],
  },

  parameters: {
    docs: {
      description: {
        story: `
# 🚫 Отключённая панель

Одна из панелей отключена и недоступна для раскрытия.
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
      withExpandableTable: false,
    },
    panels: [
      { value: 0, header: 'Параметры', disabled: false },
      { value: 1, header: 'Только заголовок', disabled: false, isHeaderOnly: true },
      { value: 2, header: 'Специальные условия', disabled: false },
    ],
  },

  parameters: {
    docs: {
      description: {
        story: `
# 📌 Режим "только заголовок"

Панель без раскрытия и иконки.
        `,
      },
    },
  },
};
