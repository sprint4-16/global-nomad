import type { Meta, StoryObj } from '@storybook/react';
import ControlTimeBtn from './ControlTimeBtn';
import '@/styles/reset.scss';

const meta = {
  title: 'Project/btn/ControlTimeBtn',
  component: ControlTimeBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ControlTimeBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    type: 'minus',
    onClick: () => {},
  },
};
