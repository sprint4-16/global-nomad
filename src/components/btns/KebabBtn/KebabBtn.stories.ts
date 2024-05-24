import type { Meta, StoryObj } from '@storybook/react';
import KebabBtn from './KebabBtn';
import '@/styles/reset.scss';

const meta = {
  title: 'Example/btn/KebabBtn',
  component: KebabBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KebabBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    onClick: () => {},
  },
};
