import type { Meta, StoryObj } from '@storybook/react';
import CloseBtn from './CloseBtn';
import '@/styles/reset.scss';

const meta = {
  title: 'Example/btn/CloseBtn',
  component: CloseBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CloseBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    onClick: () => {},
  },
};
