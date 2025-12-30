import {
  FileUploadComponent,
  FileUploadItem,
} from '../app/components/fileupload/file-upload.component';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-file-upload-wrapper',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, FieldsetModule, DialogModule],
  template: `
    <!-- Вариант: Button with Dialog -->
    <div *ngIf="variant === 'button-with-dialog'" class="demo-body-container">
      <div class="demo-body-content">
        <div class="demo-body-header">
          <h2>📤 {{ headerTitle }}</h2>
          <p>{{ headerDescription }}</p>
        </div>

        <app-file-upload
          [variant]="variant"
          [files]="uploadedFiles"
          [multiple]="multiple"
          [auto]="auto"
          [hasRemove]="hasRemove"
          [dialogButtonLabel]="dialogButtonLabel"
          [dialogHeader]="dialogHeader"
          (onUpload)="handleUpload($event)"
          (onRemove)="handleRemove($event)"
        ></app-file-upload>

        <div
          *ngIf="uploadedFiles.length > 0"
          style="margin-top: 2rem; padding: 1rem; background: #f5f7fa; border-radius: 0.25rem;"
        >
          <h4 style="margin: 0 0 0.5rem 0; color: #333;">
            Загруженные файлы ({{ uploadedFiles.length }}):
          </h4>
          <ul style="margin: 0; padding-left: 1.5rem; color: #666;">
            <li *ngFor="let file of uploadedFiles">
              {{ file.name }} ({{ formatFileSize(file.size) }})
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Вариант: Upload Field -->
    <div *ngIf="variant === 'upload-field'">
      <p-fieldset [legend]="legend" [style]="{ width: '50rem' }">
        <app-file-upload
          [variant]="variant"
          [files]="uploadedFiles"
          [multiple]="multiple"
          [auto]="auto"
          [hasRemove]="hasRemove"
          (onUpload)="handleUpload($event)"
          (onRemove)="handleRemove($event)"
        ></app-file-upload>
      </p-fieldset>

      <div
        *ngIf="uploadedFiles.length > 0"
        style="margin-top: 1rem; padding: 1rem; background: #f5f7fa; border-radius: 0.25rem; max-width: 50rem;"
      >
        <h4 style="margin: 0 0 0.5rem 0; color: #333;">
          Загружено файлов: {{ uploadedFiles.length }}
        </h4>
        <ul style="margin: 0; padding-left: 1.5rem; color: #666;">
          <li *ngFor="let file of uploadedFiles">
            {{ file.name }} ({{ formatFileSize(file.size) }})
          </li>
        </ul>
      </div>
    </div>

    <!-- Вариант: File List -->
    <div *ngIf="variant === 'file-list'">
      <p-fieldset [legend]="legend" [style]="{ width: '50rem' }">
        <app-file-upload
          [variant]="variant"
          [files]="uploadedFiles"
          [hasRemove]="hasRemove"
          (onRemove)="handleRemove($event)"
        ></app-file-upload>
      </p-fieldset>
    </div>
  `,
  styles: [
    `
      .demo-body-container {
        min-height: 600px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 3rem;
        border-radius: 0.5rem;
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
        position: relative;
      }

      .demo-body-content {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        margin: 0 auto;
      }

      .demo-body-header {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #e0e0e0;
      }

      .demo-body-header h2 {
        margin: 0 0 0.5rem 0;
        color: #333;
      }

      .demo-body-header p {
        margin: 0;
        color: #666;
        font-size: 0.875rem;
      }
    `,
  ],
})
class DemoFileUploadWrapperComponent {
  @Input() variant: 'upload-field' | 'file-list' | 'button-with-dialog' =
    'upload-field';
  @Input() initialFiles: FileUploadItem[] = [];
  @Input() multiple: boolean = true;
  @Input() auto: boolean = true;
  @Input() hasRemove: boolean = true;
  @Input() dialogButtonLabel: string = 'Загрузить файлы';
  @Input() dialogHeader: string = 'Загрузка файлов';
  @Input() legend: string = 'Загрузка файлов';
  @Input() headerTitle: string = 'Загрузка файлов';
  @Input() headerDescription: string = 'Демонстрация компонента';

  uploadedFiles: FileUploadItem[] = [];

  ngOnInit() {
    this.uploadedFiles = [...this.initialFiles];
  }

  handleUpload(event: any) {
    const filesArray = Array.from(event.files || []) as File[];
    const newFiles = filesArray.map((f: File) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      size: f.size,
      type: f.type,
    }));
    this.uploadedFiles = [...this.uploadedFiles, ...newFiles];
  }

  handleRemove(event: any) {
    this.uploadedFiles = this.uploadedFiles.filter((_, i) => i !== event.index);
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }
}

const meta: Meta<FileUploadComponent> = {
  title: 'Components/FileUpload',
  component: FileUploadComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient()],
    }),
    moduleMetadata({
      imports: [
        CommonModule,
        FileUploadModule,
        DialogModule,
        ButtonModule,
        FieldsetModule,
        TooltipModule,
        DemoFileUploadWrapperComponent,
      ],
    }),
  ],

  argTypes: {
    variant: {
      control: 'select',
      options: ['upload-field', 'file-list', 'button-with-dialog'],
      description: `
**Варианты отображения компонента:**

- \`upload-field\` — Поле для загрузки файлов с drag&drop
- \`file-list\` — Список загруженных файлов для просмотра
- \`button-with-dialog\` — Кнопка, открывающая модальное окно с загрузкой
      `,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'upload-field' },
      },
    },
    files: {
      control: 'object',
      description: 'Массив файлов для отображения',
      table: { category: 'Data' },
    },
    multiple: {
      control: 'boolean',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    auto: {
      control: 'boolean',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    hasRemove: {
      control: 'boolean',
      description: 'Показывать кнопку удаления файла',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
    dialogButtonLabel: {
      control: 'text',
      description:
        'Текст кнопки открытия диалога (для варианта button-with-dialog)',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Загрузить файлы' },
      },
    },
    dialogHeader: {
      control: 'text',
      description:
        'Заголовок диалогового окна (для варианта button-with-dialog)',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Загрузка файлов' },
      },
    },
  },

  parameters: {
    docs: {
      description: {
        component: `
# FileUpload Component

Компонент для загрузки и отображения файлов.

## 📋 Варианты использования:

### 1️⃣ Upload Field
- Используется внутри \`p-fieldset\`
- Пример: Групповой допуск к ГИА

### 2️⃣ File List
- Просмотр загруженных файлов
- Пример: Реестр изменений — Работники

### 3️⃣ Button with Dialog
- Компактная кнопка, открывающая модальное окно
- Самостоятельный вариант без дополнительных контейнеров
- Модальное окно выводится в body
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

const mockFiles: FileUploadItem[] = [
  {
    id: '1',
    name: 'Приказ_123.pdf',
    size: 2048000,
    type: 'application/pdf',
    url: '#',
  },
  {
    id: '2',
    name: 'Справка_о_работнике.docx',
    size: 1024000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url: '#',
  },
  { id: '3', name: 'Заметки.txt', size: 512000, type: 'text/plain', url: '#' },
  {
    id: '4',
    name: 'Отчёт_2024.xlsx',
    size: 3145728,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    url: '#',
  },
  { id: '5', name: 'Данные.csv', size: 1048576, type: 'text/csv', url: '#' },
  {
    id: '6',
    name: 'Скан_паспорта.jpg',
    size: 3145728,
    type: 'image/jpeg',
    url: '#',
  },
  {
    id: '7',
    name: 'Фото_документа.png',
    size: 2097152,
    type: 'image/png',
    url: '#',
  },
  {
    id: '8',
    name: 'Документы_2024.zip',
    size: 10485760,
    type: 'application/zip',
    url: '#',
  },
  {
    id: '9',
    name: 'Архив_старый.rar',
    size: 5242880,
    type: 'application/x-rar-compressed',
    url: '#',
  },
  {
    id: '10',
    name: 'Презентация.pptx',
    size: 4194304,
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    url: '#',
  },
  {
    id: '11',
    name: 'Инструкция.mp4',
    size: 20971520,
    type: 'video/mp4',
    url: '#',
  },
];

/**
 * # 🎮 Playground
 */
export const Playground: Story = {
  args: {
    variant: 'file-list',
    files: mockFiles,
    multiple: true,
    auto: false,
    hasRemove: true,
    dialogButtonLabel: 'Загрузить файлы',
    dialogHeader: 'Загрузка документов',
  },
  render: (args) => ({
    props: args,
    template: `
      <demo-file-upload-wrapper
        [variant]="variant"
        [initialFiles]="files"
        [multiple]="multiple"
        [auto]="auto"
        [hasRemove]="hasRemove"
        [dialogButtonLabel]="dialogButtonLabel"
        [dialogHeader]="dialogHeader"
        legend="Загрузка файлов"
      ></demo-file-upload-wrapper>
    `,
  }),
};

/**
 * # 🆕 Button with Dialog
 */
export const ButtonWithDialog: Story = {
  args: {
    variant: 'button-with-dialog',
    files: [],
    multiple: true,
    auto: false,
    hasRemove: true,
    dialogButtonLabel: 'Загрузить документы',
    dialogHeader: 'Загрузка файлов',
  },
  render: (args) => ({
    props: args,
    template: `
      <demo-file-upload-wrapper
        variant="button-with-dialog"
        [initialFiles]="files"
        [multiple]="multiple"
        [auto]="auto"
        [hasRemove]="hasRemove"
        [dialogButtonLabel]="dialogButtonLabel"
        [dialogHeader]="dialogHeader"
        headerTitle="Компактный вариант загрузки файлов"
        headerDescription="Нажмите кнопку ниже, чтобы открыть модальное окно с загрузкой файлов. Модальное окно откроется поверх этого контейнера (в body)"
      ></demo-file-upload-wrapper>
    `,
  }),
};

/**
 * # 🆕 Button with Dialog (с предзагруженными файлами)
 */
export const ButtonWithDialogWithFiles: Story = {
  args: {
    variant: 'button-with-dialog',
    files: mockFiles,
    multiple: true,
    auto: false,
    hasRemove: true,
    dialogButtonLabel: 'Управление файлами',
    dialogHeader: 'Загруженные документы',
  },
  render: (args) => ({
    props: args,
    template: `
      <demo-file-upload-wrapper
        variant="button-with-dialog"
        [initialFiles]="files"
        [multiple]="multiple"
        [auto]="auto"
        [hasRemove]="hasRemove"
        [dialogButtonLabel]="dialogButtonLabel"
        [dialogHeader]="dialogHeader"
        headerTitle="Управление загруженными файлами"
        headerDescription="Загружено файлов: ${mockFiles.length}. Откройте диалог, чтобы увидеть список файлов и добавить новые."
      ></demo-file-upload-wrapper>
    `,
  }),
};

/**
 * # 📤 Upload Field в p-fieldset
 */
export const UploadFieldInFieldset: Story = {
  args: {
    variant: 'upload-field',
    files: [],
    multiple: true,
    auto: false,
    hasRemove: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <demo-file-upload-wrapper
        variant="upload-field"
        [initialFiles]="files"
        [multiple]="multiple"
        [auto]="auto"
        [hasRemove]="hasRemove"
        legend="Прикрепление документов"
      ></demo-file-upload-wrapper>
    `,
  }),
};

/**
 * # 📤 Upload Field в p-fieldset (с предзагруженными файлами)
 */
export const UploadFieldWithFilesInFieldset: Story = {
  args: {
    variant: 'upload-field',
    files: mockFiles,
    multiple: true,
    auto: false,
    hasRemove: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <demo-file-upload-wrapper
        variant="upload-field"
        [initialFiles]="files"
        [multiple]="multiple"
        [auto]="auto"
        [hasRemove]="hasRemove"
        legend="Загруженные документы (${mockFiles.length})"
      ></demo-file-upload-wrapper>
    `,
  }),
};

/**
 * # 📂 File List в p-fieldset
 */
export const FileListInFieldset: Story = {
  args: {
    variant: 'file-list',
    files: mockFiles,
    hasRemove: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <demo-file-upload-wrapper
        variant="file-list"
        [initialFiles]="files"
        [hasRemove]="hasRemove"
        legend="Документы участника"
      ></demo-file-upload-wrapper>
    `,
  }),
};

/**
 * # 📂 File List (с кнопкой удаления)
 */
export const FileListWithRemove: Story = {
  args: {
    variant: 'file-list',
    files: mockFiles,
    hasRemove: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <demo-file-upload-wrapper
        variant="file-list"
        [initialFiles]="files"
        [hasRemove]="hasRemove"
        legend="Документы участника (с удалением)"
      ></demo-file-upload-wrapper>
    `,
  }),
};

/**
 * # 📂 File List (пустое состояние)
 */
export const FileListEmpty: Story = {
  args: {
    variant: 'file-list',
    files: [],
    hasRemove: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <p-fieldset legend="Прикрепленные файлы" [style]="{ width: '50rem' }">
        <app-file-upload
          variant="file-list"
          [files]="files"
          [hasRemove]="hasRemove"
        ></app-file-upload>
      </p-fieldset>
    `,
  }),
};

/**
 * # 📁 Все типы файлов
 */
export const AllFileTypes: Story = {
  args: {
    variant: 'file-list',
    files: mockFiles,
    hasRemove: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <p-fieldset
        legend="Примеры всех типов файлов"
        [style]="{ width: '50rem' }"
      >
        <app-file-upload
          variant="file-list"
          [files]="files"
          [hasRemove]="hasRemove"
        ></app-file-upload>
      </p-fieldset>

      <div style="margin-top: 2rem; padding: 1rem; background: #f5f7fa; border-radius: 0.25rem; max-width: 50rem;">
        <h4 style="margin: 0 0 1rem 0;">Поддерживаемые типы файлов:</h4>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; font-size: 0.875rem;">
          <div><strong>📄 Документы:</strong> PDF, DOC, DOCX, TXT, RTF</div>
          <div><strong>📊 Таблицы:</strong> XLS, XLSX, CSV, ODS</div>
          <div><strong>📽️ Презентации:</strong> PPT, PPTX, PPS, KEY</div>
          <div><strong>🖼️ Изображения:</strong> JPG, PNG, GIF, BMP, TIF, PCX</div>
          <div><strong>📦 Архивы:</strong> ZIP, RAR</div>
          <div><strong>🎥 Видео:</strong> AVI, MP4, FLV, MKV, MOV, MPG</div>
        </div>
      </div>
    `,
  }),
};

/**
 * # 📊 Сравнение всех вариантов
 */
export const AllVariantsComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; padding: 2rem;">

        <div>
          <h2>1️⃣ Button with Dialog (компактный вариант)</h2>
          <p style="color: #666; margin-bottom: 1rem;">
            Кнопка, открывающая модальное окно с загрузкой. Модальное окно выводится в body.
          </p>
          <demo-file-upload-wrapper
            variant="button-with-dialog"
            [initialFiles]="[]"
            dialogButtonLabel="Загрузить файлы"
            dialogHeader="Загрузка документов"
            headerTitle="Форма заявки"
            headerDescription="Нажмите кнопку для загрузки файлов"
          ></demo-file-upload-wrapper>
        </div>

        <div>
          <h2>2️⃣ Upload Field в p-fieldset (с загрузкой)</h2>
          <p style="color: #666; margin-bottom: 1rem;">
            Поле для загрузки файлов с drag&drop
          </p>
          <demo-file-upload-wrapper
            variant="upload-field"
            [initialFiles]="[]"
            legend="Прикрепление документов"
          ></demo-file-upload-wrapper>
        </div>

        <div>
          <h2>3️⃣ File List (без кнопки удаления)</h2>
          <p style="color: #666; margin-bottom: 1rem;">
            Просмотр загруженных файлов (только для чтения)
          </p>
          <demo-file-upload-wrapper
            variant="file-list"
            [initialFiles]="[
              { id: '1', name: 'Документ_1.pdf', size: 2048000, type: 'application/pdf' },
              { id: '2', name: 'Справка_о_работнике.docx', size: 1024000 },
              { id: '3', name: 'Скан_паспорта.jpg', size: 3145728, type: 'image/jpeg' }
            ]"
            [hasRemove]="false"
            legend="Документы участника"
          ></demo-file-upload-wrapper>
        </div>

        <div>
          <h2>4️⃣ File List (с кнопкой удаления)</h2>
          <p style="color: #666; margin-bottom: 1rem;">
            Файлы можно удалять
          </p>
          <demo-file-upload-wrapper
            variant="file-list"
            [initialFiles]="[
              { id: '1', name: 'Документ_1.pdf', size: 2048000, type: 'application/pdf' },
              { id: '2', name: 'Справка_о_работнике.docx', size: 1024000 },
              { id: '3', name: 'Скан_паспорта.jpg', size: 3145728, type: 'image/jpeg' }
            ]"
            [hasRemove]="true"
            legend="Документы участника (с удалением)"
          ></demo-file-upload-wrapper>
        </div>

        <div>
          <h2>5️⃣ File List (пустое состояние)</h2>
          <p style="color: #666; margin-bottom: 1rem;">
            Когда нет загруженных файлов
          </p>
          <p-fieldset legend="Прикрепленные файлы" [style]="{ width: '50rem' }">
            <app-file-upload variant="file-list" [files]="[]" [hasRemove]="false"></app-file-upload>
          </p-fieldset>
        </div>

      </div>
    `,
  }),
};
