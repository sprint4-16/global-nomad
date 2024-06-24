import classNames from 'classnames/bind';
import styles from '../_style/auth.module.scss';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { ROUTE } from '@/constants';
import { Input } from '@/components/Input/Input';
import Layout from '../_layout';
import Button from '@/components/Button/Button';
import { schema_for_signin } from '../../../utills/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@/apis/apiHooks/Auth';

const cn = classNames.bind(styles);

export default function Signin() {
  const router = useRouter();

  const signinForm = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema_for_signin),
  });

  const { mutate: login, error } = useLogin({
    onSuccess: () => {
      router.push(ROUTE.HOME);
    },
  });

  const onSubmit = () => {
    const signinFormValues = signinForm.getValues();

    login({
      email: signinFormValues.email,
      password: signinFormValues.password,
    });
  };

  return (
    <div>
      <Layout>
        <form onSubmit={signinForm.handleSubmit(onSubmit)}>
          <div className={cn('inputContainer')}>
            <Input className={cn('input')} label="이메일" type="email" register={signinForm.register('email')} />
            {signinForm.formState.errors.email && (
              <div className={cn('error')}>{signinForm.formState.errors.email?.message}</div>
            )}
          </div>
          <div className={cn('inputContainer')}>
            <Input
              className={cn('input')}
              label="비밀번호"
              type="password"
              register={signinForm.register('password')}
            />
            {signinForm.formState.errors.email && (
              <div className={cn('error')}>{signinForm.formState.errors.password?.message}</div>
            )}
            {error && error instanceof AxiosError && <div className={cn('error')}>{error.response?.data.message}</div>}
          </div>
          <Button type="primary" disabled={!signinForm.formState.isValid} size="full" sx={{ marginTop: '3rem' }}>
            로그인 하기
          </Button>
        </form>
      </Layout>
    </div>
  );
}
