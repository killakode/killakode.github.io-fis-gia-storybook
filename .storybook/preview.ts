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
                order: 'reset, primeng, custom-overrides',
              },
              csp: {
                nonce: undefined,
              },

              unstyled: false,
            },
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
