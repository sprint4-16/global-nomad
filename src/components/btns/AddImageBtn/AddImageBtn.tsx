import AddImageIcon from '../../../../public/btn/btn_add_img.svg';

interface AddImageBtnProps {
  onClick?: () => void;
}

export default function AddImageBtn({ onClick }: AddImageBtnProps) {
  return (
    <button onClick={onClick}>
      <AddImageIcon />
    </button>
  );
}
