import type { Meta, StoryObj } from '@storybook/react';
import NotificationBtn from './Notification';
import '@/styles/reset.scss';

const meta = {
  title: 'Project/btn/NotificationBtn',
  component: NotificationBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    onClick: () => {},
  },
};
