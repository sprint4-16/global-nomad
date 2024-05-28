import Button from '@/components/Button/Button';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames/bind';
import { Input } from '@/components/Input/Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const cn = classNames.bind(styles);

export default function MyPageForm() {
  const formSchema = yup.object({
    nickname: yup.string().max(10, '열 자 이하로 작성해 주세요.'),
    password: yup
      .string()
      .required('8자 이상 입력해 주세요.')
      .min(8, '8자 이상 입력해 주세요.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.'),
    newPassword: yup.string().oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
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

  return (
    <form>
      <div className={cn('titleBox')}>
        <h1>내 정보</h1>
        <Button type="primary" size="medium">
          저장하기
        </Button>
      </div>
      <div className={cn('formContainer')}>
        <Input
          label="닉네임"
          type="text"
          placeholder="정만철"
          labelClassName={cn('customLabel')}
          register={register('nickname')}
        />
        {errors.nickname && <div className={cn('error')}>{errors.nickname.message as string}</div>}
        <Input label="이메일" type="email" placeholder="12345@example.com" labelClassName={cn('customLabel')} />
        <Input
          label="비밀번호"
          type="text"
          placeholder="8자 이상 입력해 주세요"
          labelClassName={cn('customLabel')}
          register={register('password')}
        />
        {errors.password && <div className={cn('error')}>{errors.password.message as string}</div>}
        <Input
          label="비밀번호 확인"
          type="text"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          labelClassName={cn('customLabel')}
          register={register('newPassword')}
        />
        {errors.newPassword && <div className={cn('error')}>{errors.newPassword.message as string}</div>}
      </div>
    </form>
  );
}
