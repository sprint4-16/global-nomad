import React, { forwardRef } from 'react';
import Card from '../../components/Card/Card';

type ReservationState = 'pending' | 'confirmed' | 'canceled' | 'declined' | 'completed';

interface CardProps {
  className: string;
  cardData: {
    activity: {
      title: string;
      bannerImageUrl: string;
    };
    id: number;
    reviewSubmitted: boolean;
    status: ReservationState;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
  };
}

const ReservationCard = forwardRef<HTMLDivElement, CardProps>(({ className, cardData }, ref) => {
  return (
    <Card className={className}>
      <Card.Thumbnail bannerImageUrl={cardData.activity.bannerImageUrl} />
      <Card.Description>
        <div ref={ref}>
          <Card.ReservationStatus status={cardData.status} />
          <Card.Title>{cardData.activity.title}</Card.Title>
          <Card.Schedule
            date={cardData.date}
            startTime={cardData.startTime}
            endTime={cardData.endTime}
            headCount={cardData.headCount}
          />
        </div>
        <Card.Footer>
          <Card.Price price={cardData.totalPrice} />
          <Card.ReservationButton cardData={cardData} />
        </Card.Footer>
      </Card.Description>
    </Card>
  );
});
ReservationCard.displayName = 'ReservationCard';

export default ReservationCard;
