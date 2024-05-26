import NotificationBtnIcon from '@/images/btn/btn_notification.svg';

interface NotificationProps {
  onClick?: () => void;
  size?: number;
}

export default function NotificationBtn({ onClick, size = 24 }: NotificationProps) {
  return (
    <button onClick={onClick}>
      <NotificationBtnIcon width={size} height={size} />
    </button>
  );
}
