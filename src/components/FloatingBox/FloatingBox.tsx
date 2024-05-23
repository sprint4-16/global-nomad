import classNames from 'classnames/bind';
import styles from './FloatingBox.module.scss';
import Stroke from '@/images/icon/icon_stroke.svg';
import DateInfo from './DateInfo';
import HeadCountInfo from './HeadCountInfo';
import PriceInfo from './PriceInfo';
import Button from '@/components/Button/Button';
import { useState } from 'react';
import { FloatingBoxProps } from './FloatingBoxType';
import { priceDataForm } from './priceDataForm';

const cn = classNames.bind(styles);

export default function FloatingBox({ price }: FloatingBoxProps) {
  const [count, setCount] = useState<number>(1);
  return (
    <div className={cn('container')}>
      <div className={cn('price')}>
        {priceDataForm(price, 1)}
        <span className={cn('per')}>/ 인</span>
      </div>
      <Stroke width={336} className={cn('stroke')} />
      <DateInfo />
      <HeadCountInfo count={count} setCount={setCount} />
      <Button type="primary" size="large">
        예약하기
      </Button>
      <Stroke width={336} className={cn('stroke')} />
      <PriceInfo price={price} count={count} />
    </div>
  );
}
