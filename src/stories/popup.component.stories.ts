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
      description: 'Позиция уведомления в контейнере',
    },
    life: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: 'Время отображения в миллисекундах (0 = бесконечно)',
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
 * Интерактивная площадка для тестирования уведомлений.
 *
 * **Как использовать:**
 * - Нажимайте кнопки для показа разных типов уведомлений
 * - Меняйте позицию через контрол "position"
 * - Настраивайте время жизни через контрол "life" (0 = не исчезает)
 * - Кнопка "Очистить все" удаляет все активные уведомления
 */
export const Playground: Story = {
  args: {
    position: 'top-right',
    life: 3000,
  },
};
