import Button from '@/components/Button/Button';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames/bind';
import { Input } from '@/components/Input/Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetProfile, usePatchProfile, usePatchProfileProps } from '@/apis/apiHooks/\bMyProfile';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);

export default function MyPageForm() {
  const { data: profileData } = useGetProfile();
  const patchProfile = usePatchProfile();
  const [initialValues, setInitialValues] = useState({ nickname: '', email: '' });

  useEffect(() => {
    if (profileData) {
      setInitialValues({
        nickname: profileData.nickname,
        email: profileData.email,
      });
    }
  }, [profileData]);

  const formSchema = yup.object({
    nickname: yup.string().max(10, '열 자 이하로 작성해 주세요.'),
    password: yup
      .string()
      .min(8, '8자 이상 입력해 주세요.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.')
      .nullable()
      .transform((value) => (value === '' ? null : value)),
    newPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .nullable()
      .when('password', {
        is: (password: string | null) => password !== null,
        then: (schema) => schema.required('비밀번호 확인을 입력해 주세요.'),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    //@ts-ignore
    resolver: yupResolver(formSchema) as Resolver,
  });

  const onSubmit = (data: any) => {
    const bodyData: usePatchProfileProps = {
      nickname: data.nickname,
      newPassword: data.newPassword,
      profileImageUrl: '',
    };

    if (data.nickname && data.nickname !== initialValues.nickname) {
      bodyData.nickname = data.nickname;
    }

    if (data.password) {
      bodyData.newPassword = data.password;
    }

    // If there's a profile image URL to handle, add logic here
    bodyData.profileImageUrl = '';

    console.log('Submitting data:', bodyData); // 콘솔에 출력하여 데이터 확인

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
    <form onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="정만철"
            labelClassName={cn('customLabel')}
            register={register('nickname')}
          />
          {errors.nickname && <div className={cn('error')}>{errors.nickname.message as string}</div>}
        </div>
        <div className={cn('inputBox')}>
          <Input label="이메일" type="email" placeholder="12345@example.com" labelClassName={cn('customLabel')} />
        </div>
        <div className={cn('inputBox')}>
          <Input
            label="비밀번호"
            type="password"
            placeholder="8자 이상 입력해 주세요"
            labelClassName={cn('customLabel')}
            register={register('password')}
          />
          {errors.password && <div className={cn('error')}>{errors.password.message as string}</div>}
        </div>
        <div className={cn('inputBox')}>
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            labelClassName={cn('customLabel')}
            register={register('newPassword')}
          />
          {errors.newPassword && <div className={cn('error')}>{errors.newPassword.message as string}</div>}
        </div>
      </div>
    </form>
  );
}
