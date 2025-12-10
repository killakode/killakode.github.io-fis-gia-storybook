import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

type ButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'danger'
  | 'warn'
  | 'help';
type IconPosition = 'left' | 'right';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() icon?: string;
  @Input() iconPos: IconPosition = 'left';
  @Input() severity?: ButtonSeverity;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() styleClass?: string;

  // Для демо-состояний в Storybook
  @Input() demoState?: 'hover' | 'active' | 'focus' | 'locked';

  @HostBinding('class')
  get hostClasses(): string {
    const classes: string[] = [];

    if (this.demoState) {
      if (this.styleClass?.includes('blue-button')) {
        classes.push(`demo-${this.demoState}-blue`);
      } else if (this.styleClass?.includes('white-button')) {
        classes.push(`demo-${this.demoState}-white`);
      } else if (this.styleClass?.includes('noborder-button')) {
        classes.push(`demo-${this.demoState}-noborder`);
      } else if (this.styleClass?.includes('link-button')) {
        classes.push(`demo-${this.demoState}-link`);
      }

      if (
        this.demoState === 'locked' ||
        this.demoState === 'hover' ||
        this.demoState === 'active' ||
        this.demoState === 'focus'
      ) {
        classes.push('demo-state-locked');
      }
    }

    return classes.join(' ');
  }
}
