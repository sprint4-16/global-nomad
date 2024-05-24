import classNames from 'classnames/bind';
import styles from './Textarea.module.scss';

const cn = classNames.bind(styles);

interface TextareaParams {
  placeholder?: string;
}

export default function Textarea({ placeholder = '후기를 작성해 주세요.' }: TextareaParams) {
  return (
    <div className={cn('container')}>
      <textarea className={cn('textarea')} placeholder={placeholder} />
    </div>
  );
}
