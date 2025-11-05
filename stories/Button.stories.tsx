import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, CloudPlus, Settings, Trash } from 'iconsax-react';
import{AppButton} from '../core';

const meta: Meta<typeof AppButton> = {
  title: 'Components/AppButton',
  component: AppButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    props: {
      control: 'object',
      description: 'تمام props کامپوننت',
    },
  },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// استوری‌های مختلف
export const Default: Story = {
  args: {
    props: {
      content: 'دکمه پیش‌فرض',
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
    <AppButton props={{ content: 'Solid', variant: 'solid', color: 'primary' }} />
<AppButton props={{ content: 'Bordered', variant: 'bordered', color: 'primary' }} />
<AppButton props={{ content: 'Light', variant: 'light', color: 'primary' }} />
<AppButton props={{ content: 'Flat', variant: 'flat', color: 'primary' }} />
<AppButton props={{ content: 'Faded', variant: 'faded', color: 'primary' }} />
<AppButton props={{ content: 'Shadow', variant: 'shadow', color: 'primary' }} />
<AppButton props={{ content: 'Ghost', variant: 'ghost', color: 'primary' }} />
</div>
),
parameters: {
  layout: 'padded',
},
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
    <AppButton props={{ content: 'Default', color: 'default' }} />
<AppButton props={{ content: 'Primary', color: 'primary' }} />
<AppButton props={{ content: 'Secondary', color: 'secondary' }} />
<AppButton props={{ content: 'Success', color: 'success' }} />
<AppButton props={{ content: 'Warning', color: 'warning' }} />
<AppButton props={{ content: 'Danger', color: 'danger' }} />
</div>
),
parameters: {
  layout: 'padded',
},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
    <AppButton props={{ content: 'XS', size: 'xs', color: 'primary' }} />
<AppButton props={{ content: 'Small', size: 'sm', color: 'primary' }} />
<AppButton props={{ content: 'Medium', size: 'md', color: 'primary' }} />
<AppButton props={{ content: 'Large', size: 'lg', color: 'primary' }} />
<AppButton props={{ content: 'XL', size: 'xl', color: 'primary' }} />
</div>
),
parameters: {
  layout: 'padded',
},
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
    <AppButton props={{ content: 'None', radius: 'none', color: 'primary' }} />
<AppButton props={{ content: 'Small', radius: 'sm', color: 'primary' }} />
<AppButton props={{ content: 'Medium', radius: 'md', color: 'primary' }} />
<AppButton props={{ content: 'Large', radius: 'lg', color: 'primary' }} />
<AppButton props={{ content: 'XL', radius: 'xl', color: 'primary' }} />
<AppButton props={{ content: '2XL', radius: '2xl', color: 'primary' }} />
<AppButton props={{ content: 'Full', radius: 'full', color: 'primary' }} />
</div>
),
parameters: {
  layout: 'padded',
},
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
    <AppButton
      props={{
  content: 'افزودن',
    startContent: <CloudPlus size={16} />,
  color: 'success',
}}
/>
<AppButton
props={{
  content: 'حذف',
    endContent: <Trash size={16} />,
  color: 'danger',
}}
/>
<AppButton
props={{
  content: 'تأیید',
    startContent: <Check size={16} />,
  endContent: <Check size={16} />,
  color: 'primary',
}}
/>
</div>
),
parameters: {
  layout: 'padded',
},
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
    <AppButton
      props={{
  isIconOnly: true,
    startContent: <CloudPlus size={16} />,
  color: 'primary',
    radius: 'full',
}}
/>
<AppButton
props={{
  isIconOnly: true,
    startContent: <Settings size={16} />,
  color: 'secondary',
    radius: 'lg',
}}
/>
<AppButton
props={{
  isIconOnly: true,
    startContent: <Trash size={16} />,
  color: 'danger',
    variant: 'bordered',
}}
/>
</div>
),
parameters: {
  layout: 'padded',
},
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
    <AppButton
      props={{
  content: 'در حال بارگذاری',
    isSubmitting: true,
    color: 'primary',
}}
/>
<AppButton
props={{
  content: 'ذخیره',
    isSubmitting: true,
    color: 'success',
    variant: 'bordered',
}}
/>
<AppButton
props={{
  isIconOnly: true,
    isSubmitting: true,
    color: 'secondary',
}}
/>
</div>
),
parameters: {
  layout: 'padded',
},
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
    <AppButton
      props={{
  content: 'غیرفعال',
    disabled: true,
    color: 'primary',
}}
/>
<AppButton
props={{
  content: 'غیرفعال',
    disabled: true,
    variant: 'bordered',
    color: 'danger',
}}
/>
</div>
),
parameters: {
  layout: 'padded',
},
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
    <AppButton
      props={{
  content: 'دکمه تمام عرض',
    fullWidth: true,
    color: 'primary',
}}
/>
<AppButton
props={{
  content: 'ورود به حساب کاربری',
    fullWidth: true,
    color: 'success',
    size: 'lg',
}}
/>
</div>
),
parameters: {
  layout: 'padded',
},
};

// Interaction Testing با API جدید
export const WithInteractions: Story = {
  args: {
    props: {
      content: 'کلیک برای تست',
      color: 'primary',
    },
  },
};

// Playground برای تست تعاملی
export const Playground: Story = {
  args: {
    props: {
      content: 'دکمه آزمایشی',
      variant: 'solid',
      color: 'primary',
      size: 'md',
      radius: 'md',
      fullWidth: false,
      disabled: false,
      isSubmitting: false,
      isIconOnly: false,
      disableRipple: false,
    },
  },
  argTypes: {
    'props.variant': {
      control: 'select',
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'],
    },
    'props.color': {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    'props.size': {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    'props.radius': {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    'props.fullWidth': {
      control: 'boolean',
    },
    'props.disabled': {
      control: 'boolean',
    },
    'props.isSubmitting': {
      control: 'boolean',
    },
    'props.isIconOnly': {
      control: 'boolean',
    },
    'props.disableRipple': {
      control: 'boolean',
    },
  },
};
