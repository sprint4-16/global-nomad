import CloseBtnIcon from '@/images/btn/btn_X.svg';

interface CloseBtnProps {
  onClick?: () => void;
  size?: number;
}

export default function CloseBtn({ onClick, size = 40 }: CloseBtnProps) {
  return (
    <button onClick={onClick}>
      <CloseBtnIcon width={size} height={size} />
    </button>
  );
}
