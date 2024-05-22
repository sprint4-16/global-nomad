import MeatBallBtnIcon from '../../../../public/btn/btn_meatball.svg';

interface KebabBtnProps {
  onClick?: () => void;
  size?: number;
}

export default function KebabBtn({ onClick, size = 40 }: KebabBtnProps) {
  return (
    <button onClick={onClick}>
      <MeatBallBtnIcon width={size} height={size} />
    </button>
  );
}
