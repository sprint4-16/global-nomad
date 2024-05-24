import type { Meta, StoryObj } from '@storybook/react';
import ReservationDatePickPopover from './ReservationDatePickPopover';
import '@/styles/reset.scss';

const meta = {
  title: 'Example/popover/ReservationDatePickPopover',
  component: ReservationDatePickPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReservationDatePickPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {},
};
