import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstanceToken } from '../axiosInstance';
import { END_POINT } from '@/constants/';
import useGetCookie from '@/hooks/useCookies';

// 로그인한 유저의 프로필 정보 가져오는 API
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

interface UseUploadProfileImageProps {
  file: File;
}

export function useUploadProfileImage() {
  const { getCookie } = useGetCookie();

  return useMutation({
    mutationFn: async ({ file }: UseUploadProfileImageProps) => {
      const accessToken = getCookie('accessToken');

      if (!accessToken) throw new Error('Access token is not available');

      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axiosInstanceToken(accessToken).post(
        `${END_POINT.MY_RESERVATIONS}/users/me/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return data.profileImageUrl;
    },
  });
}

export interface usePatchProfileProps {
  nickname: string;
  newPassword: string;
  profileImageUrl: string;
}

// 유저의 프로필 정보를 수정하는 API
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
