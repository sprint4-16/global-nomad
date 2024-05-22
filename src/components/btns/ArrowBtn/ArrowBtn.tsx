import BlackLeftArrow from '../../../../public/btn/btn_black_arrow_left.svg';
import BlackRightArrow from '../../../../public/btn/btn_black_arrow_right.svg';
import GrayLeftArrow from '../../../../public/btn/btn_gray_arrow_left.svg';
import GrayRightArrow from '../../../../public/btn/btn_gray_arrow_right.svg';

interface ArrowBtnProps {
  type: 'prev' | 'next';
  isDisabled: boolean;
  onClick?: () => void;
}

const render = (type: 'prev' | 'next', isDidsabled: boolean) => {
  if (type === 'prev') {
    if (isDidsabled) {
      return <GrayLeftArrow />;
    }
    return <BlackLeftArrow />;
  } else {
    if (isDidsabled) {
      return <GrayRightArrow />;
    }
    return <BlackRightArrow />;
  }
};

export default function ArrowBtn({ type, isDisabled, onClick }: ArrowBtnProps) {
  return <button onClick={onClick}>{render(type, isDisabled)}</button>;
}
