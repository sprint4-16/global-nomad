import { Input } from '@/components/Input/Input';
import Layout from '../_layout';
import styles from '../_style/auth.module.scss';
import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authValidationSchema } from '../_shema';

const cn = classNames.bind(styles);

export default function Signup() {
  const signupForm = useForm({
    mode: 'onBlur',
    resolver: yupResolver(authValidationSchema),
  });

  const onSubmit = () => {
    console.log(signupForm.getValues());
  };

  return (
    <div>
      <Layout>
        <form onSubmit={signupForm.handleSubmit(onSubmit)}>
          <div className={cn('inputContainer')}>
            <Input className={cn('input')} label="이메일" type="email" register={signupForm.register('email')} />
            {signupForm.formState.errors.email && (
              <div className={cn('error')}>{signupForm.formState.errors.email?.message}</div>
            )}
          </div>

          <div className={cn('inputContainer')}>
            <Input className={cn('input')} label="닉네임" type="text" register={signupForm.register('nickname')} />
            {signupForm.formState.errors.nickname && (
              <div className={cn('error')}>{signupForm.formState.errors.nickname?.message}</div>
            )}
          </div>
          <div className={cn('inputContainer')}>
            <Input
              className={cn('input')}
              label="비밀번호"
              type="password"
              register={signupForm.register('password')}
            />
            {signupForm.formState.errors.password && (
              <div className={cn('error')}>{signupForm.formState.errors.password?.message}</div>
            )}
          </div>
          <div className={cn('inputContainer')}>
            <Input
              className={cn('input')}
              label="비밀번호 확인"
              type="password"
              register={signupForm.register('passwordConfirmation')}
            />
            {signupForm.formState.errors.passwordConfirmation && (
              <div className={cn('error')}>{signupForm.formState.errors.passwordConfirmation?.message}</div>
            )}
          </div>

          <Button type="primary" size="full" sx={{ marginTop: '3rem' }}>
            회원 가입하기
          </Button>
        </form>
      </Layout>
    </div>
  );
}
