import classNames from 'classnames/bind';
import styles from './KakaoMap.module.scss';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';

import LocationIconWhite from '@/images/icon/icon_location_white.svg';

const cn = classNames.bind(styles);

interface KakaoMapProps {
  location: { lat: number; lng: number };
  draggable: boolean;
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
}

export default function KakaoMap({ location, draggable, mapRef }: KakaoMapProps) {
  return (
    <Map
      center={location}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={3}
      draggable={draggable}
      ref={mapRef}
    >
      <CustomOverlayMap position={location}>
        <div className={cn('marker')}>
          <div className={cn('iconBox')}>
            <LocationIconWhite width="1.8rem" height="1.8rem" viewBox="-3 -1 18 18" />
          </div>
          <div className={cn('text')}>place</div>
        </div>
      </CustomOverlayMap>
    </Map>
  );
}
