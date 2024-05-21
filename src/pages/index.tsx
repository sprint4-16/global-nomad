import { DateInput, Dropdown, Input } from '@/components/Input/Input';

export default function Home() {
  return (
    <>
      랜딩페이지
      <Input label={'이메일'} type={'email'} placeholder={'이메일을 작성해주세요'} />
      <Input label={'비밀번호'} type={'password'} placeholder={'비밀번호를 작성해주세요'} />
      <Dropdown buttonText={'카테고리'} />
      <DateInput dateText={'YY/MM/DD'} />
    </>
  );
}
