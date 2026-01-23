import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent, SelectOption } from 'src/app/components/select/select.component';

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, BrowserAnimationsModule],
    }),
  ],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['select', 'dropdown', 'multiselect'],
      description:
        'Режим работы компонента (`select`, `dropdown`, `multiselect`).',
      table: { category: 'Main Props', defaultValue: { summary: 'select' } },
    },
    options: {
      control: { type: 'object' },
      description: 'Массив опций для выбора.',
      table: { category: 'Main Props', defaultValue: { summary: '[]' } },
    },
    value: {
      control: { type: 'object' },
      description: 'Текущее значение (или массив для `multiselect`).',
      table: { category: 'Main Props', defaultValue: { summary: 'null' } },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Текст placeholder.',
      table: {
        category: 'Main Props',
        defaultValue: { summary: '"Выберите..."' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключает взаимодействие.',
      table: { category: 'Main Props', defaultValue: { summary: 'false' } },
    },
    showClear: {
      control: { type: 'boolean' },
      description: 'Показывать кнопку очистки.',
      table: { category: 'UI Settings', defaultValue: { summary: 'false' } },
    },
    appendTo: {
      control: { type: 'select' },
      options: ['body', null],
      description: 'Куда монтировать overlay (`body` или `null`).',
      table: { category: 'UI Settings', defaultValue: { summary: 'null' } },
    },
    useFloatLabel: {
      control: { type: 'boolean' },
      description: 'Использовать float label.',
      table: { category: 'UI Settings', defaultValue: { summary: 'false' } },
    },
    floatLabelText: {
      control: { type: 'text' },
      description: 'Текст для float label.',
      table: { category: 'UI Settings', defaultValue: { summary: '""' } },
      if: { arg: 'useFloatLabel', truthy: true },
    },
    maxSelectedLabels: {
      control: { type: 'number' },
      description: 'Максимум отображаемых меток выбранных элементов.',
      table: { category: 'Multiselect', defaultValue: { summary: '3' } },
      if: { arg: 'mode', eq: 'multiselect' },
    },
    selectionLimit: {
      control: { type: 'number' },
      description: 'Лимит на количество выбранных элементов.',
      table: { category: 'Multiselect', defaultValue: { summary: 'Infinity' } },
      if: { arg: 'mode', eq: 'multiselect' },
    },
    selectedItemsLabel: {
      control: { type: 'text' },
      description:
        'Шаблон текста для выбранных элементов (например, "Выбрано: {0}").',
      table: {
        category: 'Multiselect',
        defaultValue: { summary: '"Выбрано: {0}"' },
      },
      if: { arg: 'mode', eq: 'multiselect' },
    },
    showHeader: {
      control: { type: 'boolean' },
      description: 'Показывать header с фильтром и кнопкой "Выбрать все".',
      table: { category: 'Multiselect', defaultValue: { summary: 'false' } },
      if: { arg: 'mode', eq: 'multiselect' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Select (PrimeNG)

Универсальный компонент выбора с поддержкой **трёх режимов**:
- **p-select** (одиночный выбор),
- **p-dropdown** (одиночный выбор с кастомным шаблоном),
- **p-multiSelect** (множественный выбор).

---

## Особенности

### 1. Поддерживаемые состояния
| Состояние          | Описание                                                                 |
|---------------------|--------------------------------------------------------------------------|
| **Default**         | Базовое состояние.                                                       |
| **Hover**           | Подсветка при наведении.                                                 |
| **Disabled**        | Недоступное состояние.                                                   |
| **Open**            | Открытый dropdown (меняется иконка стрелочки).                          |
| **Float Label**     | Всплывающая метка.                                                      |
| **Invalid**         | Состояние ошибки (красная граница).                                     |
| **With Clear Icon** | Кнопка очистки значения.                                                 |

### 2. Режим p-multiSelect
| Свойство               | Описание                                                                 |
|-------------------------|--------------------------------------------------------------------------|
| **maxSelectedLabels**   | Максимум отображаемых меток (например, 3 из 5 выбранных).               |
| **selectionLimit**      | Лимит на количество выбранных элементов.                               |
| **selectedItemsLabel** | Шаблон текста для выбранных элементов (например, "Выбрано: {0}").     |
| **showHeader**          | Показывать header с фильтром и кнопкой "Выбрать все".                   |


### Кастомные свойства
| Свойство          | Описание                          | Значение по умолчанию |
|--------------------|-----------------------------------|-----------------------|
| dropdownIcon       | Иконка для dropdown (например, 'icon-arrow'). | 'icon-arrow'          |
| panelStyleClass    | Кастомный класс для панели dropdown.         | ''                    |

### 3. Примеры использования

#### p-select (одиночный выбор)
\`\`\`html
<p-select
  [options]="cities"
  [(ngModel)]="selectedCity"
  placeholder="Выберите город"
  [showClear]="true"
/>
\`\`\`

#### p-dropdown (кастомный dropdown)
\`\`\`html
<p-dropdown
  [options]="users"
  [(ngModel)]="selectedUser"
  placeholder="Выберите пользователя"
  optionLabel="fullName"
  optionValue="id"
/>
\`\`\`

#### p-multiSelect (множественный выбор)
\`\`\`html
<p-multiSelect
  [options]="tags"
  [(ngModel)]="selectedTags"
  placeholder="Выберите теги"
  [showHeader]="true"
  [maxSelectedLabels]="3"
  selectedItemsLabel="Выбрано: {0}"
  [selectionLimit]="5"
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

// ===== ТЕСТОВЫЕ ДАННЫЕ =====
const cities: SelectOption[] = [
  { label: 'Москва', value: 'msk' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Новосибирск', value: 'nsk' },
  { label: 'Екатеринбург', value: 'ekb' },
  { label: 'Казань', value: 'kzn' },
];

const longTextOptions: SelectOption[] = [
  {
    label:
      'Очень длинное название опции, которое не помещается в одну строку и требует обрезки с tooltip',
    value: 'long1',
  },
  { label: 'Короткая опция', value: 'short' },
];

const optionsWithDisabled: SelectOption[] = [
  { label: 'Активная опция 1', value: 1 },
  { label: 'Активная опция 2', value: 2 },
  { label: 'Отключенная опция', value: 3, disabled: true },
];

// ===== БАЗОВЫЕ ИСТОРИИ =====
export const Select: Story = {
  name: 'p-select',
  args: {
    mode: 'select',
    options: cities,
    placeholder: 'Выберите город',
    showClear: true,
  },
};

export const Dropdown: Story = {
  name: 'p-dropdown',
  args: {
    mode: 'dropdown',
    options: cities,
    placeholder: 'Выберите город',
    showClear: true,
  },
};

export const MultiSelect: Story = {
  name: 'p-multiSelect',
  args: {
    mode: 'multiselect',
    options: cities,
    placeholder: 'Выберите города',
    showClear: true,
    showHeader: true,
    maxSelectedLabels: 3,
    selectedItemsLabel: 'Выбрано: {0}',
  },
};

// ===== ВСЕ СОСТОЯНИЯ =====
export const SelectAllStates: Story = {
  name: '📋 p-select - Все состояния',
  render: () => ({
    props: { cities, optionsWithDisabled },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem;">
        <div>
          <h3>1. Default</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder="Выберите город"
          />
        </div>
        <div>
          <h3>2. Disabled</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder="Выберите город"
            [disabled]="true"
          />
        </div>
        <div>
          <h3>3. With Clear Icon</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder="Выберите город"
            [showClear]="true"
          />
        </div>
        <div>
          <h3>4. Float Label</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder="Выберите город"
            [useFloatLabel]="true"
            floatLabelText="Город"
          />
        </div>
        <div>
          <h3>5. Invalid State</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder="Выберите город"
            class="ng-invalid ng-dirty"
          />
        </div>
        <div>
          <h3>6. With Disabled Options</h3>
          <app-select
            [mode]="'select'"
            [options]="optionsWithDisabled"
            placeholder="Выберите опцию"
          />
        </div>
      </div>
    `,
  }),
};

export const MultiSelectAllStates: Story = {
  name: '📋 p-multiSelect - Все состояния',
  render: () => ({
    props: { cities, optionsWithDisabled },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem;">
        <div>
          <h3>1. Default (с header)</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите города"
            [showHeader]="true"
            [maxSelectedLabels]="3"
            selectedItemsLabel="Выбрано: {0}"
          />
        </div>
        <div>
          <h3>2. Without Header</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите города"
            [showHeader]="false"
          />
        </div>
        <div>
          <h3>3. With Selection Limit (max 2)</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите города (макс. 2)"
            [selectionLimit]="2"
            [maxSelectedLabels]="3"
            selectedItemsLabel="Выбрано: {0}"
          />
        </div>
        <div>
          <h3>4. Disabled</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите города"
            [disabled]="true"
          />
        </div>
        <div>
          <h3>5. With Disabled Options</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="optionsWithDisabled"
            placeholder="Выберите опции"
          />
        </div>
        <div>
          <h3>6. Float Label</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите город"
            [useFloatLabel]="true"
            floatLabelText="Города"
          />
        </div>
      </div>
    `,
  }),
};

// ===== ОСОБЫЕ СЛУЧАИ =====
export const WithLongText: Story = {
  name: '🔤 Длинные названия опций',
  render: () => ({
    props: { longTextOptions },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem;">
        <div>
          <h3>p-select с длинными названиями</h3>
          <app-select
            [mode]="'select'"
            [options]="longTextOptions"
            placeholder="Выберите вариант"
            [value]="'long1'"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
            Tooltip появляется автоматически при переполнении текста.
          </p>
        </div>
        <div>
          <h3>p-multiSelect с длинными названиями</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="longTextOptions"
            placeholder="Выберите варианты"
            [showHeader]="false"
            [maxSelectedLabels]="2"
            selectedItemsLabel="Выбрано: {0}"
            [value]="['long1']"
          />
        </div>
      </div>
    `,
  }),
};

// ===== ПЕСОЧНИЦА =====
export const Playground: Story = {
  name: '🛠️ Песочница',
  args: {
    mode: 'select',
    options: cities,
    placeholder: 'Выберите значение',
    disabled: false,
    showClear: false,
    useFloatLabel: false,
    floatLabelText: 'Метка',
    appendTo: null,
    showHeader: false,
    maxSelectedLabels: 3,
    selectedItemsLabel: 'Выбрано: {0}',
  },
};
