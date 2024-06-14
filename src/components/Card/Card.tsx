import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import {
  Description,
  Divider,
  Footer,
  Price,
  ReservationStatus,
  Schedule,
  StarRating,
  Thumbnail,
  Title,
  ReservationButton,
  CardDropdown,
} from './components/CardComponents';

export default function Card({
  children,
  className,
  where,
}: {
  children: React.ReactNode;
  className?: string;
  where?: 'review';
}) {
  const cn = classNames.bind(styles);

  return <div className={cn('card', className, where)}>{children}</div>;
}
Card.Thumbnail = Thumbnail;
Card.Description = Description;
Card.ReservationStatus = ReservationStatus;
Card.StarRating = StarRating;
Card.Title = Title;
Card.Schedule = Schedule;
Card.Divider = Divider;
Card.Footer = Footer;
Card.Price = Price;
Card.ReservationButton = ReservationButton;
Card.Dropdown = CardDropdown;
