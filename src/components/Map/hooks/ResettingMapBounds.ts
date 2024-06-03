interface ReSettingMapBoundsProps {
  location: { lat: number; lng: number } | null;
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
}
export default function ReSettingMapBounds({ location, mapRef }: ReSettingMapBoundsProps) {
  const handleReset = () => {
    if (mapRef.current && !!location) {
      mapRef.current.setCenter(new kakao.maps.LatLng(location.lat, location.lng));
    }
  };

  return { handleReset };
}
