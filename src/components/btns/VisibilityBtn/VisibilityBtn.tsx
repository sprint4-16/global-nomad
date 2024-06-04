import EyeOnIcon from '@/images/btn/btn_eye_on.svg';
import EyeOffIcon from '@/images/btn/btn_eye_off.svg';
import { CSSProperties, useState } from 'react';

interface VisibilityBtnProps {
  type: 'on' | 'off';
  size?: number;
  onClickOpenedEye?: () => void;
  onClickClosedEye?: () => void;
  sx?: CSSProperties;
}

const render = (type: 'on' | 'off', size: number) => {
  if (type === 'on') {
    return <EyeOnIcon width={size} height={size} />;
  }
  return <EyeOffIcon width={size} height={size} />;
};

export default function VisibilityBtn({
  type = 'on',
  size = 24,
  onClickOpenedEye,
  onClickClosedEye,
  sx,
}: VisibilityBtnProps) {
  const [toggleType, setToggleType] = useState<'on' | 'off'>(type);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (toggleType === 'on') {
      setToggleType('off');
      onClickOpenedEye && onClickOpenedEye();
    } else {
      setToggleType('on');
      onClickClosedEye && onClickClosedEye();
    }
  };

  return (
    <button onClick={handleClick} style={sx}>
      {render(toggleType, size)}
    </button>
  );
}
