// radio-button.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { RadioButtonComponent } from 'src/app/components/radio-button/radio-button.component';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

const meta: Meta<RadioButtonComponent> = {
  title: 'Components/RadioButton',
  component: RadioButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, RadioButtonModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description:
        'Текст метки радиокнопки. Поддерживает многострочный текст с переносами.',
    },
    value: {
      control: 'text',
      description: 'Значение радиокнопки, используется для привязки данных.',
    },
    name: {
      control: 'text',
      description:
        'Имя группы радиокнопок. Все кнопки с одинаковым name образуют группу.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Отключает радиокнопку. Визуально серый цвет, курсор not-allowed.',
    },
    selectedValue: {
      control: 'text',
      description:
        'Выбранное значение для двусторонней привязки [(selectedValue)].',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# RadioButton (на базе p-radiobutton)

Кастомная обертка над компонентом p-radiobutton из PrimeNG с улучшенными стилями.

## Особенности
### 1. Поддерживаемые состояния
| Состояние       | Описание                                      | Пример кода                          |
|------------------|-----------------------------------------------|---------------------------------------|
| Default          | Базовое состояние                            | \`<p-radiobutton />\`               |
| Hover            | Подсветка при наведении                      | \`.forced-hover\` (в Storybook)      |
| Checked          | Выбранная радиокнопка                        | \`[ngModel]="value"\`                |
| Disabled         | Недоступная радиокнопка                      | \`[disabled]="true"\`                |
| Focus            | Состояние при фокусе (клавиатура/tab)       | \`:focus-visible\`                   |
| Focus Checked   | Фокус на выбранной радиокнопке               | \`.forced-focus-checked\` (Storybook)|

### 2. Двусторонняя привязка
Используйте \`[(ngModel)]\` или \`[(selectedValue)]\` для синхронизации:
\`\`\`html
<p-radiobutton
  label="Опция 1"
  value="opt1"
  name="group1"
  [(ngModel)]="selectedValue"
/>
\`\`\`

### 3. Группировка
Все кнопки с одинаковым \`name\` образуют группу:
\`\`\`html
<p-radiobutton
  label="Опция 1"
  value="opt1"
  name="group1"
  [(ngModel)]="selectedValue"
/>
<p-radiobutton
  label="Опция 2"
  value="opt2"
  name="group1"
  [(ngModel)]="selectedValue"
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;

// ========================================
// PLAYGROUND - Интерактивная песочница (первая история)
// ========================================
export const Playground: Story = {
  args: {
    label: 'Опция 1',
    value: 'opt1',
    name: 'demo-group',
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      selectedValue: args.value,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h3>Интерактивное демо</h3>
        <p>Выбрано: <strong>{{ selectedValue }}</strong></p>

        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <app-radio-button
            label="{{ label }}"
            value="{{ value }}"
            name="{{ name }}"
            [(selectedValue)]="selectedValue"
            [disabled]="disabled"
          />
          <app-radio-button
            label="Опция 2"
            value="opt2"
            name="{{ name }}"
            [(selectedValue)]="selectedValue"
          />
          <app-radio-button
            label="Опция 3 (отключена)"
            value="opt3"
            name="{{ name }}"
            [(selectedValue)]="selectedValue"
            [disabled]="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 🎮 Интерактивная песочница
Играйте с параметрами в панели Controls, чтобы увидеть как они влияют на компонент.

**Особенности:**
- Двусторонняя привязка через \`[(selectedValue)]\`
- Группировка через одинаковое \`name\`
- Поддержка состояния \`disabled\`

**Пример кода:**
\`\`\`html
<app-radio-button
  label="Опция 1"
  value="opt1"
  name="group1"
  [(selectedValue)]="selectedValue"
/>
\`\`\`
        `,
      },
    },
  },
};

// ========================================
// STATES - Все состояния (для демонстрации)
// ========================================
export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;" class="states-demo-container">
        <!-- UNCHECKED STATES -->
        <div>
          <h3>⬜️ Unchecked States</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
            <div style="text-align: center;">
              <div class="radio-wrapper demo-only">
                <app-radio-button label="Default" value="default" name="states-1" />
              </div>
              <div style="font-size: 0.75rem; color: #666;">Default</div>
            </div>
            <div style="text-align: center;">
              <div class="radio-wrapper forced-hover demo-only">
                <app-radio-button label="Hover" value="hover" name="states-1" />
              </div>
              <div style="font-size: 0.75rem; color: #666;">Hover</div>
            </div>
            <div style="text-align: center;">
              <div class="radio-wrapper">
                <app-radio-button label="Disabled" value="disabled" name="states-1" [disabled]="true" />
              </div>
              <div style="font-size: 0.75rem; color: #666;">Disabled</div>
            </div>
          </div>
        </div>

        <!-- CHECKED STATES -->
        <div>
          <h3>✅ Checked States</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
            <div style="text-align: center;">
              <div class="radio-wrapper demo-only">
                <app-radio-button label="Checked" value="checked" name="states-2" [selectedValue]="'checked'" />
              </div>
              <div style="font-size: 0.75rem; color: #666;">Checked</div>
            </div>
            <div style="text-align: center;">
              <div class="radio-wrapper forced-hover-checked demo-only">
                <app-radio-button label="Hover" value="hover-checked" name="states-2" [selectedValue]="'hover-checked'" />
              </div>
              <div style="font-size: 0.75rem; color: #666;">Hover Checked</div>
            </div>
            <div style="text-align: center;">
              <div class="radio-wrapper">
                <app-radio-button label="Disabled" value="disabled-checked" name="states-2" [disabled]="true" [selectedValue]="'disabled-checked'" />
              </div>
              <div style="font-size: 0.75rem; color: #666;">Disabled Checked</div>
            </div>
          </div>
        </div>

        <!-- FOCUS STATES -->
        <div>
          <h3>🔵 Focus States</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div style="text-align: center;">
              <div class="radio-wrapper forced-focus demo-only" tabindex="0">
                <app-radio-button label="Focus" value="focus" name="states-3" />
              </div>
              <div style="font-size: 0.75rem; color: #666;">Focus</div>
            </div>
            <div style="text-align: center;">
              <div class="radio-wrapper forced-focus-checked demo-only" tabindex="0">
                <app-radio-button label="Focus Checked" value="focus-checked" name="states-3" [selectedValue]="'focus-checked'" />
              </div>
              <div style="font-size: 0.75rem; color: #666;">Focus Checked</div>
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
### 📊 Все состояния компонента
Демонстрация всех визуальных состояний радиокнопки.

**Особенности:**
- Default/Hover/Disabled для невыбранных кнопок
- Checked/Hover Checked/Disabled Checked для выбранных
- Focus/Focus Checked для навигации с клавиатуры

> ⚠️ В Storybook focus симулируется через forced-классы.
> В реальном приложении используйте клавишу **Tab** для навигации.
        `,
      },
    },
  },
};

// ========================================
// GROUP - Группа радиокнопок
// ========================================
export const Group: Story = {
  render: () => ({
    props: {
      groupValue: 'opt1',
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h3>Группа радиокнопок</h3>
        <p>Выбрано: {{ groupValue }}</p>

        <app-radio-button
          label="Опция 1"
          value="opt1"
          name="group-demo"
          [(selectedValue)]="groupValue"
        />
        <app-radio-button
          label="Опция 2"
          value="opt2"
          name="group-demo"
          [(selectedValue)]="groupValue"
        />
        <app-radio-button
          label="Опция 3 (отключена)"
          value="opt3"
          name="group-demo"
          [(selectedValue)]="groupValue"
          [disabled]="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 📋 Группа радиокнопок
Пример группы радиокнопок с разными состояниями.

**Особенности:**
- Все кнопки в группе имеют одинаковый \`name\`
- Выбранное значение отображается в реальном времени
- Отключенная кнопка не участвует в выборе

**Пример кода:**
\`\`\`html
<div *ngFor="let option of options">
  <app-radio-button
    [label]="option.label"
    [value]="option.value"
    name="group-name"
    [(selectedValue)]="selectedValue"
    [disabled]="option.disabled"
  />
</div>
\`\`\`
        `,
      },
    },
  },
};

// ========================================
// WITH LONG LABELS - Длинные метки
// ========================================
export const WithLongLabels: Story = {
  render: () => ({
    props: {
      termsValue: 'agree',
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        <h3>Радиокнопки с длинными метками</h3>
        <app-radio-button
          label="Я согласен с условиями использования, политикой конфиденциальности и соглашением об обработке персональных данных"
          value="agree"
          name="terms"
          [(selectedValue)]="termsValue"
        />
        <app-radio-button
          label="Я не согласен с вышеуказанными условиями и хочу продолжить без принятия соглашения"
          value="disagree"
          name="terms"
          [(selectedValue)]="termsValue"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 📜 Длинные метки
Демонстрация работы с многострочными метками.

**Особенности:**
- Автоматический перенос текста
- Сохранение отступов и выравнивания
- Полная поддержка всех состояний

**Пример кода:**
\`\`\`html
<app-radio-button
  label="Очень длинный текст метки, который автоматически переносится на новую строку"
  value="long-label"
  name="long-group"
/>
\`\`\`
        `,
      },
    },
  },
};
