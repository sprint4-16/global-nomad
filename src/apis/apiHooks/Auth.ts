import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import { END_POINT } from '@/constants/';

import useGetCookie from '@/hooks/useCookies';

// 1. 로그인
export interface useLoginParams {
  email: string;
  password: string;
}

export function useLogin({ onSuccess }: { onSuccess: () => void }) {
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
      if (data.user.profileImageUrl !== null) updateCookie('profileImageUrl', data.user.profileImageUrl);
      onSuccess();
    },
  });
}

// 2. 회원가입
export interface useSignupParams extends useLoginParams {
  nickname: string;
}

export function useSignup({ onSuccess }: { onSuccess: () => void }) {
  return useMutation({
    mutationFn: async (bodyData: useSignupParams) => {
      return axiosInstance.post(END_POINT.USERS, bodyData);
    },
    onSuccess: () => {
      onSuccess();
    },
  });
}
