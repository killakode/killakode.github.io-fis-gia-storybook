import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';

export interface TabItem {
  label: string;
  value: string | number;
  icon?: string;
  disabled?: boolean;
  errorCount?: number;
}

/**
 * Типы табов согласно документации:
 * - 'standard': p-tabs с styleClass="tabview" (основные табы на странице)
 * - 'select-button': p-selectButton с class="datatable-tabs" (табы внутри карточки)
 * - 'tabs-in-card': p-tabs с class="datatable-tabs" на p-tablist (табы как в карточке, в диалогах)
 */
export type TabVariant = 'standard' | 'select-button' | 'tabs-in-card';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    SelectButtonModule,
    CardModule
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnChanges {
  /**
   * Вариант отображения табов (согласно документации)
   * - 'standard': p-tabs (основные табы на странице)
   * - 'select-button': p-selectButton (табы внутри карточки)
   * - 'tabs-in-card': p-tabs (табы как в карточке, в диалогах)
   */
  @Input() variant: TabVariant = 'standard';

  /**
   * Массив табов
   */
  @Input() tabs: TabItem[] = [];

  /**
   * Активный таб (по value)
   */
  @Input() activeTab: string | number = '';

  /**
   * Событие изменения активного таба
   */
  @Output() tabChange = new EventEmitter<string | number>();

  /**
   * Показывать ли компонент внутри p-card
   * Автоматически включается, если есть errorCount в табах
   */
  @Input() showCard: boolean = false;

  /**
   * Режим "только иконки" (для tabs-in-card варианта)
   */
  @Input() iconOnly: boolean = false;

  /**
   * CSS класс для кастомизации
   */
  @Input() styleClass: string = '';

  /**
   * Внутренний вариант (может быть переопределён при iconOnly)
   */
  currentVariant: TabVariant = 'standard';

  /**
   * Нужно ли автоматически показывать карточку
   */
  shouldShowCard: boolean = false;

  /**
   * Кеш для selectButtonOptions
   */
  private _cachedSelectButtonOptions: any[] = [];
  private _lastTabsHash: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // Автоматически переключаем на tabs-in-card при включении iconOnly
    if (changes['iconOnly'] || changes['variant']) {
      this.currentVariant = this.iconOnly ? 'tabs-in-card' : this.variant;
    }

    // Автоматически включаем p-card, если есть errorCount
    if (changes['tabs'] || changes['showCard']) {
      const hasErrors = this.tabs.some(tab => tab.errorCount && tab.errorCount > 0);
      this.shouldShowCard = this.showCard || hasErrors;
    }
  }

  /**
   * Получить CSS-класс контейнера в зависимости от варианта
   */
  get containerClass(): string {
    const classes = [this.styleClass];

    switch (this.currentVariant) {
      case 'standard':
        classes.push('tabview');
        break;
      case 'select-button':
        classes.push('datatable-tabs');
        break;
      case 'tabs-in-card':
        classes.push('datatable-tabs');
        break;
    }

    return classes.filter(Boolean).join(' ');
  }

  /**
   * Опции для p-selectButton (с мемоизацией)
   */
  get selectButtonOptions() {
    const currentHash = JSON.stringify(this.tabs.map(t => ({
      label: t.label,
      value: t.value,
      icon: t.icon,
      disabled: t.disabled,
      errorCount: t.errorCount
    })));

    if (currentHash === this._lastTabsHash) {
      return this._cachedSelectButtonOptions;
    }

    this._lastTabsHash = currentHash;
    this._cachedSelectButtonOptions = this.tabs.map(tab => ({
      label: tab.label,
      value: tab.value,
      icon: tab.icon,
      disabled: tab.disabled,
      styleClass: tab.errorCount ? 'has-error' : ''
    }));

    return this._cachedSelectButtonOptions;
  }

  /**
   * Обработчик смены таба для p-tabs
   */
  onTabChange(event: any): void {
    const newValue = event.value ?? event;
    this.activeTab = newValue;
    this.tabChange.emit(newValue);
  }

  /**
   * Обработчик смены таба для p-selectButton
   */
  onSelectButtonChange(event: any): void {
    this.activeTab = event.value;
    this.tabChange.emit(event.value);
  }

  /**
   * Получить текущий активный таб
   */
  get activeTabItem(): TabItem | undefined {
    return this.tabs.find(tab => tab.value === this.activeTab);
  }

  /**
   * Получить errorCount для таба по его value (для p-selectButton)
   */
  getTabErrorCount(value: string | number): number | undefined {
    return this.tabs.find(tab => tab.value === value)?.errorCount;
  }

  /**
   * TrackBy функция для оптимизации *ngFor с табами
   */
  trackByValue(index: number, item: TabItem): string | number {
    return item.value;
  }

  /**
   * TrackBy функция для оптимизации *ngFor с опциями selectButton
   */
  trackByOptionValue(index: number, item: any): string | number {
    return item.value;
  }
}
