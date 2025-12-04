// select.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, SelectOption } from '../app/components/select/select.component';

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    showClear: { control: 'boolean' },
    filter: { control: 'boolean' },
    invalid: { control: 'boolean' },
    maxWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

const defaultOptions: SelectOption[] = [
  { label: 'Вариант 1', value: 1 },
  { label: 'Вариант 2', value: 2 },
  { label: 'Вариант 3', value: 3 },
  { label: 'Длинный текст варианта который переносится на несколько строк', value: 4 },
  { label: 'Вариант 5', value: 5, disabled: true },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
  },
};

export const WithClear: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    showClear: true,
  },
};

export const WithFilter: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    filter: true,
  },
};

export const Invalid: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите значение',
    disabled: true,
  },
};
