import { Input } from '@/components/Input/Input';
import Layout from '../_layout';
import styles from '../_style/auth.module.scss';
import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { authValidationSchema } from '../_shema';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);

export default function Signin() {
  const signinForm = useForm({
    mode: 'onBlur',
    resolver: yupResolver(authValidationSchema),
  });

  const onSubmit = () => {
    console.log('zy');
    // console.log(signinForm.getValues());
  };

  useEffect(() => {
    // const signinValues = signinForm.getValues();
    console.log('check');
  }, []);

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
          </div>

          <Button type="primary" disabled={!signinForm.formState.isValid} size="full" sx={{ marginTop: '3rem' }}>
            로그인 하기
          </Button>
        </form>
      </Layout>
    </div>
  );
}
