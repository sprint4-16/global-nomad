import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
  //   args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: '로그인하기',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: '로그인하기',
  },
};

export const Large: Story = {
  args: {
    type: 'disabled',
    children: '로그인하기',
  },
};
