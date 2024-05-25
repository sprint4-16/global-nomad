import classNames from 'classnames/bind';
import Subtract from '@/images/icon/icon_subtract.svg';
import Add from '@/images/icon/icon_add.svg';

import styles from './FloatingBox.module.scss';

const cn = classNames.bind(styles);

interface HeadCountInfoProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
export default function HeadCountInfo({ count, setCount }: HeadCountInfoProps) {
  const handleMinusClick = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };
  const handlePlusClick = () => {
    setCount(count + 1);
  };
  return (
    <div className={cn('headCountInfo')}>
      <div className={cn('mainText')}>참여 인원 수</div>
      <div className={cn('countBox')}>
        <Subtract className={cn('minus')} onClick={handleMinusClick} />
        <div className={cn('number')}>
          <span>총&nbsp;</span>
          {count}
          <span>인</span>
        </div>
        <Add className={cn('plus')} onClick={handlePlusClick} />
      </div>
    </div>
  );
}
