import classNames from 'classnames/bind';
import styles from './FloatingBox.module.scss';
import Subtract from '@/images/icon/icon_subtract.svg';
import Add from '@/images/icon/icon_add.svg';
import { HeadCountInfoProps } from './FloatingBoxType';

const cn = classNames.bind(styles);

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
        <div className={cn('number')}>{count}</div>
        <Add className={cn('plus')} onClick={handlePlusClick} />
      </div>
    </div>
  );
}
