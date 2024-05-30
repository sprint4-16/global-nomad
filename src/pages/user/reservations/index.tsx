import classNames from 'classnames/bind';
import Filter from '@/components/Category&Filter/Filter/Filter';
import { ReservationCard } from '@/components/Card/Card';

import tempImg from '@/images/img/img_resource_dog.svg';
import EmptyIcon from '@/images/icon/icon_empty.svg';

import styles from './reservations.module.scss';

const cn = classNames.bind(styles);

export default function ReservationsPage() {
  const tempCardList = [
    {
      imgUrl: tempImg,
      reservationState: 'completed',
      title: '내 강아지 인생사진 찍어주기',
      schedule: { date: '2023. 2. 14', startTime: '11:00', endTime: '12:30', headCount: 10 },
      price: 10000,
    },
    {
      imgUrl: tempImg,
      reservationState: 'completed',
      title: '내 강아지 인생사진 찍어주기',
      schedule: { date: '2023. 2. 14', startTime: '11:00', endTime: '12:30', headCount: 10 },
      price: 10000,
    },
    {
      imgUrl: tempImg,
      reservationState: 'completed',
      title: '내 강아지 인생사진 찍어주기',
      schedule: { date: '2023. 2. 14', startTime: '11:00', endTime: '12:30', headCount: 10 },
      price: 10000,
    },
    {
      imgUrl: tempImg,
      reservationState: 'completed',
      title: '내 강아지 인생사진 찍어주기',
      schedule: { date: '2023. 2. 14', startTime: '11:00', endTime: '12:30', headCount: 10 },
      price: 10000,
    },
    {
      imgUrl: tempImg,
      reservationState: 'completed',
      title: '내 강아지 인생사진 찍어주기',
      schedule: { date: '2023. 2. 14', startTime: '11:00', endTime: '12:30', headCount: 10 },
      price: 10000,
    },
    {
      imgUrl: tempImg,
      reservationState: 'completed',
      title: '내 강아지 인생사진 찍어주기',
      schedule: { date: '2023. 2. 14', startTime: '11:00', endTime: '12:30', headCount: 10 },
      price: 10000,
    },
    {
      imgUrl: tempImg,
      reservationState: 'completed',
      title: '내 강아지 인생사진 찍어주기',
      schedule: { date: '2023. 2. 14', startTime: '11:00', endTime: '12:30', headCount: 10 },
      price: 10000,
    },
  ];

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <div className={cn('header_text')}>예약 내역</div>
        {true ? <Filter filterType="reservation" /> : <></>}
      </div>
      <div className={cn('content')}>
        {true ? (
          tempCardList.map((item, index) => <ReservationCard card={item} key={`${index} ${item.title}`} />)
        ) : (
          <div className={cn('content_empty')}>
            <EmptyIcon width="24rem" height="24rem" />
            <div className={cn('content_text')}>아직 등록한 체험이 없어요</div>
          </div>
        )}
      </div>
    </div>
  );
}
