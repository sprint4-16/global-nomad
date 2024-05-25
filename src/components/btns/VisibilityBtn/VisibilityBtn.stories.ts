import type { Meta, StoryObj } from '@storybook/react';
import VisibilityBtn from './VisibilityBtn';
import '@/styles/reset.scss';

const meta = {
  title: 'Project/btn/VisibilityBtn',
  component: VisibilityBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VisibilityBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    type: 'off',
  },
};
