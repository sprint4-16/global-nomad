// MyProfile.ts 파일에서 수정

import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstanceToken } from '../axiosInstance';
import { END_POINT } from '@/constants/';
import useGetCookie from '@/hooks/useCookies';

export function useGetProfile() {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');
  const userId = getCookie('userId');

  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      if (!userId) throw new Error('userId is not available');
      const { data } = await axiosInstanceToken(accessToken).get(`${END_POINT.MY_RESERVATIONS}/users/me`);
      return data;
    },
  });
}

export interface usePatchProfileProps {
  nickname: string;
  newPassword: string;
  profileImageUrl: string;
}

export function usePatchProfile() {
  const { getCookie } = useGetCookie();

  return useMutation({
    mutationFn: async (bodyData: usePatchProfileProps) => {
      const accessToken = getCookie('accessToken');
      const userId = getCookie('userId');

      if (!accessToken) throw new Error('Access token is not available');
      if (!userId) throw new Error('userId is not available');
      const { data } = await axiosInstanceToken(accessToken).patch(`${END_POINT.MY_RESERVATIONS}/users/me`, bodyData);
      return data;
    },
  });
}
