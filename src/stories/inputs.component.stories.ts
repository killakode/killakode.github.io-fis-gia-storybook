import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TextInputComponent } from '../app/components/input/input.component';

const meta: Meta<TextInputComponent> = {
  title: 'Components/Text Input (All Variants)',
  component: TextInputComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],

  argTypes: {
    variant: {
      control: 'select',
      options: [
        'input',
        'inputnumber',
        'gar-address',
        'phone-multi',
        'textarea',
        'datepicker',
      ],
      description: `
**Вариант отображения поля согласно документации проекта:**

1. \`input\` — Обычное текстовое поле
2. \`inputnumber\` — Для чисел (p-inputnumber)
3. \`gar-address\` — Адрес (p-autoComplete с mock данными)
4. \`phone-multi\` — Телефоны (p-inputMask в чипах)
5. \`textarea\` — Текстовый блок (p-textarea)
6. \`datepicker\` — Дата / Дейтпикер (p-date-picker)
      `,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'input' },
      },
    },

    label: {
      control: 'text',
      description: 'Текст label над полем (FloatLabel)',
      table: { category: 'Content' },
    },

    required: {
      control: 'boolean',
      description: 'Обязательное поле (добавляет красную звёздочку)',
      table: {
        category: 'Content',
        defaultValue: { summary: 'false' },
      },
    },

    placeholder: {
      control: 'text',
      description: 'Placeholder текст внутри поля',
      table: { category: 'Content' },
    },

    invalid: {
      control: 'boolean',
      description: 'Состояние ошибки валидации (красная обводка + сообщение)',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },

    errorMessage: {
      control: 'text',
      description: 'Текст сообщения об ошибке (если пусто - дефолтный)',
      table: { category: 'Content' },
    },

    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения (минималистичный стиль)',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },

    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },

    showTooltip: {
      control: 'boolean',
      description: 'Показывать тултип при overflow текста',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },

    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number'],
      description: 'Тип HTML input элемента (только для variant="input")',
      table: {
        category: 'Input Params',
        defaultValue: { summary: 'text' },
      },
    },

    showIcon: {
      control: 'boolean',
      description: 'Показать иконку поиска слева (только для variant="input")',
      table: {
        category: 'Input Params',
        defaultValue: { summary: 'false' },
      },
    },

    useGrouping: {
      control: 'boolean',
      description: 'Группировка тысяч (1 000 вместо 1000)',
      table: {
        category: 'InputNumber Params',
        defaultValue: { summary: 'true' },
      },
    },

    min: {
      control: 'number',
      description: 'Минимальное значение',
      table: { category: 'InputNumber Params' },
    },

    max: {
      control: 'number',
      description: 'Максимальное значение',
      table: { category: 'InputNumber Params' },
    },

    step: {
      control: 'number',
      description: 'Шаг изменения значения',
      table: {
        category: 'InputNumber Params',
        defaultValue: { summary: '1' },
      },
    },

    rows: {
      control: 'number',
      description: 'Количество строк для textarea',
      table: {
        category: 'Textarea Params',
        defaultValue: { summary: '2' },
      },
    },

    maxlength: {
      control: 'number',
      description: 'Максимальная длина текста',
      table: {
        category: 'Textarea Params',
        defaultValue: { summary: '255' },
      },
    },

    autoResize: {
      control: 'boolean',
      description: 'Автоувеличение размера textarea',
      table: {
        category: 'Textarea Params',
        defaultValue: { summary: 'true' },
      },
    },

    showCharCount: {
      control: 'boolean',
      description:
        'Показывать счетчик символов и кнопку "Очистить" (только для textarea)',
      table: {
        category: 'Textarea Params',
        defaultValue: { summary: 'false' },
      },
    },

    maxDate: {
      control: 'date',
      description: 'Максимально возможная дата',
      table: { category: 'DatePicker Params' },
    },

    minDate: {
      control: 'date',
      description: 'Минимально возможная дата',
      table: { category: 'DatePicker Params' },
    },

    readonlyInput: {
      control: 'boolean',
      description: 'Можно ли редактировать дату вручную',
      table: {
        category: 'DatePicker Params',
        defaultValue: { summary: 'false' },
      },
    },

    showOnFocus: {
      control: 'boolean',
      description: 'Показывать календарь при фокусе',
      table: {
        category: 'DatePicker Params',
        defaultValue: { summary: 'true' },
      },
    },

    showCalendarIcon: {
      control: 'boolean',
      description: 'Показывать иконку календаря',
      table: {
        category: 'DatePicker Params',
        defaultValue: { summary: 'true' },
      },
    },

    maxPhones: {
      control: 'number',
      description: 'Максимальное количество телефонов',
      table: {
        category: 'PhoneMulti Params',
        defaultValue: { summary: '3' },
      },
    },

    phoneMask: {
      control: 'text',
      description: 'Маска для телефона',
      table: {
        category: 'PhoneMulti Params',
        defaultValue: { summary: '+7(999)999-99-99' },
      },
    },

    phonePlaceholder: {
      control: 'text',
      description: 'Placeholder для телефона',
      table: {
        category: 'PhoneMulti Params',
        defaultValue: { summary: '+7(___)___-__-__' },
      },
    },

    showCard: {
      control: 'boolean',
      description: 'Обёртка в p-card',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },

    customClass: {
      control: 'text',
      description: 'Дополнительный CSS класс',
      table: { category: 'Layout' },
    },
  },

  parameters: {
    docs: {
      description: {
        component: `
# Text Input Component (All Variants)

Универсальный компонент текстовых полей, объединяющий **6 вариантов** из проекта OISU-GIA.

## 📋 Варианты:

### 1️⃣ **input** — Обычное текстовое поле
- Компонент: \`<input pInputText>\`
- Поддержка иконок (поиск)
- Тултипы при overflow

### 2️⃣ **inputnumber** — Для чисел
- Компонент: \`<p-inputNumber>\`
- Группировка тысяч
- Min/Max значения

### 3️⃣ **gar-address** — Адрес
- Компонент: \`<p-autoComplete>\`
- Mock данные (30 адресов)
- Поиск по введенному тексту
- Панель открывается в body
- Scrollable список

### 4️⃣ **phone-multi** — Телефоны
- Компонент: \`<p-inputGroup>\` + \`<p-chip>\` + \`<p-inputMask>\`
- Маска телефона
- Добавление/удаление номеров
- Максимум 3 телефона

### 5️⃣ **textarea** — Текстовый блок
- Компонент: \`<textarea pTextarea>\`
- Автоувеличение высоты
- Ограничение длины
- Панель с кнопкой "Очистить" и счетчиком символов

### 6️⃣ **datepicker** — Дата
- Компонент: \`<p-date-picker>\`
- Min/Max даты
- Иконка календаря

## ✨ Общие возможности:

- ✅ **FloatLabel** — label перемещается вверх при фокусе
- ✅ **Валидация** — красная обводка + сообщение об ошибке
- ✅ **Required asterisk** — красная звёздочка
- ✅ **Тултипы** — автоматическое отображение при overflow
- ✅ **Состояния** — disabled, readonly, invalid
- ✅ **ControlValueAccessor** — интеграция с Angular Forms
- ✅ **p-card обёртка** — автоматически при ошибках

## 📝 Примеры использования:

\`\`\`html
<app-text-input
  variant="input"
  label="Наименование"
  [required]="true"
/>

<app-text-input
  variant="inputnumber"
  label="Номер аудитории"
  [useGrouping]="false"
/>

<app-text-input
  variant="gar-address"
  label="Адрес"
  [required]="true"
/>

<app-text-input
  variant="phone-multi"
  label="Телефоны"
  [maxPhones]="3"
/>

<app-text-input
  variant="textarea"
  label="Комментарий"
  [rows]="3"
  [showCharCount]="true"
/>

<app-text-input
  variant="datepicker"
  label="Дата рождения"
  [maxDate]="maxDate"
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TextInputComponent>;

export const Playground: Story = {
  args: {
    variant: 'input',
    label: 'Наименование',
    placeholder: 'Введите текст',
    type: 'text',
    required: false,
    disabled: false,
    readonly: false,
    invalid: false,
    errorMessage: '',
    showIcon: false,
    showTooltip: true,
    useGrouping: true,
    rows: 2,
    maxlength: 255,
    autoResize: true,
    showCharCount: false,
    readonlyInput: false,
    showOnFocus: true,
    showCalendarIcon: true,
    showCard: true,
    maxPhones: 3,
  },
};

export const Variant1_Input: Story = {
  args: {
    variant: 'input',
    label: 'Наименование',
    placeholder: 'Введите наименование',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
# 📝 Вариант 1: Обычное текстовое поле (input)

## Компонент:
\`<input pInputText>\`

## Особенности:
- Поддержка различных типов: text, email, password, tel, number
- Опциональная иконка поиска слева
- Тултип при overflow текста
- FloatLabel анимация

## Использование:
\`\`\`html
<app-text-input
  variant="input"
  label="Наименование"
  placeholder="Введите наименование"
  [required]="true"
/>
\`\`\`
        `,
      },
    },
  },
};

export const Variant2_InputNumber: Story = {
  args: {
    variant: 'inputnumber',
    label: 'Номер аудитории',
    placeholder: '101',
    required: true,
    useGrouping: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
# 🔢 Вариант 2: Поле для чисел (inputnumber)

## Компонент:
\`<p-inputNumber>\`

## Особенности:
- Группировка тысяч (опционально)
- Min/Max ограничения
- Шаг изменения значения
- Валидация числового формата

## Использование:
\`\`\`html
<app-text-input
  variant="inputnumber"
  label="Номер аудитории"
  [useGrouping]="false"
  [min]="1"
  [max]="999"
/>
\`\`\`
        `,
      },
    },
  },
};

export const Variant3_GarAddress: Story = {
  args: {
    variant: 'gar-address',
    label: 'Фактический адрес',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
# 🏠 Вариант 3: Адрес (gar-address)

## Компонент:
\`<p-autoComplete>\` с mock данными (30 адресов городов России)

## Особенности:
- \`appendTo="body"\` — панель открывается в body
- \`forceSelection="true"\` — можно выбрать только из списка
- Поиск по введенному тексту
- Scrollable список
- Loading состояние с spinner
- Empty message при отсутствии результатов

## Mock данные:
30 адресов различных городов России (Москва, Санкт-Петербург, Казань, Екатеринбург и др.)

## Использование:
\`\`\`html
<app-text-input
  variant="gar-address"
  label="Фактический адрес"
  [required]="true"
/>
\`\`\`
        `,
      },
    },
  },
};

export const Variant4_PhoneMulti: Story = {
  args: {
    variant: 'phone-multi',
    label: 'Телефон',
    required: true,
    maxPhones: 3,
  },
  parameters: {
    docs: {
      description: {
        story: `
# 📞 Вариант 4: Телефоны (phone-multi)

## Компонент:
\`<p-inputGroup>\` + \`<p-chip>\` + \`<p-inputMask>\`

## Особенности:
- Маска телефона: \`+7(999)999-99-99\`
- Добавление номеров кнопкой "+"
- Удаление номеров через иконку в чипе
- Минимум 1 телефон (нельзя удалить последний)
- Максимум 3 телефона (по умолчанию)
- Валидация формата номера

## Использование:
\`\`\`html
<app-text-input
  variant="phone-multi"
  label="Телефон"
  [required]="true"
  [maxPhones]="3"
  phoneMask="+7(999)999-99-99"
  phonePlaceholder="+7(___)___-__-__"
/>
\`\`\`
        `,
      },
    },
  },
};

export const Variant5_Textarea: Story = {
  args: {
    variant: 'textarea',
    label: 'Написать комментарий',
    placeholder: 'Введите комментарий...',
    rows: 3,
    maxlength: 255,
    autoResize: true,
    showCharCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
# 📄 Вариант 5: Текстовый блок (textarea)

## Компонент:
\`<textarea pTextarea>\`

## Особенности:
- \`rows="3"\` — начальное количество строк
- \`maxlength="255"\` — ограничение длины текста
- \`autoResize="true"\` — автоувеличение при вводе
- \`showCharCount="true"\` — панель с:
  - Кнопкой "Очистить" (показывается только при наличии текста)
  - Счетчиком символов "250 / 255"

## Панель управления:
\`\`\`html
<div class="textarea-panel text-end">
  <span class="textarea-clear" (click)="onClearTextarea()">Очистить</span>
  <span class="textarea-length">250 / 255</span>
</div>
\`\`\`

## Использование:
\`\`\`html
<app-text-input
  variant="textarea"
  label="Написать комментарий"
  [rows]="3"
  [maxlength]="255"
  [showCharCount]="true"
/>
\`\`\`
        `,
      },
    },
  },
};

export const Variant6_DatePicker: Story = {
  args: {
    variant: 'datepicker',
    label: 'Дата рождения',
    required: true,
    readonlyInput: false,
    showOnFocus: true,
    showCalendarIcon: true,
    maxDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: `
# 📅 Вариант 6: Дата / Дейтпикер (datepicker)

## Компонент:
\`<p-date-picker>\`

## Особенности:
- Min/Max даты для ограничения выбора
- Иконка календаря
- Ручной ввод (опционально)
- Открытие при фокусе
- Панель открывается в body
- Кастомный стиль панели

## Использование:
\`\`\`html
<app-text-input
  variant="datepicker"
  label="Дата рождения"
  [required]="true"
  [maxDate]="maxDate"
  [showCalendarIcon]="true"
/>
\`\`\`
        `,
      },
    },
  },
};

export const AllVariantsComparison: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">

        <div>
          <h2>1️⃣ Обычное текстовое поле (input)</h2>
          <p style="color: #666;">Компонент: <code>&lt;input pInputText&gt;</code></p>
          <app-text-input
            variant="input"
            label="Наименование"
            placeholder="Введите наименование"
            [required]="true"
          />
        </div>

        <div>
          <h2>2️⃣ Поле для чисел (p-inputnumber)</h2>
          <p style="color: #666;">Компонент: <code>&lt;p-inputNumber&gt;</code></p>
          <app-text-input
            variant="inputnumber"
            label="Номер аудитории"
            placeholder="101"
            [required]="true"
            [useGrouping]="false"
          />
        </div>

        <div>
          <h2>3️⃣ Адрес (p-autoComplete)</h2>
          <p style="color: #666;">Компонент: <code>&lt;p-autoComplete&gt;</code> с 30 mock адресами</p>
          <app-text-input
            variant="gar-address"
            label="Фактический адрес"
            [required]="true"
          />
        </div>

        <div>
          <h2>4️⃣ Телефоны (p-inputGroup + p-chip)</h2>
          <p style="color: #666;">Компонент: <code>&lt;p-inputGroup&gt;</code> + <code>&lt;p-inputMask&gt;</code></p>
          <app-text-input
            variant="phone-multi"
            label="Телефон"
            [required]="true"
            [maxPhones]="3"
          />
        </div>

        <div>
          <h2>5️⃣ Текстовый блок (textarea)</h2>
          <p style="color: #666;">Компонент: <code>&lt;textarea pTextarea&gt;</code> + панель с "Очистить" и счетчиком</p>
          <app-text-input
            variant="textarea"
            label="Написать комментарий"
            placeholder="Введите комментарий..."
            [rows]="3"
            [maxlength]="255"
            [showCharCount]="true"
          />
        </div>

        <div>
          <h2>6️⃣ Дата / Дейтпикер (p-date-picker)</h2>
          <p style="color: #666;">Компонент: <code>&lt;p-date-picker&gt;</code></p>
          <app-text-input
            variant="datepicker"
            label="Дата рождения"
            [required]="true"
            [maxDate]="maxDate"
          />
        </div>

      </div>
    `,
  }),
  args: {
    maxDate: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Сравнение всех 6 вариантов компонента на одной странице',
      },
    },
  },
};

export const WithErrors: Story = {
  args: {
    variant: 'input',
    label: 'Email',
    type: 'email',
    invalid: true,
    errorMessage: 'Введите корректный email адрес',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Пример поля с ошибкой валидации:
- Красная обводка
- Сообщение об ошибке снизу
- Автоматическая обёртка в p-card
- Красный фон поля
        `,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'input',
    label: 'Заблокированное поле',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле в отключенном состоянии (disabled)',
      },
    },
  },
};

export const Readonly: Story = {
  args: {
    variant: 'input',
    label: 'Только для чтения',
    readonly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле в режиме readonly (минималистичный стиль без рамки)',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'input',
    label: 'Поиск',
    placeholder: 'Введите запрос',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Текстовое поле с иконкой поиска слева',
      },
    },
  },
};

export const TextareaWithClearButton: Story = {
  args: {
    variant: 'textarea',
    label: 'Комментарий',
    placeholder: 'Начните печатать...',
    rows: 4,
    maxlength: 500,
    showCharCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
# Textarea с кнопкой очистки

Демонстрация работы панели управления:
- Кнопка **"Очистить"** появляется только когда есть текст
- Счетчик показывает **оставшиеся символы / максимум**
- В режиме \`readonly\` панель скрыта
- При нажатии "Очистить" поле очищается и вызывается \`onChange\`

## Формула счетчика:
\`\`\`typescript
maxlength - (value?.length ?? 0) + ' / ' + maxlength
// Пример: "450 / 500"
\`\`\`
        `,
      },
    },
  },
};

export const MixedStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem;">

        <div>
          <h3>Default</h3>
          <app-text-input variant="input" label="Email" placeholder="example@mail.com" />
        </div>

        <div>
          <h3>Required</h3>
          <app-text-input variant="input" label="Email" [required]="true" />
        </div>

        <div>
          <h3>Invalid</h3>
          <app-text-input
            variant="input"
            label="Email"
            [invalid]="true"
          />
        </div>

        <div>
          <h3>Disabled</h3>
          <app-text-input
            variant="input"
            label="Email"
            [disabled]="true"
          />
        </div>

        <div>
          <h3>Readonly</h3>
          <app-text-input
            variant="input"
            label="Email"
            [readonly]="true"
          />
        </div>

        <div>
          <h3>Number Field</h3>
          <app-text-input
            variant="inputnumber"
            label="Количество"
            [useGrouping]="false"
          />
        </div>

        <div>
          <h3>Address with Mock Data</h3>
          <app-text-input
            variant="gar-address"
            label="Адрес"
          />
        </div>

        <div>
          <h3>Phone Multi</h3>
          <app-text-input
            variant="phone-multi"
            label="Телефоны"
          />
        </div>

        <div>
          <h3>Textarea with Char Count</h3>
          <app-text-input
            variant="textarea"
            label="Комментарий"
            [rows]="3"
            [showCharCount]="true"
          />
        </div>

        <div>
          <h3>DatePicker</h3>
          <app-text-input
            variant="datepicker"
            label="Дата"
            [maxDate]="maxDate"
          />
        </div>

      </div>
    `,
    props: {
      maxDate: new Date(),
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных состояний и вариантов компонента',
      },
    },
  },
};
