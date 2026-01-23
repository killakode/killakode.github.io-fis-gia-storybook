import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TextInputComponent, TextInputVariant } from 'src/app/components/input/input.component';

/**
 * 📝 TextInputComponent (на основе PrimeNG)
 *
 * Универсальный компонент для работы с текстовыми полями ввода,
 * построенный на базе компонентов PrimeNG с кастомными стилями и логикой.
 *
 * 🔹 **Используемые компоненты PrimeNG:**
 * - `p-inputtext` (для `variant="input"`)
 * - `p-inputnumber` (для `variant="inputnumber"`)
 * - `p-autocomplete` (для `variant="gar-address"`)
 * - `p-inputmask` + `p-chip` (для `variant="phone-multi"`)
 * - `p-textarea` (для `variant="textarea"`)
 * - `p-date-picker` (для `variant="datepicker"`)
 * - `p-floatlabel` (для всех вариантов)
 * - `p-message` (для отображения ошибок)
 */

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
      ] as TextInputVariant[],
      description: 'Вариант отображения поля.',
      table: {
        category: 'Common',
        defaultValue: { summary: 'input' },
      },
    },
    label: {
      control: 'text',
      description: 'Текст label (используется p-floatlabel).',
      table: { category: 'Common' },
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле (добавляет красную звёздочку).',
      table: {
        category: 'Common',
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder текст внутри поля.',
      table: { category: 'Common' },
    },
    invalid: {
      control: 'boolean',
      description: 'Состояние ошибки валидации (красная обводка + сообщение).',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description:
        'Текст сообщения об ошибке (если пусто - используется дефолтный).',
      table: { category: 'Common' },
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения (минималистичный стиль без рамки).',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description:
        'Отключенное состояние (полностью блокирует взаимодействие).',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    showTooltip: {
      control: 'boolean',
      description: 'Показывать тултип при overflow текста (pTooltip).',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    inputId: {
      control: 'text',
      description: 'HTML ID элемента (автогенерация если не указан).',
      table: { category: 'Common' },
    },
    showCard: {
      control: 'boolean',
      description: 'Обёртка в p-card (автоматически включается при ошибках).',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    customClass: {
      control: 'text',
      description: 'Дополнительный CSS класс для корневого элемента.',
      table: { category: 'Layout' },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'search'],
      description: 'Тип HTML input элемента (только для variant="input").',
      table: {
        category: 'Input Params',
        defaultValue: { summary: 'text' },
      },
      if: { arg: 'variant', eq: 'input' },
    },
    showIcon: {
      control: 'boolean',
      description: 'Показать иконку поиска слева (только для variant="input").',
      table: {
        category: 'Input Params',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'variant', eq: 'input' },
    },
    useGrouping: {
      control: 'boolean',
      description: 'Группировка тысяч (1 000 вместо 1000).',
      table: {
        category: 'InputNumber Params',
        defaultValue: { summary: 'true' },
      },
      if: { arg: 'variant', eq: 'inputnumber' },
    },
    min: {
      control: 'number',
      description: 'Минимальное значение.',
      table: { category: 'InputNumber Params' },
      if: { arg: 'variant', eq: 'inputnumber' },
    },
    max: {
      control: 'number',
      description: 'Максимальное значение.',
      table: { category: 'InputNumber Params' },
      if: { arg: 'variant', eq: 'inputnumber' },
    },
    step: {
      control: 'number',
      description: 'Шаг изменения значения.',
      table: {
        category: 'InputNumber Params',
        defaultValue: { summary: '1' },
      },
      if: { arg: 'variant', eq: 'inputnumber' },
    },
    rows: {
      control: 'number',
      description: 'Количество строк для textarea.',
      table: {
        category: 'Textarea Params',
        defaultValue: { summary: '2' },
      },
      if: { arg: 'variant', eq: 'textarea' },
    },
    maxlength: {
      control: 'number',
      description: 'Максимальная длина текста.',
      table: {
        category: 'Textarea Params',
        defaultValue: { summary: '255' },
      },
      if: { arg: 'variant', eq: 'textarea' },
    },
    autoResize: {
      control: 'boolean',
      description: 'Автоувеличение высоты textarea при вводе.',
      table: {
        category: 'Textarea Params',
        defaultValue: { summary: 'true' },
      },
      if: { arg: 'variant', eq: 'textarea' },
    },
    showCharCount: {
      control: 'boolean',
      description:
        'Показывать панель с кнопкой "Очистить" и счетчиком символов.',
      table: {
        category: 'Textarea Params',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'variant', eq: 'textarea' },
    },
    maxDate: {
      control: 'date',
      description: 'Максимально возможная дата.',
      table: { category: 'DatePicker Params' },
      if: { arg: 'variant', eq: 'datepicker' },
    },
    minDate: {
      control: 'date',
      description: 'Минимально возможная дата.',
      table: { category: 'DatePicker Params' },
      if: { arg: 'variant', eq: 'datepicker' },
    },
    readonlyInput: {
      control: 'boolean',
      description: 'Можно ли редактировать дату вручную.',
      table: {
        category: 'DatePicker Params',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'variant', eq: 'datepicker' },
    },
    showOnFocus: {
      control: 'boolean',
      description: 'Показывать календарь при фокусе.',
      table: {
        category: 'DatePicker Params',
        defaultValue: { summary: 'true' },
      },
      if: { arg: 'variant', eq: 'datepicker' },
    },
    showCalendarIcon: {
      control: 'boolean',
      description: 'Показывать иконку календаря.',
      table: {
        category: 'DatePicker Params',
        defaultValue: { summary: 'true' },
      },
      if: { arg: 'variant', eq: 'datepicker' },
    },
    maxPhones: {
      control: 'number',
      description: 'Максимальное количество телефонов.',
      table: {
        category: 'PhoneMulti Params',
        defaultValue: { summary: '3' },
      },
      if: { arg: 'variant', eq: 'phone-multi' },
    },
    phoneMask: {
      control: 'text',
      description: 'Маска для телефона (формат +7(999)999-99-99).',
      table: {
        category: 'PhoneMulti Params',
        defaultValue: { summary: '+7(999)999-99-99' },
      },
      if: { arg: 'variant', eq: 'phone-multi' },
    },
    phonePlaceholder: {
      control: 'text',
      description: 'Placeholder для телефона.',
      table: {
        category: 'PhoneMulti Params',
        defaultValue: { summary: '+7(___)___-__-__' },
      },
      if: { arg: 'variant', eq: 'phone-multi' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Text Input Component (на основе PrimeNG)

Универсальный компонент для работы с текстовыми полями ввода, построенный на базе **PrimeNG** с кастомными стилями и логикой.

## 📌 Варианты компонента

| Вариант         | Компонент PrimeNG          | Особенности |
|-----------------|----------------------------|-------------|
| **input**       | \`<input pInputText>\`      | Поддержка иконок, тултипов, различных типов (text/email/password/tel/number/search) |
| **inputnumber** | \`<p-inputNumber>\`        | Группировка тысяч, ограничения min/max, шаг изменения |
| **gar-address** | \`<p-autoComplete>\`       | Mock данные (30 адресов), поиск, панель открывается в body |
| **phone-multi** | \`<p-inputGroup>\` + \`<p-chip>\` + \`<p-inputMask>\` | Маска телефона, добавление/удаление номеров (макс. 3) |
| **textarea**    | \`<textarea pTextarea>\`    | Автоувеличение высоты, счётчик символов, кнопка "Очистить" |
| **datepicker**  | \`<p-date-picker>\`        | Min/Max даты, кастомная иконка календаря, ручной ввод |

## ✨ Общие возможности

- **FloatLabel**: Анимация label при фокусе (p-floatlabel)
- **Валидация**: Красная обводка + сообщение об ошибке (p-message)
- **Состояния**: Поддержка всех состояний (default, hover, focus, disabled, readonly, invalid)
- **ControlValueAccessor**: Полная интеграция с Angular Forms (ngModel и ReactiveForms)
- **Тултипы**: Автоматическое отображение при overflow текста (pTooltip)
- **Локализация**: Русский язык для календаря
- **Автообертка**: В p-card при ошибках валидации
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TextInputComponent>;

// =============================================
// БАЗОВЫЙ ПРИМЕР (Песочница)
// =============================================
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
    showCard: true,
    customClass: '',
  },
};

// =============================================
// ДЕМОНСТРАЦИЯ ВСЕХ ВАРИАНТОВ
// =============================================
export const AllVariantsComparison: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentDate: new Date(),
      minDate: new Date(1900, 0, 1),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; padding: 1rem;">
        <!-- Input -->
        <div>
          <h3>1️⃣ Текстовое поле (input)</h3>
          <p style="color: #666; font-size: 0.875rem;">Компонент: <code>p-inputtext</code></p>
          <app-text-input
            variant="input"
            label="Email"
            placeholder="example@mail.com"
            [required]="true"
            [showIcon]="true">
          </app-text-input>
        </div>

        <!-- InputNumber -->
        <div>
          <h3>2️⃣ Числовое поле (inputnumber)</h3>
          <p style="color: #666; font-size: 0.875rem;">Компонент: <code>p-inputnumber</code></p>
          <app-text-input
            variant="inputnumber"
            label="Количество"
            [min]="0"
            [max]="100"
            [useGrouping]="false">
          </app-text-input>
        </div>

        <!-- GAR Address -->
        <div>
          <h3>3️⃣ Адрес (gar-address)</h3>
          <p style="color: #666; font-size: 0.875rem;">Компонент: <code>p-autocomplete</code> с 30 mock адресами</p>
          <app-text-input
            variant="gar-address"
            label="Адрес"
            [required]="true">
          </app-text-input>
        </div>

        <!-- Phone Multi -->
        <div>
          <h3>4️⃣ Телефоны (phone-multi)</h3>
          <p style="color: #666; font-size: 0.875rem;">Компонент: <code>p-inputmask + p-chip</code></p>
          <app-text-input
            variant="phone-multi"
            label="Телефоны"
            [maxPhones]="3"
            [value]="['+7(912)345-67-89']">
          </app-text-input>
        </div>

        <!-- Textarea -->
        <div>
          <h3>5️⃣ Текстовый блок (textarea)</h3>
          <p style="color: #666; font-size: 0.875rem;">Компонент: <code>p-textarea</code></p>
          <app-text-input
            variant="textarea"
            label="Комментарий"
            [rows]="3"
            [maxlength]="255"
            [showCharCount]="true"
            value="Пример текста для демонстрации счётчика символов (255 max).">
          </app-text-input>
        </div>

        <!-- DatePicker -->
        <div>
          <h3>6️⃣ Календарь (datepicker)</h3>
          <p style="color: #666; font-size: 0.875rem;">Компонент: <code>p-datepicker</code></p>
          <app-text-input
            variant="datepicker"
            label="Дата рождения"
            [maxDate]="currentDate"
            [minDate]="minDate">
          </app-text-input>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех 6 вариантов компонента на одной странице.',
      },
    },
  },
};

// =============================================
// ДЕМОНСТРАЦИЯ СОСТОЯНИЙ
// =============================================
export const StatesDemo: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Default -->
        <div>
          <h3>✅ Default</h3>
          <app-text-input variant="input" label="Email" placeholder="example@mail.com"></app-text-input>
        </div>

        <!-- Required -->
        <div>
          <h3>⭐ Required</h3>
          <app-text-input variant="input" label="Email" [required]="true"></app-text-input>
        </div>

        <!-- Invalid -->
        <div>
          <h3>❌ Invalid</h3>
          <app-text-input
            variant="input"
            label="Email"
            [invalid]="true"
            errorMessage="Некорректный email">
          </app-text-input>
        </div>

        <!-- Disabled -->
        <div>
          <h3>🔇 Disabled</h3>
          <app-text-input variant="input" label="Email" [disabled]="true"></app-text-input>
        </div>

        <!-- Readonly -->
        <div>
          <h3>📖 Readonly</h3>
          <app-text-input
            variant="input"
            label="Email"
            [readonly]="true"
            placeholder="Это поле только для чтения"
            value="example@mail.com">
          </app-text-input>
        </div>

        <!-- Hover (демонстрация) -->
        <div>
          <h3>🖱️ Hover</h3>
          <app-text-input class="demo-hover" variant="input" label="Email" placeholder="Наведи на меня"></app-text-input>
        </div>

        <!-- Focus (демонстрация) -->
        <div>
          <h3>🔍 Focus</h3>
          <app-text-input class="demo-focus" variant="input" label="Email" placeholder="Фокус"></app-text-input>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Демонстрация всех состояний компонента:

- **Default**: Базовое состояние
- **Required**: Обязательное поле (красная звёздочка)
- **Invalid**: Ошибка валидации (красная обводка + сообщение)
- **Disabled**: Полностью заблокированное поле
- **Readonly**: Только для чтения (серый фон) с placeholder
- **Hover**: Состояние при наведении (синяя обводка)
- **Focus**: Состояние при фокусе (синяя обводка + тень)
      `,
      },
    },
  },
};

// =============================================
// ПРИМЕРЫ ДЛЯ КАЖДОГО ВАРИАНТА
// =============================================

// 1. Input с иконкой
export const InputWithIcon: Story = {
  args: {
    variant: 'input',
    label: 'Поиск',
    placeholder: 'Введите запрос',
    showIcon: true,
    type: 'search',
  },
  parameters: {
    docs: {
      description: {
        story: `
# Текстовое поле с иконкой

- Использует **p-iconfield** и **p-inputicon** из PrimeNG
- Иконка появляется слева от поля
- Поддерживает все стандартные типы input (text, email, password, etc.)

\`\`\`html
<app-text-input
  variant="input"
  label="Поиск"
  placeholder="Введите запрос"
  [showIcon]="true"
  type="search"
/>
\`\`\`
      `,
      },
    },
  },
};

// 2. InputNumber с ограничениями
export const InputNumberWithConstraints: Story = {
  args: {
    variant: 'inputnumber',
    label: 'Количество',
    placeholder: 'Введите число',
    useGrouping: true,
    min: 0,
    max: 1000,
    step: 1,
  },
  parameters: {
    docs: {
      description: {
        story: `
# Числовое поле с ограничениями

- **Группировка тысяч**: 1 000 вместо 1000 ([useGrouping]="true")
- **Ограничения**: min=0, max=1000, step=1
- **Валидация**: Автоматически блокирует ввод значений вне диапазона

\`\`\`html
<app-text-input
  variant="inputnumber"
  label="Количество"
  [min]="0"
  [max]="1000"
  [useGrouping]="true"
/>
\`\`\`
      `,
      },
    },
  },
};

// 3. GAR Address с mock данными
export const GarAddressWithMockData: Story = {
  args: {
    variant: 'gar-address',
    label: 'Адрес',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
# Поле адреса с автокомплитом

- **Mock данные**: 30 адресов городов России (Москва, СПб, Казань etc.)
- **Поиск**: Фильтрация по введенному тексту
- **Оформление**:
  - Панель открывается в body (appendTo="body")
  - Loading индикатор при загрузке
  - Сообщение "Адреса не найдены" при пустом результате

\`\`\`html
<app-text-input
  variant="gar-address"
  label="Адрес"
  [required]="true"
/>
\`\`\`

## Пример mock данных:
\`\`\`typescript
const mockAddresses = [
  { garId: 1, fullName: 'г Москва, ул Тверская, д 1' },
  { garId: 2, fullName: 'г Санкт-Петербург, Невский пр-кт, д 20' },
  // ... еще 28 адресов
];
\`\`\`
      `,
      },
    },
  },
};

// 4. Phone Multi с валидацией
export const PhoneMultiWithValidation: Story = {
  args: {
    variant: 'phone-multi',
    label: 'Телефоны',
    required: true,
    maxPhones: 3,
    phoneMask: '+7(999)999-99-99',
    phonePlaceholder: '+7(___)___-__-__',
    value: ['+7(912)345-67-89', '+7(987)654-32-10'],
  },
  parameters: {
    docs: {
      description: {
        story: `
# Множественные телефоны с валидацией

- **Маска**: +7(999)999-99-99
- **Валидация**: Регулярное выражение /^\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$/
- **Ограничения**:
  - Минимум 1 телефон (нельзя удалить последний)
  - Максимум 3 телефона (настраивается через maxPhones)
- **Интерфейс**:
  - Добавление нового номера кнопкой "+"
  - Удаление номера через крестик в чипе
  - Подсветка невалидных номеров

\`\`\`html
<app-text-input
  variant="phone-multi"
  label="Телефоны"
  [maxPhones]="3"
  [value]="['+7(912)345-67-89']"
/>
\`\`\`
      `,
      },
    },
  },
};

// 5. Textarea с счётчиком символов
export const TextareaWithCounter: Story = {
  args: {
    variant: 'textarea',
    label: 'Комментарий',
    placeholder: 'Введите комментарий...',
    rows: 3,
    maxlength: 255,
    autoResize: true,
    showCharCount: true,
    value: 'Пример текста для демонстрации счётчика символов и кнопки очистки.',
  },
  parameters: {
    docs: {
      description: {
        story: `
# Текстовый блок с счётчиком символов

- **Автоувеличение**: Высота поля растет при вводе текста ([autoResize]="true")
- **Счётчик символов**: Показывает "осталось / максимум" (255 по умолчанию)
- **Кнопка очистки**: Появляется при наличии текста
- **Панель управления**: Отображается только когда showCharCount=true

\`\`\`html
<app-text-input
  variant="textarea"
  label="Комментарий"
  [rows]="3"
  [maxlength]="255"
  [showCharCount]="true"
/>
\`\`\`

## Логика счётчика:
\`\`\`typescript
const remaining = maxlength - (value?.length ?? 0);
const display = \`$\{remaining} / $\{maxlength}\`;
\`\`\`
      `,
      },
    },
  },
};

// 6. DatePicker с ограничениями
export const DatePickerWithConstraints: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentDate: new Date(),
      minDate: new Date(1900, 0, 1),
    },
    template: `
      <app-text-input
        variant="datepicker"
        label="Дата рождения"
        [required]="true"
        [readonlyInput]="false"
        [showOnFocus]="true"
        [showCalendarIcon]="true"
        [maxDate]="currentDate"
        [minDate]="minDate">
      </app-text-input>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
# Календарь с ограничениями

- **Ограничения дат**:
  - minDate: 01.01.1900
  - maxDate: Текущая дата
- **Локализация**: Русский язык (названия месяцев, кнопки "Сегодня"/"Очистить")
- **Интерфейс**:
  - Иконка календаря справа
  - Панель открывается при фокусе ([showOnFocus]="true")
  - Возможность ручного ввода ([readonlyInput]="false")

\`\`\`html
<app-text-input
  variant="datepicker"
  label="Дата рождения"
  [maxDate]="new Date()"
  [minDate]="new Date(1900, 0, 1)"
/>
\`\`\`
      `,
      },
    },
  },
};

// =============================================
// ПРИМЕРЫ С ОШИБКАМИ ВАЛИДАЦИИ
// =============================================
export const WithValidationErrors: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentDate: new Date(),
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h3>❌ Ошибка в текстовом поле</h3>
          <app-text-input
            variant="input"
            label="Email"
            type="email"
            [invalid]="true"
            errorMessage="Введите корректный email адрес"
            [required]="true">
          </app-text-input>
        </div>

        <div>
          <h3>❌ Ошибка в числовом поле</h3>
          <app-text-input
            variant="inputnumber"
            label="Возраст"
            [invalid]="true"
            errorMessage="Значение должно быть от 18 до 99"
            [min]="18"
            [max]="99">
          </app-text-input>
        </div>

        <div>
          <h3>❌ Ошибка в телефоне</h3>
          <app-text-input
            variant="phone-multi"
            label="Телефон"
            [invalid]="true"
            [value]="['+7(912)345-67']">
          </app-text-input>
        </div>

        <div>
          <h3>❌ Ошибка в календаре</h3>
          <app-text-input
            variant="datepicker"
            label="Дата"
            [invalid]="true"
            errorMessage="Дата не может быть в будущем"
            [maxDate]="currentDate">
          </app-text-input>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
# Примеры с ошибками валидации

Все варианты компонента поддерживают состояние ошибки:

1. **Красная обводка** поля
2. **Сообщение об ошибке** под полем (p-message)
3. **Автоматическая обертка в p-card** (если showCard=true)
4. **Кастомные сообщения** через параметр errorMessage
      `,
      },
    },
  },
};

// =============================================
// ПРИМЕРЫ С РАЗНЫМИ СОСТОЯНИЯМИ
// =============================================
export const MixedStatesGrid: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentDate: new Date(),
      minDate: new Date(1900, 0, 1),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
        <!-- Column 1: Input variants -->
        <div>
          <h4>1. Input</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <app-text-input variant="input" label="Default" placeholder="Text"></app-text-input>
            <app-text-input variant="input" label="Required" [required]="true"></app-text-input>
            <app-text-input variant="input" label="Disabled" [disabled]="true"></app-text-input>
            <app-text-input variant="input" label="Readonly" [readonly]="true" placeholder="Readonly text" value="Example"></app-text-input>
            <app-text-input variant="input" label="Invalid" [invalid]="true" errorMessage="Error!"></app-text-input>
          </div>
        </div>

        <!-- Column 2: Special variants -->
        <div>
          <h4>2. Special</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <app-text-input variant="inputnumber" label="Number" [min]="0" [max]="100"></app-text-input>
            <app-text-input variant="datepicker" label="Date" [maxDate]="currentDate" [minDate]="minDate"></app-text-input>
            <app-text-input variant="gar-address" label="Address"></app-text-input>
          </div>
        </div>

        <!-- Column 3: Complex variants -->
        <div>
          <h4>3. Complex</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <app-text-input variant="phone-multi" label="Phones" [value]="['+7(912)345-67-89']"></app-text-input>
            <app-text-input variant="textarea" label="Textarea" [rows]="2" [showCharCount]="true" value="Some text here"></app-text-input>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
# Сетка с различными состояниями

Демонстрация всех вариантов компонента в разных состояниях:

1. **Первый столбец**: Базовые input поля (default, required, disabled, readonly, invalid)
2. **Второй столбец**: Специальные варианты (number, date, address)
3. **Третий столбец**: Сложные варианты (phones, textarea)

Эта сетка помогает быстро сравнить визуальное отображение всех вариантов.
      `,
      },
    },
  },
};
