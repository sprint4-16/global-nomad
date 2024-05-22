import BlackLeftArrow from '../../../../public/btn/btn_black_arrow_left.svg';
import BlackRightArrow from '../../../../public/btn/btn_black_arrow_right.svg';
import GrayLeftArrow from '../../../../public/btn/btn_gray_arrow_left.svg';
import GrayRightArrow from '../../../../public/btn/btn_gray_arrow_right.svg';

interface ArrowBtnProps {
  type: 'prev' | 'next';
  isDisabled: boolean;
  size?: number;
  onClick?: () => void;
}

const render = (type: 'prev' | 'next', isDidsabled: boolean, size: number) => {
  if (type === 'prev') {
    if (isDidsabled) {
      return <GrayLeftArrow width={size} height={size} />;
    }
    return <BlackLeftArrow width={size} height={size} />;
  }
  if (isDidsabled) {
    return <GrayRightArrow width={size} height={size} />;
  }
  return <BlackRightArrow width={size} height={size} />;
};

export default function ArrowBtn({ type, isDisabled, size = 44, onClick }: ArrowBtnProps) {
  return (
    <button disabled={isDisabled} onClick={onClick}>
      {render(type, isDisabled, size)}
    </button>
  );
}
