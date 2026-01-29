import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { TextInputComponent } from '../input/input.component';
import { FileUploadComponent } from '../fileupload/file-upload.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-gia-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, // Добавлено для поддержки ngModel
    ToastModule,
    AccordionModule,
    CardModule,
    ButtonModule,
    MultiSelectModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    CalendarModule,
    FileUploadModule,
    TextInputComponent,
    FileUploadComponent,
    CheckboxComponent,
    RadioButtonComponent,
    SelectComponent,
    DatePipe,
    JsonPipe,
  ],
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss'],
  providers: [MessageService],
})
export class GiaRegistrationFormComponent {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  activeStep = 0;
  form: FormGroup;
  uploadedFiles: any[] = [];
  selectedExams: string[] = [];
  examTypes = ['Основной', 'Резерв'];
  availableExams = [
    { label: 'Математика', value: 'math' },
    { label: 'Русский язык', value: 'russian' },
    { label: 'Физика', value: 'physics' },
    { label: 'Химия', value: 'chemistry' },
  ];

  constructor() {
    this.form = this.fb.group({
      // Шаг 1: Личные данные
      personalData: this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        birthDate: ['', Validators.required],
        agreeTerms: [false, Validators.requiredTrue],
      }),
      // Шаг 2: Документы
      documents: this.fb.array([], Validators.required),
      // Шаг 3: Выбор экзаменов
      examSelection: this.fb.group({
        examType: ['Основной', Validators.required],
        exams: [[], Validators.required],
      }),
    });
  }

  // Вспомогательные методы для доступа к вложенным группам
  get personalData() {
    return this.form.get('personalData') as FormGroup;
  }

  get examSelection() {
    return this.form.get('examSelection') as FormGroup;
  }

  // Переход к следующему шагу
  nextStep() {
    if (this.activeStep < 3) {
      this.activeStep++;
    }
  }

  // Возврат к предыдущему шагу
  prevStep() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  // Обработка загрузки файлов
  onFileUpload(event: any) {
    this.uploadedFiles = [...this.uploadedFiles, ...event.files];
    this.form.get('documents')?.setValue(this.uploadedFiles);
  }

  // Удаление файла
  onFileRemove(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.form.get('documents')?.setValue(this.uploadedFiles);
  }

  // Отправка формы
  submitForm() {
    if (this.form.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Успешно',
        detail: 'Форма отправлена!',
      });
      console.log('Form submitted:', {
        ...this.form.value,
        documents: this.uploadedFiles,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Заполните все обязательные поля!',
      });
      this.form.markAllAsTouched();
    }
  }

  // Проверка валидности текущего шага
  isCurrentStepValid(): boolean {
    switch (this.activeStep) {
      case 0:
        return this.personalData.valid;
      case 1:
        return this.form.get('documents')?.valid ?? false;
      case 2:
        return this.examSelection.valid;
      default:
        return true;
    }
  }
}
