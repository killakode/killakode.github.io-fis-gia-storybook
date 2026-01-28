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
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

// Ваши кастомные компоненты (standalone)
import { TextInputComponent } from '../app/components/input/input.component';
import { CheckboxComponent } from '../app/components/checkbox/checkbox.component';
import { RadioButtonComponent } from '../app/components/radio-button/radio-button.component';
import { SelectComponent } from '../app/components/select/select.component';
import { ButtonComponent } from '../app/components/buttons/buttons.component';
import { AccordionComponent } from '../app/components/accordion/accordion.component';
import { FileUploadComponent } from '../app/components/fileupload/file-upload.component';
import { ChipModule } from 'primeng/chip';
import { TextareaModule } from 'primeng/textarea';

// Моки данных
const mockCities = [
  { label: 'Москва', value: 'msk' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Казань', value: 'kzn' },
];

const mockReportGroups = [
  {
    value: 0,
    name: 'Отчёты ГИА-11 за 2024',
    reports: [
      { code: 'GIA11-01', name: 'Отчёт по регистрации' },
      { code: 'GIA11-02', name: 'Отчёт по конфликтам' },
    ],
  },
];

const mockFiles = [
  { id: '1', name: 'Документ.pdf', size: 1024, type: 'application/pdf' },
  { id: '2', name: 'Фото.jpg', size: 2048, type: 'image/jpeg' },
];

const mockTableData = [
  { id: 1, name: 'Участник 1', status: 'active', date: '2024-01-01' },
  { id: 2, name: 'Участник 2', status: 'pending', date: '2024-01-02' },
];

// Метаданные
const meta: Meta = {
  title: 'Home/📖 Документация UI Kit',
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
        TableModule,
        TabsModule,
        DialogModule,
        ToastModule,
        FileUploadModule,
        RadioButtonModule,
        SelectButtonModule,
        DropdownModule,
        MultiSelectModule,
        InputNumberModule,
        AutoCompleteModule,
        CalendarModule,
        TextareaModule,
        ChipModule,
        InputMaskModule,
        FloatLabelModule,
        MessageModule,
        TooltipModule,
        // Импортируем standalone-компоненты напрямую
        TextInputComponent,
        CheckboxComponent,
        RadioButtonComponent,
        SelectComponent,
        ButtonComponent,
        AccordionComponent,
        FileUploadComponent,
      ],
      providers: [DatePipe],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: { showPanel: false },
  },
};

export default meta;

// Главная история
export const HomePage: StoryObj = {
  name: 'Демо компонентов',
  render: (args) => ({
    props: {
      ...args,
      currentDate: new Date(),
      mockCities,
      mockReportGroups,
      mockFiles,
      mockTableData,
      showDialog: false,
    },
    template: `
      <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <!-- ЗАГОЛОВОК -->
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">📖 UI Kit: Компоненты</h1>

        <!-- РАЗДЕЛ 1: ФОРМЫ -->
        <p-card header="📝 Формы и поля ввода" style="margin-bottom: 2rem;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
            <!-- TextInput -->
            <div>
              <h3>TextInput</h3>
              <app-text-input
                variant="input"
                label="Email"
                placeholder="example@mail.com"
                type="email"
                style="margin-bottom: 1rem;"
              />
              <app-text-input
                variant="phone-multi"
                label="Телефоны"
                [maxPhones]="3"
                [value]="['+7(999)123-45-67']"
              />
            </div>

            <!-- Checkbox & Radio -->
            <div>
              <h3>Checkbox & Radio</h3>
              <app-checkbox label="Согласен с условиями" [required]="true" style="margin-bottom: 0.5rem;" />
              <app-checkbox label="Подписаться на рассылку" [checked]="true" style="margin-bottom: 1rem;" />
              <div style="display: flex; gap: 1rem;">
                <app-radio-button label="Опция 1" value="1" name="demo" />
                <app-radio-button label="Опция 2" value="2" name="demo" [checked]="true" />
              </div>
            </div>
          </div>

          <!-- Select -->
          <div style="margin-top: 2rem; display: flex; gap: 2rem;">
            <app-select
              mode="dropdown"
              [options]="mockCities"
              placeholder="Выберите город"
              style="min-width: 200px;"
            />
            <app-select
              mode="multiselect"
              [options]="mockCities"
              placeholder="Выберите города"
              [showHeader]="true"
              style="min-width: 200px;"
            />
          </div>
        </p-card>

        <!-- РАЗДЕЛ 2: КНОПКИ -->
        <p-card header="⚡ Кнопки" style="margin-bottom: 2rem;">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <app-button label="Primary" severity="primary" styleClass="blue-button" />
            <app-button label="Secondary" severity="secondary" styleClass="white-button" />
            <app-button label="Success" severity="success" styleClass="button-icon" icon="pi pi-check" />
          </div>
        </p-card>

        <!-- РАЗДЕЛ 3: АККОРДЕОН -->
        <p-card header="📊 Аккордеон" style="margin-bottom: 2rem;">
          <app-accordion
            [withExpandableTable]="true"
            [config]="{value: [0], multiple: false}"
            [reportGroups]="mockReportGroups"
          >
            <ng-template #expandedrow let-report>
              <tr>
                <td colspan="2" style="padding: 1rem; background: #f8f9fa;">
                  <div style="font-weight: 600;">{{ report.name }}</div>
                  <div style="color: #666;">{{ report.code }}</div>
                </td>
              </tr>
            </ng-template>
          </app-accordion>
        </p-card>

        <!-- РАЗДЕЛ 4: ТАБЛИЦА -->
        <p-card header="📋 Таблица" style="margin-bottom: 2rem;">
          <p-table [value]="mockTableData" [paginator]="true" [rows]="5">
            <ng-template pTemplate="header">
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Статус</th>
                <th>Дата</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-item>
              <tr>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td [style.color]="item.status === 'active' ? 'green' : 'orange'">
                  {{ item.status }}
                </td>
                <td>{{ item.date }}</td>
              </tr>
            </ng-template>
          </p-table>
        </p-card>

        <!-- РАЗДЕЛ 5: ФАЙЛЫ -->
        <p-card header="📁 FileUpload" style="margin-bottom: 2rem;">
          <app-file-upload
            variant="file-list"
            [files]="mockFiles"
            [hasRemove]="true"
          />
        </p-card>

        <!-- ФУТЕР -->
        <div style="text-align: center; margin-top: 2rem; color: #666;">
          📖 UI Kit | {{ currentDate | date:'medium' }}
        </div>
      </div>
    `,
  }),
};
