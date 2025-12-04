import { Component, Input, HostBinding } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'warn' | 'help';
type ButtonVariant = 'default' | 'link' | 'noborder' | 'chevron';
type IconPosition = 'left' | 'right';
type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'focus-active';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() icon?: string;
  @Input() iconPos: IconPosition = 'left';
  @Input() severity: ButtonSeverity = 'primary';
  @Input() outlined = false;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() variant: ButtonVariant = 'default';
  @Input() state: ButtonState = 'default';

  // Добавляем класс на :host для управления состоянием
  @HostBinding('class')
  get hostClasses(): string {
    return this.state !== 'default' ? `force-state-${this.state}` : '';
  }

  get buttonClass(): string {
    const classes: string[] = [];

    // Базовые стили по severity
    if (this.severity === 'primary' && this.variant === 'default') {
      classes.push('blue-button');
    }
    if (this.severity === 'secondary' && this.variant === 'default') {
      classes.push('white-button');
    }

    // Варианты
    if (this.variant === 'link') {
      classes.push('link-button');
    }
    if (this.variant === 'noborder') {
      classes.push('noborder-button');
    }
    if (this.variant === 'chevron') {
      classes.push(
        this.severity === 'primary'
          ? 'blue-button-chevron-action'
          : 'white-button-chevron-action'
      );
    }

    return classes.join(' ');
  }
}
