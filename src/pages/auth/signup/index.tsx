import { Input } from '@/components/Input/Input';
import Layout from '../_layout';
import styles from '../_style/auth.module.scss';
import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';

const cn = classNames.bind(styles);

export default function Signup() {
  return (
    <div>
      <Layout>
        <form>
          <Input className={cn('input')} label="이메일" type="email" />
          <Input className={cn('input')} label="닉네임" type="text" />
          <Input className={cn('input')} label="비밀번호" type="password" />
          <Input className={cn('input')} label="비밀번호 확인" type="password" />

          <Button type="primary" disabled size="full" sx={{ marginTop: '3rem' }}>
            회원가입하기
          </Button>
        </form>
      </Layout>
    </div>
  );
}
