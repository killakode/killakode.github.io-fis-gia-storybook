import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { GiaRegistrationFormComponent } from 'src/app/components/test-form/test-form.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // <-- Добавлено

const meta: Meta<GiaRegistrationFormComponent> = {
  title: 'Forms/GIA Registration Form',
  component: GiaRegistrationFormComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        AccordionModule,
        CardModule,
        ButtonModule,
        MultiSelectModule,
        RadioButtonModule,
        CheckboxModule,
        InputTextModule,
        CalendarModule,
        FileUploadModule,
        HttpClientModule, // <-- Добавлено
      ],
      providers: [MessageService, DatePipe, JsonPipe],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideAnimations(),
        importProvidersFrom(HttpClientModule), // <-- Добавлено
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# Форма регистрации участника ГИА

Пошаговая форма с валидацией, загрузкой файлов и выбором экзаменов.

## Возможности:
- **4 шага** (аккордеон)
- **Валидация** полей
- **Загрузка файлов** (сканы документов)
- **Выбор экзаменов** (мультиселект)
- **Подтверждение** данных перед отправкой
- **Уведомления** об успешной отправке
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<GiaRegistrationFormComponent>;

export const Default: Story = {
  args: {
    // Здесь можно передать начальные значения, если нужно
  },
};
