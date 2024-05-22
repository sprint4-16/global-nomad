import DeleteBtnIcon from '../../../../public/btn/btn_delete.svg';

interface DeleteBtnProps {
  onClick?: () => void;
  size?: number;
}

export default function DeleteBtn({ onClick, size = 40 }: DeleteBtnProps) {
  return (
    <button onClick={onClick}>
      <DeleteBtnIcon width={size} height={size} />
    </button>
  );
}
