import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { PopupComponent } from '../app/components/popup/popup.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<PopupComponent> = {
  title: 'Components/Popup (Toast)',
  component: PopupComponent,
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
# Popup (Toast) — Всплывающие уведомления

Компонент для отображения временных уведомлений пользователю.

## Основные возможности

- ✅ **4 типа уведомлений**: Success, Info, Warn, Error
- 📍 **7 позиций** на экране (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, center)
- ⏱️ **Настраиваемое время жизни** (0 = бесконечно)
- 🎨 **Кастомные цвета** из дизайн-системы проекта
- ❌ **Ручное закрытие** через кнопку
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'center',
      ],
      description: 'Позиция уведомления на экране',
      table: {
        type: { summary: 'PopupPosition' },
        defaultValue: { summary: 'top-right' },
      },
    },
    life: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description:
        'Время отображения в миллисекундах (0 = не исчезает автоматически)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' },
      },
    },
  },
  args: {
    position: 'top-right',
    life: 3000,
  },
};

export default meta;
type Story = StoryObj<PopupComponent>;

/**
 * ## Интерактивная площадка
 *
 * Используйте кнопки для тестирования разных типов уведомлений.
 *
 * **Настройки:**
 * - `position` — выберите позицию из выпадающего списка
 * - `life` — установите время жизни (0 = бесконечно)
 *
 * **Типы уведомлений:**
 * - **Success** (зелёный) — успешное выполнение операции
 * - **Info** (голубой) — информационное сообщение
 * - **Warning** (жёлтый) — предупреждение
 * - **Error** (красный) — ошибка
 */
export const Playground: Story = {
  args: {
    position: 'top-right',
    life: 3000,
  },
};
