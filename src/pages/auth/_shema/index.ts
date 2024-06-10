import * as yup from 'yup';

// Common validation rules
const emailValidation = yup
  .string()
  .required('이메일을 입력해주세요.')
  .matches(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/, '이메일 형식으로 작성해 주세요.');

const passwordValidation = yup
  .string()
  .min(8, '8자 이상 입력해주세요.')
  .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.');

// Schemas
export const schema_for_signin = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const schema_for_signup = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  nickname: yup.string().required('닉네임을 입력해 주세요.').max(10, '열자 이하로 작성해 주세요.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
});
