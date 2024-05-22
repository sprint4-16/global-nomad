import AddImageIcon from '../../../../public/btn/btn_add_img.svg';

interface AddImageBtnProps {
  onClick?: () => void;
  size?: number;
}

export default function AddImageBtn({ onClick, size = 180 }: AddImageBtnProps) {
  return (
    <button onClick={onClick}>
      <AddImageIcon width={size} height={size} />
    </button>
  );
}
