import Button from '@/components/Button/Button';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames/bind';
import { Input } from '@/components/Input/Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetProfile, usePatchProfile, usePatchProfileProps } from '@/apis/apiHooks/MyProfile';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);

export default function MyPageForm() {
  const patchProfile = usePatchProfile();
  const { data: profileData } = useGetProfile();
  const [email, setEmail] = useState('');

  const nicknameSchema = yup.object({
    nickname: yup.string().max(10, '열 자 이하로 작성해 주세요.').required('닉네임을 입력해 주세요.'),
  });

  const passwordSchema = yup.object({
    password: yup
      .string()
      .required('8자 이상 입력해 주세요.')
      .min(8, '8자 이상 입력해 주세요.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.'),
    newPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 다시 입력해 주세요.'),
  });

  const nicknameForm = useForm({
    mode: 'onBlur',
    resolver: yupResolver(nicknameSchema),
  });

  const passwordForm = useForm({
    mode: 'onBlur',
    resolver: yupResolver(passwordSchema),
  });

  useEffect(() => {
    if (profileData) {
      nicknameForm.setValue('nickname', profileData.nickname);
      setEmail(profileData.email);
    }
  }, [profileData, nicknameForm.setValue]);

  const onSubmit = (data: any) => {
    const nicknameData = nicknameForm.getValues();
    const passwordData = passwordForm.getValues();

    const bodyData: usePatchProfileProps = {};

    if (nicknameData.nickname !== profileData?.nickname) {
      bodyData.nickname = nicknameData.nickname;
    }
    if (passwordData.newPassword) {
      bodyData.newPassword = passwordData.newPassword;
    }

    patchProfile.mutate(bodyData, {
      onSuccess: () => {
        console.log('프로필 업데이트 성공!');
      },
      onError: (error: any) => {
        console.error('프로필 업데이트 에러!', error);
      },
    });
  };

  return (
    <form onSubmit={nicknameForm.handleSubmit(onSubmit)}>
      <div className={cn('titleBox')}>
        <h1>내 정보</h1>
        <Button type="primary" size="medium" htmlType="submit">
          저장하기
        </Button>
      </div>
      <div className={cn('formContainer')}>
        <div className={cn('inputBox')}>
          <Input
            label="닉네임"
            type="text"
            placeholder={profileData ? profileData.nickname : '정만철'}
            labelClassName={cn('customLabel')}
            register={nicknameForm.register('nickname')}
          />
          {nicknameForm.formState.errors.nickname && (
            <div className={cn('error')}>{nicknameForm.formState.errors.nickname.message as string}</div>
          )}
        </div>
        <div className={cn('inputBox')}>
          <Input
            label="이메일"
            type="email"
            value={email}
            placeholder={profileData ? profileData.email : '12345@example.com'}
            readOnly={true}
            labelClassName={cn('customLabel')}
          />
        </div>
        <div className={cn('inputBox')}>
          <Input
            label="비밀번호"
            type="password"
            placeholder="8자 이상 입력해 주세요"
            labelClassName={cn('customLabel')}
            register={passwordForm.register('password')}
          />
          {passwordForm.formState.errors.password && (
            <div className={cn('error')}>{passwordForm.formState.errors.password.message as string}</div>
          )}
        </div>
        <div className={cn('inputBox')}>
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            labelClassName={cn('customLabel')}
            register={passwordForm.register('newPassword')}
          />
          {passwordForm.formState.errors.newPassword && (
            <div className={cn('error')}>{passwordForm.formState.errors.newPassword.message as string}</div>
          )}
        </div>
      </div>
    </form>
  );
}
