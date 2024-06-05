import NotificationPopover from '@/components/Popover/NotificationPopover/NotificationPopover';

export default function Home() {
  return (
    <>
      <NotificationPopover onClose={() => console.log()} />
    </>
  );
}
