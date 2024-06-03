import { useState, useEffect } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export default function useKakaoAPI(address: string) {
  const [loading, error] = useKakaoLoader({
    appkey: `${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
    libraries: ['services', 'clusterer'],
  });

  const [draggable, setDraggable] = useState<boolean>(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (loading) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(address, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (data.length > 0) {
          setLocation({
            lat: Number(data[0].y),
            lng: Number(data[0].x),
          });
        }
      }
    });
  }, [address, loading]);

  return {
    loading,
    error,
    location,
    draggable,
    setDraggable,
  };
}
