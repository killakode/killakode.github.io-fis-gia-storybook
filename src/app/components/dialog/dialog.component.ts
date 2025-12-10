import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

export type DialogType = 'standard' | 'confirm';
export type DialogSize = 'default' | 'big' | 'fullwidth';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent {
  /** Тип диалога */
  @Input() type: DialogType = 'standard';

  /** Размер диалога */
  @Input() size: DialogSize = 'default';

  /** Заголовок */
  @Input() header: string = 'Заголовок диалога';

  /** Показать заголовок */
  @Input() showHeader: boolean = true;

  /** Видимость диалога */
  @Input() visible: boolean = false;

  /** Можно ли закрыть */
  @Input() closable: boolean = true;

  /** Контент диалога */
  @Input() content: string = 'Содержимое диалога';

  /** Показать футер */
  @Input() showFooter: boolean = true;

  /** Текст кнопки подтверждения */
  @Input() acceptLabel: string = 'Подтвердить';

  /** Текст кнопки отмены */
  @Input() rejectLabel: string = 'Отменить';

  /** Иконка для confirm диалога */
  @Input() confirmIcon: string = 'pi pi-exclamation-triangle';

  /** Селектор контейнера для appendTo */
  @Input() appendTo: string = 'body';

  constructor(private confirmationService: ConfirmationService) {}

  /** Получить класс размера */
  get sizeClass(): string {
    const sizeMap: Record<DialogSize, string> = {
      default: 'popup',
      big: 'popup popup--big',
      fullwidth: 'popup popup--fullwidth',
    };
    return sizeMap[this.size];
  }

  /** Получить уникальный key для confirm диалога */
  get confirmKey(): string {
    return this.appendTo === 'body' ? 'global' : this.appendTo;
  }

  /** Открыть стандартный диалог */
  openStandardDialog(): void {
    this.visible = true;
  }

  /** Открыть confirm диалог */
  openConfirmDialog(): void {
    this.confirmationService.confirm({
      message: this.content,
      header: this.header,
      icon: this.confirmIcon,
      acceptLabel: this.acceptLabel,
      rejectLabel: this.rejectLabel,
      // Severity для кнопок
      acceptButtonStyleClass: 'p-button-primary blue-button',
      rejectButtonStyleClass: 'p-button-secondary white-button',
      // Можно также использовать встроенные severity
      // rejectButtonStyleClass: 'p-button-outlined',
      key: this.confirmKey,
      accept: () => {
        this.handleAccept();
      },
      reject: () => {
        this.handleReject();
      },
    });
  }

  /** Закрыть диалог */
  closeDialog(): void {
    this.visible = false;
    // this.onHide.emit();
  }

  /** Обработка подтверждения */
  handleAccept(): void {
    // this.onAccept.emit();
    this.closeDialog();
  }

  /** Обработка отмены */
  handleReject(): void {
    // this.onReject.emit();
    this.closeDialog();
  }
}
