// .storybook/main.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG модули
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { StyleClassModule } from 'primeng/styleclass';

// Ваши кастомные компоненты
import { TextInputComponent } from '../app/components/input/input.component';
import { CheckboxComponent } from '../app/components/checkbox/checkbox.component';
import { SelectComponent } from '../app/components/select/select.component';
import { ButtonComponent } from '../app/components/buttons/buttons.component';
import { FileUploadComponent } from '../app/components/fileupload/file-upload.component';
import { UiKitDemoComponent } from '../app/components/ui-kit-demo/ui-kit-demo.component';

const meta: Meta<UiKitDemoComponent> = {
  title: 'Home/📖 Документация UI Kit',
  component: UiKitDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        AccordionModule,
        RadioButtonModule,
        SelectModule,
        StyleClassModule,
        UiKitDemoComponent,
        TextInputComponent,
        CheckboxComponent,
        SelectComponent,
        ButtonComponent,
        FileUploadComponent,
      ],
      declarations: [],
      providers: [DatePipe],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: { showPanel: false },
  },
};

export default meta;

// Основная история
export const HomePage: StoryObj<UiKitDemoComponent> = {
  name: 'Документация UI Kit',
  args: {
    userName: 'Гость',
    selectedTheme: 'light',
    showWelcomeBlock: false,
    selectedCity: null,
    showSecret: false,
  },
  render: (args) => ({
    props: args,
    template: `<app-ui-kit-demo></app-ui-kit-demo>`,
  }),
};
