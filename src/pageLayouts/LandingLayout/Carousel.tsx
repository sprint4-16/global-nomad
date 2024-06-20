import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './landingLayout.module.scss';

const cn = classNames.bind(styles);

interface dataType {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
  updatedAt: string;
  userId: number;
}
interface Props {
  data: dataType[];
}
export default function Carousel({ data }: Props) {
  const month = new Date().getMonth() + 1;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrow: false,
  };
  const advertisement = [
    `${month}월의 인기 체험 BEST 🔥`,
    '올여름 꼭 가봐야 할 관광지 🤿',
    'GlobalNomad 단독 특가 최대 50% 할인 ❗❗',
  ];
  return (
    <div className={cn('slide-wrapper')}>
      <Slider {...settings}>
        {data.map((item, index: number) => {
          return (
            <h3 className={cn('item')} key={`${item.id} ${index}`}>
              <Image
                className={cn('bannerImg', 'dimmed')}
                src={item.bannerImageUrl}
                alt="배너"
                width={1920}
                height={550}
                priority
              />
              <div className={cn('mainTitle')}>
                <div className={cn('title')}>{item.title}</div>
                <div className={cn('description')}>{advertisement[index]}</div>
              </div>
            </h3>
          );
        })}
      </Slider>
    </div>
  );
}
