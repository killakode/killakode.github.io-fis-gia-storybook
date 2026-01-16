import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SelectComponent,
  SelectOption,
} from '../app/components/select/select.component';

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
      description: 'Режим работы компонента',
    },
    options: {
      control: { type: 'object' },
      description: 'Массив опций для выбора',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Текст placeholder',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключенное состояние',
    },
    showClear: {
      control: { type: 'boolean' },
      description: 'Показывать кнопку очистки',
    },
    appendTo: {
      control: { type: 'select' },
      options: ['body', null],
      description: 'Куда монтировать overlay',
    },
    useFloatLabel: {
      control: { type: 'boolean' },
      description: 'Использовать float label',
    },
    floatLabelText: {
      control: { type: 'text' },
      description: 'Текст для float label',
      if: { arg: 'useFloatLabel', truthy: true },
    },
    maxSelectedLabels: {
      control: { type: 'number' },
      description: 'Максимум отображаемых меток',
      if: { arg: 'mode', eq: 'multiselect' },
    },
    selectionLimit: {
      control: { type: 'number' },
      description: 'Лимит выбора элементов',
      if: { arg: 'mode', eq: 'multiselect' },
    },
    selectedItemsLabel: {
      control: { type: 'text' },
      description: 'Шаблон текста для выбранных элементов',
      if: { arg: 'mode', eq: 'multiselect' },
    },
    showHeader: {
      control: { type: 'boolean' },
      description: 'Показывать header (фильтр + "Выбрать все")',
      if: { arg: 'mode', eq: 'multiselect' },
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

// ==================== ТЕСТОВЫЕ ДАННЫЕ ====================

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
      'Очень очень очень очень очень очень очень очень очень очень очень длинное название города которое не помещается в одну строку',
    value: 'long1',
  },
  {
    label:
      'Другой город с чрезвычайно длинным и подробным названием включающим в себя много дополнительной информации',
    value: 'long2',
  },
  {
    label: 'Короткое',
    value: 'short',
  },
];

const optionsWithDisabled: SelectOption[] = [
  { label: 'Активная опция 1', value: 1 },
  { label: 'Активная опция 2', value: 2 },
  { label: 'Отключенная опция', value: 3, disabled: true },
  { label: 'Активная опция 3', value: 4 },
  { label: 'Отключенная опция 2', value: 5, disabled: true },
];

// ==================== БАЗОВЫЕ ДЕМО-ИСТОРИИ ====================

export const Select: Story = {
  name: 'Select (p-select)',
  args: {
    mode: 'select',
    options: cities,
    placeholder: 'Выберите город',
    showClear: true,
  },
};

export const Dropdown: Story = {
  name: 'Dropdown (p-dropdown)',
  args: {
    mode: 'dropdown',
    options: cities,
    placeholder: 'Выберите город',
    showClear: true,
  },
};

export const Multiselect: Story = {
  name: 'Multiselect (p-multiselect)',
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

// ==================== ВСЕ СОСТОЯНИЯ ПО ГРУППАМ ====================

export const SelectAllStates: Story = {
  name: '📋 Select (p-select) - Все состояния',
  render: () => ({
    props: {
      cities,
      optionsWithDisabled,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">

        <div>
          <h3>1. Select с фильтрацией (по умолчанию)</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder="Выберите город"
            [showClear]="true"
          ></app-select>
        </div>

        <div>
          <h3>2. Select отключенный</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder="Выберите город"
            [disabled]="true"
            [showClear]="true"
          ></app-select>
        </div>

        <div>
          <h3>3. Select отключенный с выбранным значением</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder="Выберите город"
            [disabled]="true"
            [value]="'msk'"
            [showClear]="true"
          ></app-select>
        </div>

        <div>
          <h3>4. Select с отключенными опциями</h3>
          <app-select
            [mode]="'select'"
            [options]="optionsWithDisabled"
            placeholder="Выберите опцию"
            [showClear]="true"
          ></app-select>
        </div>

        <div>
          <h3>5. Select с floatLabel</h3>
          <app-select
            [mode]="'select'"
            [options]="cities"
            placeholder=" "
            [useFloatLabel]="true"
            floatLabelText="Выберите город"
            [showClear]="true"
          ></app-select>
        </div>

      </div>
    `,
  }),
};

export const DropdownAllStates: Story = {
  name: '📋 Dropdown (p-dropdown) - Все состояния',
  render: () => ({
    props: {
      cities,
      optionsWithDisabled,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">

        <div>
          <h3>1. Dropdown с фильтрацией (по умолчанию)</h3>
          <app-select
            [mode]="'dropdown'"
            [options]="cities"
            placeholder="Выберите город"
            [showClear]="true"
          ></app-select>
        </div>

        <div>
          <h3>2. Dropdown отключенный</h3>
          <app-select
            [mode]="'dropdown'"
            [options]="cities"
            placeholder="Выберите город"
            [disabled]="true"
            [showClear]="true"
          ></app-select>
        </div>

        <div>
          <h3>3. Dropdown с отключенными опциями</h3>
          <app-select
            [mode]="'dropdown'"
            [options]="optionsWithDisabled"
            placeholder="Выберите опцию"
            [showClear]="true"
          ></app-select>
        </div>

        <div>
          <h3>4. Dropdown с floatLabel</h3>
          <app-select
            [mode]="'dropdown'"
            [options]="cities"
            placeholder=" "
            [useFloatLabel]="true"
            floatLabelText="Выберите город"
            [showClear]="true"
          ></app-select>
        </div>

      </div>
    `,
  }),
};

export const MultiselectAllStates: Story = {
  name: '📋 Multiselect (p-multiselect) - Все состояния',
  render: () => ({
    props: {
      cities,
      optionsWithDisabled,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">

        <div>
          <h3>1. Multiselect с header (фильтр + выбор всех)</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите города"
            [showClear]="true"
            [showHeader]="true"
            [maxSelectedLabels]="3"
            selectedItemsLabel="Выбрано: {0}"
            [value]="['msk', 'spb']"
          ></app-select>
        </div>

        <div>
          <h3>2. Multiselect без header</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите города"
            [showClear]="true"
            [showHeader]="false"
            [maxSelectedLabels]="3"
            selectedItemsLabel="Выбрано: {0}"
          ></app-select>
        </div>

        <div>
          <h3>3. Multiselect с лимитом выбора (максимум 2)</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите города (макс. 2)"
            [showClear]="true"
            [showHeader]="false"
            [selectionLimit]="2"
            [maxSelectedLabels]="3"
            selectedItemsLabel="Выбрано: {0}"
            [value]="['msk', 'spb']"
          ></app-select>
        </div>

        <div>
          <h3>4. Multiselect отключенный</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder="Выберите города"
            [disabled]="true"
            [showHeader]="false"
            [maxSelectedLabels]="3"
            selectedItemsLabel="Выбрано: {0}"
            [value]="['msk', 'spb']"
          ></app-select>
        </div>

        <div>
          <h3>5. Multiselect с отключенными опциями</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="optionsWithDisabled"
            placeholder="Выберите опции"
            [showClear]="true"
            [showHeader]="false"
            [maxSelectedLabels]="3"
            selectedItemsLabel="Выбрано: {0}"
          ></app-select>
        </div>

        <div>
          <h3>6. Multiselect с floatLabel</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="cities"
            placeholder=" "
            [useFloatLabel]="true"
            floatLabelText="Выберите города"
            [showClear]="true"
            [showHeader]="false"
            [maxSelectedLabels]="3"
            selectedItemsLabel="Выбрано: {0}"
          ></app-select>
        </div>

      </div>
    `,
  }),
};

// ==================== ОСОБЫЕ СЛУЧАИ ====================

export const WithLongText: Story = {
  name: '🔤 Длинные названия опций',
  render: () => ({
    props: { longTextOptions },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">

        <div>
          <h3>Select с длинными названиями</h3>
          <app-select
            [mode]="'select'"
            [options]="longTextOptions"
            placeholder="Выберите вариант"
            [showClear]="true"
            [value]="'long1'"
          ></app-select>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
            Tooltip появляется при переполнении текста
          </p>
        </div>

        <div>
          <h3>Multiselect с длинными названиями</h3>
          <app-select
            [mode]="'multiselect'"
            [options]="longTextOptions"
            placeholder="Выберите варианты"
            [showClear]="true"
            [showHeader]="false"
            [maxSelectedLabels]="2"
            selectedItemsLabel="Выбрано: {0}"
            [value]="['long1', 'long2']"
          ></app-select>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
            Tooltip появляется при переполнении текста выбранных элементов
          </p>
        </div>

      </div>
    `,
  }),
};

// ==================== ПЕСОЧНИЦА ====================

export const Playground: Story = {
  name: '🛠️ Песочница',
  args: {
    mode: 'select',
    options: cities,
    placeholder: 'Выберите значение',
    disabled: false,
    showClear: false,
    useFloatLabel: false,
    floatLabelText: '',
    appendTo: 'body',
    maxSelectedLabels: 3,
    selectionLimit: undefined,
    selectedItemsLabel: 'Выбрано: {0}',
    showHeader: true,
  },
};
