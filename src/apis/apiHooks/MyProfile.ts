import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstanceToken } from '../axiosInstance';
import { END_POINT } from '@/constants/';
import useGetCookie from '@/hooks/useCookies';

// 로그인한 유저의 프로필 정보 가져오는 API
export function useGetProfile() {
  const { getCookie } = useGetCookie();
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzM1LCJ0ZWFtSWQiOiI0LTE2IiwiaWF0IjoxNzE3NDE0MTM1LCJleHAiOjE3MTc0MTU5MzUsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.H-8_Fx5ToIVXh0RqIN0fnYeZS8U-j6t7Xz9ZKooHvGM';

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(`${END_POINT.USERS}/me`);
      return data;
    },
  });
}

// 유저 프로필 이미지 저장
export function useUploadProfileImage() {
  const { getCookie } = useGetCookie();

  return useMutation({
    mutationFn: async (file: File) => {
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzM1LCJ0ZWFtSWQiOiI0LTE2IiwiaWF0IjoxNzE3Mzg5MTA1LCJleHAiOjE3MTczOTA5MDUsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.YH3I_rRlLusmI-epw0SYgMnKyuz2YhNaETIAp-r8xfc';

      if (!accessToken) throw new Error('Access token is not available');

      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axiosInstanceToken(accessToken).post(`${END_POINT.USERS}/me/image`, formData);

      return data.profileImageUrl;
    },
  });
}

// 유저의 프로필 정보를 수정하는 API
export interface usePatchProfileProps {
  nickname?: string;
  newPassword?: string;
  profileImageUrl?: string;
}

export function usePatchProfile() {
  const { getCookie } = useGetCookie();

  return useMutation({
    mutationFn: async (bodyData: usePatchProfileProps) => {
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzM1LCJ0ZWFtSWQiOiI0LTE2IiwiaWF0IjoxNzE3NDE0MTM1LCJleHAiOjE3MTc0MTU5MzUsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.H-8_Fx5ToIVXh0RqIN0fnYeZS8U-j6t7Xz9ZKooHvGM';

      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).patch(`${END_POINT.USERS}/me`, bodyData);
      return data;
    },
  });
}
