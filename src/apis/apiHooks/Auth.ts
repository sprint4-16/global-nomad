import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import { END_POINT } from '@/constants/';
import { useLoginParams } from './apiTypes';

import useGetCookie from '@/hooks/useCookies';

export default function useLogin() {
  const { updateCookie } = useGetCookie();
  return useMutation({
    mutationFn: async (bodyData: useLoginParams) => {
      const { data } = await axiosInstance.post(END_POINT.LOGIN, bodyData);
      return data;
    },
    onSuccess: (data) => {
      updateCookie('accessToken', data.accessToken);
      updateCookie('refreshToken', data.refreshToken);
      updateCookie('nickname', data.user.nickname);
      updateCookie('profileImageUrl', data.user.profileImageUrl);
    },
  });
}
