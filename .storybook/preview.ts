import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: Aura,
            options: {
              prefix: 'p',
              darkModeSelector: false,
              cssLayer: {
                name: 'primeng',
                order: 'reset, bootstrap, primeng, custom-overrides',
              },
              csp: {
                nonce: undefined,
              },
              unstyled: false,
            },
          },
          translation: {
            firstDayOfWeek: 1,
            dayNames: [
              'Воскресенье',
              'Понедельник',
              'Вторник',
              'Среда',
              'Четверг',
              'Пятница',
              'Суббота',
            ],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: [
              'Январь',
              'Февраль',
              'Март',
              'Апрель',
              'Май',
              'Июнь',
              'Июль',
              'Август',
              'Сентябрь',
              'Октябрь',
              'Ноябрь',
              'Декабрь',
            ],
            monthNamesShort: [
              'Янв',
              'Фев',
              'Мар',
              'Апр',
              'Май',
              'Июн',
              'Июл',
              'Авг',
              'Сен',
              'Окт',
              'Ноя',
              'Дек',
            ],
            today: 'Сегодня',
            clear: 'Очистить',
            dateFormat: 'dd.mm.yy',
            weekHeader: 'Нед',
            accept: 'Да',
            reject: 'Нет',
            choose: 'Выбрать',
            upload: 'Загрузить',
            cancel: 'Отмена',
            fileSizeTypes: [
              'Б',
              'КБ',
              'МБ',
              'ГБ',
              'ТБ',
              'ПБ',
              'ЭБ',
              'ЗБ',
              'ЙБ',
            ],
            emptyMessage: 'Нет доступных вариантов',
            emptyFilterMessage: 'Результаты не найдены',
          },
        }),
      ],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
