import classNames from 'classnames/bind';
import styles from './FloatingBox.module.scss';
import { PriceInfoProps } from './FloatingBoxType';
import { priceDataForm } from './priceDataForm';

const cn = classNames.bind(styles);

export default function PriceInfo({ price, count }: PriceInfoProps) {
  return (
    <div className={cn('priceInfo')}>
      <div className={cn('mainText')}>총 합계</div>
      <div className={cn('mainText')}>{priceDataForm(price, count)}</div>
    </div>
  );
}
