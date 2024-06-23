import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Map.module.scss';

import LocationIcon from '@/images/icon/icon_Location.svg';
import Button from '@/components/Button/Button';
import ControlTimeBtn from '@/components/btns/ControlTimeBtn/ControlTimeBtn';
import KakaoMap from './components/KakaoMap';

import ReSettingMapBounds from './hooks/ResettingMapBounds';
import useKakaoAPI from '@/hooks/useKakaoAPI';

const cn = classNames.bind(styles);

interface MapProps {
  address: string;
}

export default function Map({ address }: MapProps) {
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const { loading, error, location, draggable, setDraggable } = useKakaoAPI(address);

  const { handleReset } = ReSettingMapBounds({ location, mapRef });

  const zoomIn = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() + 1);
  };

  if (loading) return <div className={cn('container')}>지도 로딩중...</div>;

  if (error) return <div className={cn('container')}>지도 로딩 실패</div>;

  return (
    <div className={cn('container')}>
      <div className={cn('mapContent')}>
        {location && <KakaoMap location={location} draggable={draggable} mapRef={mapRef} />}
        <div className={cn('buttons')}>
          <Button className={cn('button')} type="primary" size="small" onClick={handleReset}>
            위치 초기화
          </Button>
          <Button
            className={cn('button')}
            type="secondary"
            size="small"
            onClick={() => setDraggable((prev: boolean) => !prev)}
          >
            드래그 토글
          </Button>
        </div>
        <div className={cn('zoomController')}>
          <ControlTimeBtn type="plus" onClick={zoomIn} />
          <ControlTimeBtn type="minus" onClick={zoomOut} />
        </div>
      </div>
      <div className={cn('address')}>
        <LocationIcon width="1.8rem" height="1.8rem" viewBox="-3 -1 18 18" />
        {address}
      </div>
    </div>
  );
}
