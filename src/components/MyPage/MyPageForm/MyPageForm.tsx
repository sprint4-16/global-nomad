import Button from '@/components/Button/Button';
import styles from './MyPageForm.module.scss';
import classNames from 'classnames/bind';
import { Input } from '@/components/Input/Input';
import { CSSProperties } from 'react';

const cn = classNames.bind(styles);

export default function MyPageForm() {
  return (
    <form>
      <div className={cn('titleBox')}>
        <h1>내 정보</h1>
        <Button type="primary" size="medium">
          저장하기
        </Button>
      </div>
      <div className={cn('formContainer')}>
        <Input label="닉네임" type="text" placeholder="정만철" labelClassName={cn('customLabel')} />
        <Input label="이메일" type="email" placeholder="12345@example.com" labelClassName={cn('customLabel')} />
        <Input label="비밀번호" type="text" placeholder="8자 이상 입력해 주세요" labelClassName={cn('customLabel')} />
        <Input
          label="비밀번호 확인"
          type="text"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          labelClassName={cn('customLabel')}
        />
      </div>
    </form>
  );
}
