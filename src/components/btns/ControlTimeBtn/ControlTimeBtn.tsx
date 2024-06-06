import AddBtnIcon from '@/images/btn/btn_add.svg';
import MinusBtnIcon from '@/images/btn/btn_minus.svg';

interface ArrowBtnProps {
  type: 'plus' | 'minus';
  size?: number;
  onClick?: () => void;
}

const render = (type: 'plus' | 'minus', size: number) => {
  if (type === 'plus') {
    return <AddBtnIcon width={size} height={size} />;
  }

  return <MinusBtnIcon width={size} height={size} />;
};

export default function ControlTimeBtn({ type, size = 56, onClick }: ArrowBtnProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };
  return <button onClick={handleClick}>{render(type, size)}</button>;
}
