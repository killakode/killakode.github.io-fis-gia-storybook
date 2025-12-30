import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

/**
 * Интерфейс для файла в компоненте загрузки
 */
export interface FileUploadItem {
  /** Уникальный идентификатор файла */
  id?: string;
  /** Имя файла */
  name: string;
  /** Размер файла в байтах */
  size?: number;
  /** MIME-тип файла */
  type?: string;
  /** URL для скачивания файла */
  url?: string;
}

/**
 * Варианты отображения компонента загрузки файлов
 */
export type FileUploadVariant =
  | 'upload-field'
  | 'file-list'
  | 'button-with-dialog';

/**
 * Событие загрузки файла
 */
export interface FileUploadEvent {
  /** Массив загруженных файлов */
  files: File[];
  /** Исходное событие */
  originalEvent: Event;
}

/**
 * Событие удаления файла
 */
export interface FileRemoveEvent {
  /** Удаляемый файл */
  file: File | FileUploadItem;
  /** Индекс файла в массиве */
  index: number;
  /** Исходное событие */
  event: Event;
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnChanges {
  @Input() variant: FileUploadVariant = 'upload-field';
  @Input() files: FileUploadItem[] = [];
  @Input() multiple: boolean = true;
  @Input() auto: boolean = false; // ← ИЗМЕНЕНО НА false ПО УМОЛЧАНИЮ
  @Input() hasRemove: boolean = true;
  @Input() maxFileSize: number = 10485760;
  @Input() maxFileSizeText: string = 'Не более 10MB';
  @Input() uploadHintText: string = 'Перетащите файл или нажмите для загрузки';
  @Input() chooseLabel: string = 'Выбрать файл';
  @Input() chooseIcon: string = 'icon-paperclip';
  @Input() chooseButtonClass: string = '';
  @Input() dialogButtonLabel: string = 'Загрузить файлы';
  @Input() dialogHeader: string = 'Загрузка файлов';
  @Input() removeIcon: string = 'icon-delete';

  @Output() onUpload = new EventEmitter<FileUploadEvent>();
  @Output() onRemove = new EventEmitter<FileRemoveEvent>();

  internalFiles: File[] = [];
  displayDialog: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('🔄 [FileUpload] ngOnChanges вызван:', changes);

    if (changes['files']) {
      console.log('📋 [FileUpload] Изменение files:', {
        previous: changes['files'].previousValue,
        current: changes['files'].currentValue,
        firstChange: changes['files'].firstChange,
      });
      this.convertToFileObjects();
      this.cdr.markForCheck();
    }
  }

  /**
   * Конвертация FileUploadItem[] в File[] для PrimeNG
   */
  private convertToFileObjects(): void {
    console.log('🔄 [FileUpload] convertToFileObjects вызван');
    console.log('📊 [FileUpload] Текущий variant:', this.variant);
    console.log('📋 [FileUpload] Текущие files:', this.files);

    if (this.variant === 'file-list') {
      console.log(
        'ℹ️ [FileUpload] variant === "file-list", очищаем internalFiles'
      );
      this.internalFiles = [];
      return;
    }

    this.internalFiles = this.files.map((item) => {
      console.log('🔄 [FileUpload] Конвертация файла:', item.name);
      const blob = new Blob([item.name], {
        type: item.type || 'application/octet-stream',
      });
      const file = new File([blob], item.name, {
        type: item.type || 'application/octet-stream',
        lastModified: Date.now(),
      });
      (file as any).objectURL = URL.createObjectURL(blob);
      console.log('✅ [FileUpload] Файл сконвертирован:', file);
      return file;
    });

    console.log(
      '📦 [FileUpload] internalFiles после конвертации:',
      this.internalFiles
    );
  }

  /**
   * Обработка события ВЫБОРА файлов (onSelect)
   */
  handleFileSelect(event: any): void {
    console.log('📤 [FileUpload] handleFileSelect вызван');
    console.log('📦 [FileUpload] Событие выбора:', event);
    console.log('📁 [FileUpload] Файлы из события:', event.files);
    console.log('📁 [FileUpload] Текущие файлы:', event.currentFiles);

    const uploadEvent: FileUploadEvent = {
      files: event.files || event.currentFiles || [],
      originalEvent: event.originalEvent || event,
    };

    console.log('🚀 [FileUpload] Отправка события onUpload:', uploadEvent);
    this.onUpload.emit(uploadEvent);
    console.log('✅ [FileUpload] Событие onUpload отправлено');
  }

  /**
   * Обработка события загрузки файлов (если используется auto mode)
   */
  handleUploadChunked(event: any): void {
    console.log('📤 [FileUpload] handleUploadChunked вызван');
    console.log('📦 [FileUpload] Событие загрузки:', event);
    console.log('📁 [FileUpload] Файлы из события:', event.files);

    const uploadEvent: FileUploadEvent = {
      files: event.files || [],
      originalEvent: event.originalEvent || event,
    };

    console.log('🚀 [FileUpload] Отправка события onUpload:', uploadEvent);
    this.onUpload.emit(uploadEvent);
    console.log('✅ [FileUpload] Событие onUpload отправлено');
  }

  /**
   * Обработка удаления файла (из PrimeNG)
   */
  handleFileRemove(event: any, index: number): void {
    console.log('🗑️ [FileUpload] handleFileRemove вызван');
    console.log('📦 [FileUpload] Событие:', event);
    console.log('🔢 [FileUpload] Индекс:', index);

    const removeEvent: FileRemoveEvent = {
      file: this.files[index],
      index,
      event: event.originalEvent || event,
    };

    console.log('🚀 [FileUpload] Отправка события onRemove:', removeEvent);
    this.onRemove.emit(removeEvent);
    console.log('✅ [FileUpload] Событие onRemove отправлено');
  }

  /**
   * Обработчик удаления файла из списка
   */
  onRemoveFile(event: Event, index: number): void {
    console.log('🗑️ [FileUpload] onRemoveFile вызван');
    console.log('📦 [FileUpload] Event:', event);
    console.log('🔢 [FileUpload] Индекс:', index);

    event.preventDefault();
    event.stopPropagation();

    const removeEvent: FileRemoveEvent = {
      file: this.files[index],
      index,
      event,
    };

    console.log('🚀 [FileUpload] Отправка события onRemove:', removeEvent);
    this.onRemove.emit(removeEvent);
    console.log('✅ [FileUpload] Событие onRemove отправлено');
  }

  /**
   * Открытие диалогового окна
   */
  openDialog(): void {
    console.log('🔓 [FileUpload] Открытие диалога');
    this.displayDialog = true;
    this.cdr.markForCheck();
  }

  /**
   * Закрытие диалогового окна
   */
  closeDialog(): void {
    console.log('🔒 [FileUpload] Закрытие диалога');
    this.displayDialog = false;
    this.cdr.markForCheck();
  }

  /**
   * TrackBy функция для списка файлов
   */
  trackByFile(index: number, item: FileUploadItem): string | number {
    return item.id || item.name || index;
  }

  /**
   * Получение URL файла для скачивания
   */
  getFileUrl(file: FileUploadItem): string {
    return file.url || file.id || '#';
  }

  /**
   * Получение имени файла без расширения
   */
  getFileName(fullName: string): string {
    const lastDotIndex = fullName.lastIndexOf('.');
    return lastDotIndex > 0 ? fullName.substring(0, lastDotIndex) : fullName;
  }

  /**
   * Получение расширения файла
   */
  getFileExtension(fullName: string): string {
    const lastDotIndex = fullName.lastIndexOf('.');
    return lastDotIndex > 0
      ? fullName.substring(lastDotIndex + 1).toLowerCase()
      : '';
  }

  /**
   * Получение CSS класса для иконки файла
   */
  /**
   * Получение CSS класса для иконки файла
   */
  getFileIconClass(fileName: string): string {
    const ext = this.getFileExtension(fileName);

    // Карта расширений файлов к классам иконок из icomoon
    const extMap: Record<string, string> = {
      // Документы
      pdf: 'icon-type-pdf',
      doc: 'icon-type-doc',
      docx: 'icon-type-doc',
      txt: 'icon-type-txt',
      rtf: 'icon-type-rtf',

      // Таблицы
      xls: 'icon-type-xls',
      xlsx: 'icon-type-xls',
      csv: 'icon-type-csv',
      ods: 'icon-type-ods',

      // Презентации
      ppt: 'icon-type-ppt',
      pptx: 'icon-type-ppt',
      pps: 'icon-type-pps',
      key: 'icon-type-key',

      // Изображения
      jpg: 'icon-type-jpg',
      jpeg: 'icon-type-jpg',
      png: 'icon-type-png',
      gif: 'icon-type-gif',
      bmp: 'icon-type-bmp',
      tif: 'icon-type-tif',
      tiff: 'icon-type-tif',
      pcx: 'icon-type-pcx',

      // Архивы
      zip: 'icon-type-zip',
      rar: 'icon-type-rar',

      // Видео
      avi: 'icon-type-avi',
      mp4: 'icon-type-mp4',
      flv: 'icon-type-flv',
      mkv: 'icon-type-mkv',
      mov: 'icon-type-mov',
      mpg: 'icon-type-mpg',
      mpeg: 'icon-type-mpg',

      // Другое
      fnc: 'icon-type-fnc',
    };

    return extMap[ext] || 'icon-paperclip'; // По умолчанию - скрепка
  }

  get isUploadField(): boolean {
    return this.variant === 'upload-field';
  }

  get isFileList(): boolean {
    return this.variant === 'file-list';
  }

  get isButtonWithDialog(): boolean {
    return this.variant === 'button-with-dialog';
  }
}
