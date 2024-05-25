import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import '@/styles/reset.scss';

const meta = {
  title: 'Project/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: '로그인 하기',
    size: 'full',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: '로그인 하기',
    size: 'large',
  },
};

export const Large: Story = {
  args: {
    type: 'disabled',
    children: '로그인 하기',
    size: 'large',
  },
};
