import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiselectComponent } from '../app/components/multiselect/multiselect.component';

const meta: Meta<MultiselectComponent> = {
  title: 'Components/Multiselect',
  component: MultiselectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, BrowserAnimationsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# Multiselect Component

Компонент множественного выбора на базе PrimeNG MultiSelect с кастомными стилями.

## Основные возможности
- Множественный выбор опций
- Автоматический перенос длинного текста в опциях
- Фильтрация списка
- Отображение выбранных значений (comma/chip)
- Кастомная кнопка вместо выбранных элементов
- Ограничение количества выбранных элементов
- Вывод overlay в body или в контейнер

## CSS переменные
- \`--p-multiselect-background\` — фон компонента
- \`--p-multiselect-border-color\` — цвет границы
- \`--p-multiselect-focus-border-color\` — цвет границы в фокусе
- \`--p-multiselect-option-selected-background\` — фон выбранной опции
- \`--p-multiselect-option-padding\` — padding опций

## Особенности
- **Перенос текста**: все опции автоматически переносят длинный текст (white-space: normal)
- **Иконка очистки**: кастомная иконка (icon-close) с интерактивными состояниями
- **Dropdown анимация**: поворот иконки на 180° при открытии
- **Кастомный scrollbar**: 1rem ширина, закругленный thumb
        `,
      },
    },
  },
  argTypes: {
    // PrimeNG Props
    options: {
      control: 'object',
      description: 'Массив опций для выбора',
      table: { category: 'PrimeNG Props' },
    },
    optionLabel: {
      control: 'text',
      description: 'Поле объекта для отображения',
      table: { category: 'PrimeNG Props' },
    },
    optionValue: {
      control: 'text',
      description: 'Поле объекта для значения',
      table: { category: 'PrimeNG Props' },
    },
    placeholder: {
      control: 'text',
      description: 'Текст placeholder',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
      table: { category: 'State' },
    },
    showClear: {
      control: 'boolean',
      description: 'Показывать кнопку очистки',
      table: { category: 'PrimeNG Props' },
    },
    filter: {
      control: 'boolean',
      description: 'Включить фильтрацию',
      table: { category: 'PrimeNG Props' },
    },
    display: {
      control: 'select',
      options: ['comma', 'chip'],
      description: 'Способ отображения выбранных значений',
      table: { category: 'PrimeNG Props' },
    },
    maxSelectedLabels: {
      control: 'number',
      description: 'Максимум отображаемых меток',
      table: { category: 'PrimeNG Props' },
    },
    selectionLimit: {
      control: 'number',
      description: 'Лимит выбора элементов',
      table: { category: 'PrimeNG Props' },
    },
    selectedItemsLabel: {
      control: 'text',
      description: 'Шаблон текста выбранных элементов ({0} = количество)',
      table: { category: 'Content' },
    },
    showToggleAll: {
      control: 'boolean',
      description: 'Показывать чекбокс "Выбрать все"',
      table: { category: 'PrimeNG Props' },
    },
    dropdownIcon: {
      control: 'text',
      description: 'CSS класс иконки dropdown',
      table: { category: 'PrimeNG Props' },
    },
    appendTo: {
      control: 'select',
      options: [null, 'body'],
      description: 'Куда прикреплять overlay (null = контейнер, body = документ)',
      table: { category: 'PrimeNG Props' },
    },
    styleClass: {
      control: 'text',
      description: 'CSS класс для компонента',
      table: { category: 'Custom Classes' },
    },
    panelStyleClass: {
      control: 'text',
      description: 'CSS класс для overlay панели',
      table: { category: 'Custom Classes' },
    },

    // Demo
    demoState: {
      control: 'select',
      options: [undefined, 'hover', 'focus', 'open', 'active'],
      description: 'Демо-состояние для Storybook',
      table: { category: 'Storybook' },
    },
  },
};

export default meta;
type Story = StoryObj<MultiselectComponent>;

// Тестовые данные
const shortOptions = [
  { label: 'Москва', value: 'msk' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Новосибирск', value: 'nsk' },
  { label: 'Екатеринбург', value: 'ekb' },
  { label: 'Казань', value: 'kzn' },
];

const longOptions = [
  { label: 'Информатика и информационно-коммуникационные технологии (ИКТ)', value: 1 },
  { label: 'Математика (профильный уровень)', value: 2 },
  { label: 'Обществознание', value: 3 },
  { label: 'Русский язык', value: 4 },
  { label: 'История Российской Федерации', value: 5 },
  { label: 'Физика', value: 6 },
  { label: 'Химия', value: 7 },
  { label: 'Биология', value: 8 },
];

// ==================== БАЗОВЫЕ ВАРИАНТЫ ====================

export const Default: Story = {
  args: {
    options: shortOptions,
    placeholder: 'Выберите города',
    showClear: true,
    selectedItemsLabel: 'Выбрано: {0}',
    appendTo: 'body',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Default Multiselect

Стандартный multiselect с базовыми настройками.

\`\`\`html
<p-multiselect
  [options]="cities"
  [(ngModel)]="selectedCities"
  optionLabel="label"
  placeholder="Выберите города"
  [showClear]="true"
  selectedItemsLabel="Выбрано: {0}"
  appendTo="body"
>
</p-multiselect>
\`\`\`

**Особенности:**
- Overlay открывается в body
- Иконка очистки при выборе элементов
- Dropdown анимация поворота на 180°
- Кастомный scrollbar
- Автоматический перенос длинного текста
        `,
      },
    },
  },
};

export const WithLongText: Story = {
  args: {
    options: longOptions,
    placeholder: 'Выберите предметы',
    showClear: true,
    appendTo: 'body',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Длинные названия

Демонстрация автоматического переноса длинного текста в опциях.

\`\`\`html
<p-multiselect
  [options]="subjects"
  [(ngModel)]="selectedSubjects"
  placeholder="Выберите предметы"
  [showClear]="true"
  appendTo="body"
>
</p-multiselect>
\`\`\`

**Особенности:**
- \`white-space: normal\` для всех опций
- \`word-break: break-word\` для корректного переноса
- Опции выравниваются по верху (\`align-items: flex-start\`)
        `,
      },
    },
  },
};

export const WithFilter: Story = {
  args: {
    options: longOptions,
    placeholder: 'Выберите предметы',
    filter: true,
    showClear: true,
    appendTo: 'body',
  },
  parameters: {
    docs: {
      description: {
        story: `
### С фильтрацией

Multiselect с поиском по опциям.

\`\`\`html
<p-multiselect
  [options]="subjects"
  [(ngModel)]="selectedSubjects"
  [filter]="true"
  appendTo="body"
>
  <ng-template pTemplate="filtericon">
    <span class="icon-search"></span>
  </ng-template>
</p-multiselect>
\`\`\`

**Используемые элементы:**
- \`.icon-search\` — кастомная иконка поиска
- Кастомный scrollbar при большом количестве опций
        `,
      },
    },
  },
};

export const ChipDisplay: Story = {
  args: {
    options: shortOptions,
    placeholder: 'Выберите города',
    display: 'chip',
    maxSelectedLabels: 3,
    showClear: true,
    appendTo: 'body',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Chip Display

Отображение выбранных элементов в виде чипов.

\`\`\`html
<p-multiselect
  [options]="cities"
  [(ngModel)]="selectedCities"
  display="chip"
  [maxSelectedLabels]="3"
  [showClear]="true"
  appendTo="body"
>
</p-multiselect>
\`\`\`

**Особенности:**
- После превышения \`maxSelectedLabels\` показывается "+N"
- Компактное отображение для множественного выбора
        `,
      },
    },
  },
};

export const CustomButton: Story = {
  args: {
    options: shortOptions,
    placeholder: 'Выберите элементы',
    filter: true,
    appendTo: 'body',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Кастомная кнопка

Вместо отображения выбранных элементов показывается кастомная кнопка с иконкой.

\`\`\`html
<p-multiselect
  [options]="columns"
  [(ngModel)]="selectedColumns"
  placeholder="Выберите столбцы"
  [filter]="true"
  appendTo="body"
>
  <ng-template pTemplate="filtericon">
    <span class="icon-search"></span>
  </ng-template>
  <ng-template let-value pTemplate="selectedItems">
    <span class="custom-button">
      <i class="icon-settings"></i>
      <span>Выбор столбцов</span>
    </span>
  </ng-template>
</p-multiselect>
\`\`\`

**Используемые классы:**
- \`.custom-button\` — стилизация кнопки (display: flex, gap: 0.5rem)
- \`.icon-settings\` — иконка настроек (1.5rem)

**Особенности:**
- Интерактивные состояния: hover, active, focus
- Используется для выбора столбцов таблицы, настроек и т.п.
        `,
      },
    },
  },
};

// ==================== APPEND TO DEMO ====================

export const AppendToComparison: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 2rem;">
        <!-- Контейнер (низкий) -->
        <div style="flex: 1;">
          <h3>appendTo: null (контейнер)</h3>
          <div style="height: 100px; overflow: auto; border: 1px solid #ccc; padding: 1rem;">
            <app-multiselect
              [options]="options"
              [placeholder]="placeholder"
              [appendTo]="null"
            ></app-multiselect>
          </div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
            Overlay обрезается границами контейнера
          </p>
        </div>

        <!-- Body (высокий контейнер) -->
        <div style="flex: 1;">
          <h3>appendTo: body</h3>
          <div style="height: 100px; overflow: auto; border: 1px solid #ccc; padding: 1rem;">
            <app-multiselect
              [options]="options"
              [placeholder]="placeholder"
              [appendTo]="'body'"
            ></app-multiselect>
          </div>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
            Overlay выводится в body, не ограничен контейнером
          </p>
        </div>
      </div>
    `,
  }),
  args: {
    options: longOptions,
    placeholder: 'Выберите предметы',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Сравнение appendTo

Демонстрация разницы между выводом overlay в контейнер (\`appendTo: null\`) и в body (\`appendTo: "body"\`).

**appendTo: null**
- Overlay ограничен границами родительского контейнера
- Может обрезаться при overflow
- Используется по умолчанию

**appendTo: "body"**
- Overlay выводится в конец \`<body>\`
- Не ограничен контейнером
- Рекомендуется для модальных окон, sticky элементов

\`\`\`html
<!-- В контейнер -->
<p-multiselect
  [options]="options"
  [(ngModel)]="selected"
  [appendTo]="null"
>
</p-multiselect>

<!-- В body -->
<p-multiselect
  [options]="options"
  [(ngModel)]="selected"
  appendTo="body"
>
</p-multiselect>
\`\`\`
        `,
      },
    },
  },
};

// ==================== ALL STATES ====================

export const AllStates: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3>Default (Empty)</h3>
          <app-multiselect
            [options]="options"
            [placeholder]="placeholder"
            [appendTo]="'body'"
          ></app-multiselect>
        </div>

        <div>
          <h3>Hover (demo)</h3>
          <app-multiselect
            [options]="options"
            [placeholder]="placeholder"
            [appendTo]="'body'"
            demoState="hover"
          ></app-multiselect>
        </div>

        <div>
          <h3>Focus (demo)</h3>
          <app-multiselect
            [options]="options"
            [placeholder]="placeholder"
            [appendTo]="'body'"
            demoState="focus"
          ></app-multiselect>
        </div>

        <div>
          <h3>Open (demo)</h3>
          <app-multiselect
            [options]="options"
            [placeholder]="placeholder"
            [appendTo]="'body'"
            demoState="open"
          ></app-multiselect>
        </div>

        <div>
          <h3>Disabled</h3>
          <app-multiselect
            [options]="options"
            [placeholder]="placeholder"
            [appendTo]="'body'"
            [disabled]="true"
          ></app-multiselect>
        </div>

        <div>
          <h3>With Value (comma)</h3>
          <app-multiselect
            [options]="options"
            [value]="['msk', 'spb', 'nsk']"
            [appendTo]="'body'"
            [showClear]="true"
          ></app-multiselect>
        </div>

        <div>
          <h3>With Value (chip)</h3>
          <app-multiselect
            [options]="options"
            [value]="['msk', 'spb', 'nsk', 'ekb']"
            [appendTo]="'body'"
            [showClear]="true"
            display="chip"
            [maxSelectedLabels]="3"
          ></app-multiselect>
        </div>

      </div>
    `,
  }),
  args: {
    options: shortOptions,
    placeholder: 'Выберите города',
  },
  parameters: {
    docs: {
      description: {
        story: 'Все возможные состояния компонента Multiselect.',
      },
    },
  },
};

// ==================== PLAYGROUND ====================

export const Playground: Story = {
  args: {
    options: shortOptions,
    optionLabel: 'label',
    optionValue: 'value',
    placeholder: 'Выберите опции',
    disabled: false,
    showClear: true,
    filter: false,
    display: 'comma',
    maxSelectedLabels: 3,
    selectedItemsLabel: 'Выбрано: {0}',
    showToggleAll: true,
    appendTo: 'body',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Playground

Интерактивная песочница для экспериментов с Multiselect.

**Основные комбинации:**

1. **Стандартная форма:**
   - appendTo: body
   - showClear: true
   - filter: true (для длинных списков)

2. **Chip display:**
   - display: chip
   - maxSelectedLabels: 3
   - showClear: true

3. **С ограничением выбора:**
   - selectionLimit: 5
   - showToggleAll: false
        `,
      },
    },
  },
};
