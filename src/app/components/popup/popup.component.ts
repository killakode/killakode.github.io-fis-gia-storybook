import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

export type PopupSeverity = 'success' | 'info' | 'warn' | 'error';
export type PopupPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, ToastModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent {
  @Input() position: PopupPosition = 'top-right';
  @Input() key: string = 'popup';
  @Input() life: number = 3000;

  constructor(private messageService: MessageService) {}

  /**
   * Показать уведомление
   * ВАЖНО: life берётся из this.life, а не из параметров <p-toast>
   */
  show(severity: PopupSeverity, summary: string, detail?: string): void {
    this.messageService.add({
      key: this.key,
      severity,
      summary,
      detail,
      life: this.life === 0 ? undefined : this.life, // undefined = бесконечно в PrimeNG
      sticky: this.life === 0, // Для PrimeNG 18+
    });
  }

  showSuccess(summary: string = 'Успешно', detail?: string): void {
    this.show('success', summary, detail || 'Операция выполнена успешно');
  }

  showInfo(summary: string = 'Информация', detail?: string): void {
    this.show('info', summary, detail || 'Новое уведомление');
  }

  showWarn(summary: string = 'Внимание', detail?: string): void {
    this.show('warn', summary, detail || 'Требуется внимание');
  }

  showError(summary: string = 'Ошибка', detail?: string): void {
    this.show('error', summary, detail || 'Произошла ошибка');
  }

  clear(): void {
    this.messageService.clear(this.key);
  }
}
