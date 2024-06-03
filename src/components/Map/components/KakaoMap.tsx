import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
      <MapMarker position={location}>place</MapMarker>
    </Map>
  );
}
