import {
  Component,
  Input,
  forwardRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  inject,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  FormArray,
  FormControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TooltipModule } from 'primeng/tooltip';
import { TextareaModule } from 'primeng/textarea';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PrimeTemplate } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import localeRu from '@angular/common/locales/ru';

export type TextInputVariant =
  | 'input'
  | 'inputnumber'
  | 'gar-address'
  | 'phone-multi'
  | 'textarea'
  | 'datepicker';

export interface GarAddressMock {
  garId: number;
  fullName: string;
}

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    MessageModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    InputNumberModule,
    DatePickerModule,
    TooltipModule,
    TextareaModule,
    ChipModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    PrimeTemplate,
    InputMaskModule,
    AutoCompleteModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent
  implements ControlValueAccessor, OnChanges, OnInit
{
  private _fb = inject(FormBuilder);
  private _cdr = inject(ChangeDetectorRef);

  @Input() variant: TextInputVariant = 'input';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() invalid: boolean = false;
  @Input() errorMessage: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() inputId: string = `text-input-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @Input() showTooltip: boolean = true;
  @Input() type: string = 'text';
  @Input() showIcon: boolean = false;
  @Input() useGrouping: boolean = true;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step: number = 1;
  @Input() rows: number = 2;
  @Input() maxlength: number = 255;
  @Input() autoResize: boolean = true;
  @Input() showCharCount: boolean = false;
  @Input() maxDate?: Date;
  @Input() minDate?: Date;
  @Input() readonlyInput: boolean = false;
  @Input() showOnFocus: boolean = true;
  @Input() showCalendarIcon: boolean = true;
  @Input() showCard: boolean = true;
  @Input() customClass: string = '';
  @Input() maxPhones: number = 3;
  @Input() phoneMask: string = '+7(999)999-99-99';
  @Input() phonePlaceholder: string = '+7(___)___-__-__';

  value: any = '';
  phones: string[] = [];
  addressValue: GarAddressMock | null = null;
  addressSuggestions: GarAddressMock[] = [];
  phoneFormGroup: FormGroup;

  // Локализация для календаря
  ruLocale = {
    firstDayOfWeek: 1,
    dayNames: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthNamesShort: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
    today: 'Сегодня',
    clear: 'Очистить',
  };

  private mockAddresses: GarAddressMock[] = [
    { garId: 1, fullName: 'г Москва, ул Тверская, д 1' },
    { garId: 2, fullName: 'г Москва, пр-кт Ленинский, д 10' },
    { garId: 3, fullName: 'г Санкт-Петербург, Невский пр-кт, д 20' },
    { garId: 4, fullName: 'г Казань, ул Баумана, д 5' },
    { garId: 5, fullName: 'г Екатеринбург, ул Ленина, д 15' },
    { garId: 6, fullName: 'г Москва, ул Арбат, д 25' },
    { garId: 7, fullName: 'г Москва, Кутузовский пр-кт, д 12' },
    { garId: 8, fullName: 'г Санкт-Петербург, ул Рубинштейна, д 8' },
    { garId: 9, fullName: 'г Санкт-Петербург, Садовая ул, д 14' },
    { garId: 10, fullName: 'г Новосибирск, Красный пр-кт, д 35' },
    { garId: 11, fullName: 'г Новосибирск, ул Ленина, д 52' },
    { garId: 12, fullName: 'г Казань, ул Кремлевская, д 18' },
    { garId: 13, fullName: 'г Казань, Московская ул, д 26' },
    { garId: 14, fullName: 'г Екатеринбург, ул Вайнера, д 9' },
    { garId: 15, fullName: 'г Екатеринбург, Малышева ул, д 31' },
    { garId: 16, fullName: 'г Нижний Новгород, Большая Покровская ул, д 7' },
    { garId: 17, fullName: 'г Нижний Новгород, пр-кт Гагарина, д 23' },
    { garId: 18, fullName: 'г Самара, ул Ленинградская, д 11' },
    { garId: 19, fullName: 'г Самара, Московское шоссе, д 45' },
    { garId: 20, fullName: 'г Челябинск, ул Кирова, д 19' },
    { garId: 21, fullName: 'г Челябинск, пр-кт Ленина, д 38' },
    { garId: 22, fullName: 'г Омск, ул Ленина, д 14' },
    { garId: 23, fullName: 'г Омск, Красный путь ул, д 22' },
    { garId: 24, fullName: 'г Ростов-на-Дону, Большая Садовая ул, д 16' },
    { garId: 25, fullName: 'г Ростов-на-Дону, пр-кт Буденновский, д 29' },
    { garId: 26, fullName: 'г Уфа, ул Ленина, д 12' },
    { garId: 27, fullName: 'г Уфа, Проспект Октября, д 33' },
    { garId: 28, fullName: 'г Красноярск, пр-кт Мира, д 18' },
    { garId: 29, fullName: 'г Красноярск, ул Ленина, д 27' },
    { garId: 30, fullName: 'г Воронеж, пр-кт Революции, д 13' },
  ];

  private defaultErrorMessage: string = 'Поле заполнено некорректно';
  private phoneErrorMessage: string =
    'Неверный шаблон. Пожалуйста, проверьте ваш ввод.';

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    this.phoneFormGroup = this._fb.group({
      phoneControls: this._fb.array([]),
    });
  }

  get phoneFormArray(): FormArray {
    return this.phoneFormGroup.get('phoneControls') as FormArray;
  }

  ngOnInit(): void {

    // Добавляем первый контрол только если массив пустой
    if (this.phoneFormArray.length === 0) {
      this.phoneFormArray.push(this.createPhoneControl(''));
      this.phones = [''];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invalid'] && this.invalid) {
      this.showCard = true;
    }

    if (changes['disabled'] && this.phoneFormGroup) {
      this.updateDisabledState();
    }
  }

  get displayErrorMessage(): string {
    if (this.variant === 'phone-multi' && this.hasInvalidPhones) {
      return this.phoneErrorMessage;
    }
    return this.errorMessage || this.defaultErrorMessage;
  }

  get labelClass(): string {
    return this.required ? 'required-asterisk' : '';
  }

  get needsCardWrapper(): boolean {
    return this.showCard || this.invalid || this.hasInvalidPhones;
  }

  get canAddPhone(): boolean {
    return !this.readonly && this.phones.length < this.maxPhones;
  }

  get hasInvalidPhones(): boolean {
    if (this.variant !== 'phone-multi') {
      return false;
    }

    return this.phoneFormArray.controls.some(
      (control) => control.invalid && control.dirty
    );
  }

  get hasAnyPhoneTouched(): boolean {
    if (this.variant !== 'phone-multi') {
      return false;
    }

    return this.phoneFormArray.controls.some((control) => control.touched);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onNumberChange(value: number | null): void {
    this.value = value;
    this.onChange(value);
  }

  onDateChange(value: Date | null): void {
    this.value = value;
    this.onChange(value);
  }

  onAddressSearch(event: any): void {
    const query = event.query?.toLowerCase() || '';

    this.addressSuggestions = this.mockAddresses.filter((addr) =>
      addr.fullName.toLowerCase().includes(query)
    );
  }

  onAddressSelect(event: any): void {
    this.addressValue = event.value;
    this.onChange(event.value);
  }

  onTextareaChange(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  onClearTextarea(): void {
    this.value = '';
    this.onChange('');
  }

  addPhone(): void {
    if (this.canAddPhone) {
      this.phones.push('');
      const newControl = this.createPhoneControl('');
      if (this.disabled) {
        newControl.disable({ emitEvent: false });
      }
      this.phoneFormArray.push(newControl);
      this._cdr.markForCheck();
    }
  }

  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.splice(index, 1);
      this.phoneFormArray.removeAt(index);
      this.updatePhoneValues();
      this._cdr.markForCheck();
    }
  }

  onBlur(): void {
    this.onTouched();
    this._cdr.markForCheck();
  }

  writeValue(value: any): void {
    if (this.variant === 'phone-multi') {
      this.phoneFormArray.clear();

      if (Array.isArray(value) && value.length > 0) {
        this.phones = [...value];
        value.forEach((phone) => {
          this.phoneFormArray.push(this.createPhoneControl(phone));
        });
      } else if (value) {
        this.phones = [value];
        this.phoneFormArray.push(this.createPhoneControl(value));
      } else {
        this.phones = [''];
        this.phoneFormArray.push(this.createPhoneControl(''));
      }

      this.updateDisabledState();
    } else if (this.variant === 'gar-address') {
      this.addressValue = value || null;
    } else {
      this.value = value || '';
    }
    this._cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.updateDisabledState();
    this._cdr.markForCheck();
  }

  trackByIndex(index: number): number {
    return index;
  }

  private updateDisabledState(): void {
    if (this.variant === 'phone-multi' && this.phoneFormArray) {
      if (this.disabled) {
        this.phoneFormArray.disable({ emitEvent: false });
      } else {
        this.phoneFormArray.enable({ emitEvent: false });
      }
    }
  }

  private phoneValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value || value.trim() === '') {
        return null;
      }

      const cleanValue = value.replace(/_/g, '').replace(/\s/g, '');
      const pattern = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
      const isValid = pattern.test(cleanValue);

      return isValid ? null : { invalidPhone: true };
    };
  }

  private createPhoneControl(value: string = ''): FormControl {
    const control = this._fb.control(
      { value: value, disabled: this.disabled },
      [this.phoneValidator()]
    ) as FormControl;

    control.valueChanges.subscribe(() => {
      this.updatePhoneValues();
      this._cdr.markForCheck();
    });

    return control;
  }

  private updatePhoneValues(): void {
    this.phones = this.phoneFormArray.controls.map((c) => c.value);
    const validPhones = this.phones.filter((p) => {
      if (!p) return false;
      const cleanValue = p.replace(/_/g, '').trim();
      return cleanValue.length > 0;
    });
    this.onChange(validPhones.length > 0 ? validPhones : null);
  }

  getPhoneControl(index: number): FormControl | null {
    return (this.phoneFormArray.at(index) as FormControl) || null;
  }

  isPhoneInvalid(index: number): boolean {
    const control = this.getPhoneControl(index);
    return control ? control.invalid && control.dirty : false;
  }

  isPhoneDirty(index: number): boolean {
    const control = this.getPhoneControl(index);
    return control ? control.dirty : false;
  }

  isPhoneTouched(index: number): boolean {
    const control = this.getPhoneControl(index);
    return control ? control.touched : false;
  }

  markPhoneTouched(index: number): void {
    const control = this.getPhoneControl(index);
    if (control) {
      control.markAsTouched();
      this._cdr.markForCheck();
    }
  }
}
