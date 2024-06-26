import classNames from 'classnames/bind';
import styles from './DexcriptionSection.module.scss';

import Map from '@/components/Map/Map';

const cn = classNames.bind(styles);

interface DesctiptionSectionProps {
  description: string;
  address: string;
}

export default function DesctiptionSection({ description, address }: DesctiptionSectionProps) {
  return (
    <>
      <div className={cn('descriptionContainer')}>
        <h3 className={cn('subTitle')}>체험 설명</h3>
        <p className={cn('activityDescription')}>{description}</p>
      </div>
      <div className={cn('mapContainer')}>{address && <Map address={address} />}</div>
    </>
  );
}
