import type { Meta, StoryObj } from '@storybook/react';
import AddImageBtn from './AddImageBtn';
import '@/styles/reset.scss';

const meta = {
  title: 'Example/btn/AddImageBtn',
  component: AddImageBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddImageBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    onClick: () => {},
  },
};
