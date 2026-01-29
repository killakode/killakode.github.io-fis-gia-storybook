// src/app/components/ui-kit-demo/ui-kit-demo.component.ts
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG модули
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

// Ваши кастомные компоненты
import { TextInputComponent } from '../input/input.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ButtonComponent } from '../buttons/buttons.component';

@Component({
  selector: 'app-ui-kit-demo',
  templateUrl: './ui-kit-demo.component.html',
  styleUrls: ['./ui-kit-demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule, // Для *ngIf, *ngFor
    FormsModule, // Для ngModel
    CardModule,
    RadioButtonModule,
    SelectModule,
    AccordionModule,
    ButtonModule,
    TextInputComponent, // Ваш кастомный компонент
    CheckboxComponent, // Ваш кастомный компонент
    ButtonComponent, // Ваш кастомный компонент
  ],
})
export class UiKitDemoComponent {
  @Input() userName = 'Гость';
  @Input() selectedTheme: 'light' | 'dark' | 'system' = 'light';
  @Input() showWelcomeBlock = false;
  @Input() selectedCity: string | null = null;
  @Input() showSecret = false;

  mockCities = [
    { name: 'Москва', code: 'msk' },
    { name: 'Санкт-Петербург', code: 'spb' },
    { name: 'Казань', code: 'kzn' },
  ];

  themeOptions = [
    { label: 'Светлая', value: 'light' },
    { label: 'Тёмная', value: 'dark' },
    { label: 'Системная', value: 'system' },
  ];

  getSelectedCityLabel(): string {
    return (
      this.mockCities.find((c) => c.code === this.selectedCity)?.name || ''
    );
  }

  toggleSecret(): void {
    this.showSecret = !this.showSecret;
  }
}
