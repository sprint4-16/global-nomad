import type { Meta, StoryObj } from '@storybook/react';
import DeleteBtn from './DeleteBtn';
import '@/styles/reset.scss';

const meta = {
  title: 'Example/btn/DeleteBtn',
  component: DeleteBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeleteBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    onClick: () => {},
  },
};
