import { useMutation } from '@tanstack/react-query';
import { axiosInstanceToken } from '../axiosInstance';
import { END_POINT } from '@/constants/';
import useGetCookie from '@/hooks/useCookies';

// 내 체험 등록
interface FormData {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: { date: string; startTime: string; endTime: string }[];
  bannerImageUrl: string | null;
  subImageUrls: string[];
}

export function usePostActivity() {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useMutation({
    mutationFn: async (submitData: FormData) => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).post(`${END_POINT.ACTIVITIES}`, submitData);
      return data;
    },
    onError: (err: Error) => {
      console.error('체험 등록 중 에러 발생:', err);
      alert('체험 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });
}

// 체험 이미지 등록
export function useUploadActivityImage() {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useMutation({
    mutationKey: ['uploadActivityImage'],
    mutationFn: async ({ file, type }: { file: File; type: 'banner' | 'intro' }) => {
      if (!accessToken) throw new Error('Access token is not available');

      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axiosInstanceToken(accessToken).post(`${END_POINT.ACTIVITIES}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (type === 'banner') {
        localStorage.setItem('bannerImageUrl', data.activityImageUrl);
      } else {
        const existingIntroImages = JSON.parse(localStorage.getItem('subImageUrls') || '[]');
        existingIntroImages.push(data.activityImageUrl);
        localStorage.setItem('subImageUrls', JSON.stringify(existingIntroImages));
      }

      return data.activityImageUrl;
    },
    onError: (err: Error) => {
      console.error('이미지 업로드 중 에러 발생:', err);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    },
  });
}

// 내 체험 수정
interface UseEditActivityParams {
  activityId: string;
}

export function useEditActivity({ activityId }: UseEditActivityParams) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useMutation({
    mutationFn: async (submitData: FormData) => {
      if (!accessToken) throw new Error('Access token is not available');
      if (!activityId) throw new Error('activityId is not available');
      const { data } = await axiosInstanceToken(accessToken).patch(
        `${END_POINT.MY_ACTIVITIES}/${activityId}`,
        submitData,
      );
      return data;
    },
    onError: (err: Error) => {
      console.error('체험 수정 중 에러 발생:', err);
      alert('체험 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
}
