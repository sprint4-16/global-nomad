import DeleteBtnIcon from '@/images/btn/btn_delete.svg';
import { CSSProperties } from 'react';

interface DeleteBtnProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: number;
  sx?: CSSProperties;
}

export default function DeleteBtn({ onClick, size = 40, sx }: DeleteBtnProps) {
  return (
    <button onClick={onClick} style={sx}>
      <DeleteBtnIcon width={size} height={size} />
    </button>
  );
}
