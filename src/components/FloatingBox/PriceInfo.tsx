import classNames from 'classnames/bind';

import { priceDataForm } from './priceDataForm';
import styles from './FloatingBox.module.scss';

const cn = classNames.bind(styles);

interface PriceInfoProps {
  price: number;
  count: number;
}
export default function PriceInfo({ price, count }: PriceInfoProps) {
  return (
    <div className={cn('priceInfo')}>
      <div className={cn('totaltext')}>총 합계</div>
      <div className={cn('totalPrice')}>{priceDataForm(price, count)}</div>
      <span>&nbsp;/</span>
    </div>
  );
}
