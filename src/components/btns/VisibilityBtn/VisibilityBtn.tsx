import EyeOnIcon from '@/images/btn/btn_eye_on.svg';
import EyeOffIcon from '@/images/btn/btn_eye_off.svg';
import { useState } from 'react';

interface VisibilityBtnProps {
  type: 'on' | 'off';
  size?: number;
  onClickOpenedEye?: () => void;
  onClickClosedEye?: () => void;
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
}: VisibilityBtnProps) {
  const [toggleType, setToggleType] = useState<'on' | 'off'>(type);
  return (
    <button
      onClick={() => {
        if (toggleType === 'on') {
          setToggleType('off');
          onClickOpenedEye && onClickOpenedEye();
        } else {
          setToggleType('on');
          onClickClosedEye && onClickClosedEye();
        }
      }}
    >
      {render(toggleType, size)}
    </button>
  );
}