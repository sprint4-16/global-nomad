import type { Meta, StoryObj } from '@storybook/react';
import ArrowBtn from './ArrowBtn';
import '@/styles/reset.scss';

const meta = {
  title: 'Example/btn',
  component: ArrowBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Prev: Story = {
  args: {
    type: 'prev',
    isDisabled: true,
  },
};

export const Next: Story = {
  args: {
    type: 'next',
    isDisabled: true,
  },
};
