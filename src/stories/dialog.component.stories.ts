import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { DialogComponent } from '../app/components/dialog/dialog.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog (p-dialog)',
  component: DialogComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Компонент модальных диалоговых окон на базе PrimeNG Dialog и ConfirmDialog.

## Основные возможности

- ✅ **2 типа диалогов**: Стандартный (standard) и диалог подтверждения (confirm)
- 📍 **Гибкое позиционирование**: На весь экран или внутри контейнера (appendTo)
- ❌ **Настраиваемое закрытие**: Кнопке X, или только через действия

        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['standard', 'confirm'],
      description: 'Тип диалогового окна',
      table: {
        type: { summary: 'DialogType' },
        defaultValue: { summary: 'standard' },
      },
    },
    header: {
      control: 'text',
      description: 'Заголовок диалога',
    },
    showHeader: {
      control: 'boolean',
      description: 'Показывать заголовок',
    },
    content: {
      control: 'text',
      description: 'Текст содержимого',
    },
    showFooter: {
      control: 'boolean',
      description: 'Показывать футер с кнопками',
    },
    closable: {
      control: 'boolean',
      description: 'Кнопка закрытия (X)',
    },
    acceptLabel: {
      control: 'text',
      description: 'Текст кнопки подтверждения',
    },
    rejectLabel: {
      control: 'text',
      description: 'Текст кнопки отмены',
    },
    confirmIcon: {
      control: 'select',
      options: [
        'pi pi-exclamation-triangle',
        'pi pi-check-circle',
        'pi pi-times-circle',
        'pi pi-info-circle',
        'pi pi-question-circle',
      ],
      description: 'Иконка для confirm диалога',
    },
    appendTo: {
      control: 'select',
      options: ['body', '.dialog-demo-container'],
      description: 'Место отображения диалога',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body' },
      },
    },
  },
  args: {
    type: 'standard',
    header: 'Заголовок диалога',
    content: 'Содержимое диалогового окна',
    showHeader: true,
    showFooter: true,
    closable: true,
    acceptLabel: 'Подтвердить',
    rejectLabel: 'Отменить',
    confirmIcon: 'pi pi-exclamation-triangle',
    appendTo: 'body',
  },
};

export default meta;
type Story = StoryObj<DialogComponent>;

/**
 * ## Интерактивная площадка
 *
 * Используйте контролы справа для настройки диалога и кнопки для его открытия.
 *
 * ### Позиционирование
 *
 * - **appendTo="body"** — диалог на весь экран (полноэкранный overlay)
 * - **appendTo="your-container-name"** — диалог внутри контейнера (появится область ниже)
 *
 * ### Типы диалогов
 *
 * - **standard** — обычное модальное окно с контентом и футером
 * - **confirm** — диалог подтверждения с иконкой
 *
 * ### Размеры (только для standard)
 *
 * - **default** — 57.5rem (920px)
 * - **big** — 82.5rem (1320px)
 * - **fullwidth** — 117.5rem (1880px)
 *
 * ### Настройки закрытия
 *
 * - **closable** — показать кнопку X
 */
export const Playground: Story = {
  args: {
    type: 'standard',
    header: 'Заголовок диалога',
    content: 'Содержимое диалогового окна',
    showHeader: true,
    showFooter: true,
    closable: true,
    acceptLabel: 'Подтвердить',
    rejectLabel: 'Отменить',
    confirmIcon: 'pi pi-exclamation-triangle',
    appendTo: 'body',
  },
};
