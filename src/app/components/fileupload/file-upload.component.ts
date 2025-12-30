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
import { CardModule } from 'primeng/card';

export interface FileUploadItem {
  id?: string;
  name: string;
  size?: number;
  type?: string;
  url?: string;
}

export type FileUploadVariant =
  | 'upload-field'
  | 'file-list'
  | 'button-with-dialog';

export interface FileUploadEvent {
  files: File[];
  originalEvent: Event;
}

export interface FileRemoveEvent {
  file: File | FileUploadItem;
  index: number;
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
    CardModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnChanges {
  @Input() variant: FileUploadVariant = 'upload-field';
  @Input() files: FileUploadItem[] = [];
  @Input() multiple: boolean = true;
  @Input() auto: boolean = false;
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
    if (changes['files']) {
      this.convertToFileObjects();
      this.cdr.markForCheck();
    }
  }

  private convertToFileObjects(): void {
    if (this.variant === 'file-list') {
      this.internalFiles = [];
      return;
    }

    this.internalFiles = this.files.map((item) => {
      const blob = new Blob([item.name], {
        type: item.type || 'application/octet-stream',
      });
      const file = new File([blob], item.name, {
        type: item.type || 'application/octet-stream',
        lastModified: Date.now(),
      });
      (file as any).objectURL = URL.createObjectURL(blob);
      return file;
    });
  }

  handleFileSelect(event: any): void {
    const uploadEvent: FileUploadEvent = {
      files: event.files || event.currentFiles || [],
      originalEvent: event.originalEvent || event,
    };
    this.onUpload.emit(uploadEvent);
  }

  handleFileRemove(event: any, index: number): void {
    const removeEvent: FileRemoveEvent = {
      file: this.files[index],
      index,
      event: event.originalEvent || event,
    };
    this.onRemove.emit(removeEvent);
  }

  onRemoveFile(event: Event, index: number): void {
    event.preventDefault();
    event.stopPropagation();

    const removeEvent: FileRemoveEvent = {
      file: this.files[index],
      index,
      event,
    };
    this.onRemove.emit(removeEvent);
  }

  openDialog(): void {
    this.displayDialog = true;
    this.cdr.markForCheck();
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.cdr.markForCheck();
  }

  trackByFile(index: number, item: FileUploadItem): string | number {
    return item.id || item.name || index;
  }

  getFileUrl(file: FileUploadItem): string {
    return file.url || file.id || '#';
  }

  getFileName(fullName: string): string {
    const lastDotIndex = fullName.lastIndexOf('.');
    return lastDotIndex > 0 ? fullName.substring(0, lastDotIndex) : fullName;
  }

  getFileExtension(fullName: string): string {
    const lastDotIndex = fullName.lastIndexOf('.');
    return lastDotIndex > 0
      ? fullName.substring(lastDotIndex + 1).toLowerCase()
      : '';
  }

  getFileIconClass(fileName: string): string {
    const ext = this.getFileExtension(fileName);
    const extMap: Record<string, string> = {
      pdf: 'icon-type-pdf',
      doc: 'icon-type-doc',
      docx: 'icon-type-doc',
      txt: 'icon-type-txt',
      rtf: 'icon-type-rtf',
      xls: 'icon-type-xls',
      xlsx: 'icon-type-xls',
      csv: 'icon-type-csv',
      ods: 'icon-type-ods',
      ppt: 'icon-type-ppt',
      pptx: 'icon-type-ppt',
      pps: 'icon-type-pps',
      key: 'icon-type-key',
      jpg: 'icon-type-jpg',
      jpeg: 'icon-type-jpg',
      png: 'icon-type-png',
      gif: 'icon-type-gif',
      bmp: 'icon-type-bmp',
      tif: 'icon-type-tif',
      tiff: 'icon-type-tif',
      pcx: 'icon-type-pcx',
      zip: 'icon-type-zip',
      rar: 'icon-type-rar',
      avi: 'icon-type-avi',
      mp4: 'icon-type-mp4',
      flv: 'icon-type-flv',
      mkv: 'icon-type-mkv',
      mov: 'icon-type-mov',
      mpg: 'icon-type-mpg',
      mpeg: 'icon-type-mpg',
      fnc: 'icon-type-fnc',
    };
    return extMap[ext] || 'icon-paperclip';
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
