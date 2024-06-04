import Card from '../../components/Card/Card';

type ReservationState = 'pending' | 'confirmed' | 'canceled' | 'declined' | 'completed';

interface CardProps {
  className: string;
  cardData: {
    activity: {
      title: string;
      bannerImageUrl: string;
    };
    status: ReservationState;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
  };
}

export default function ReservationCard({ className, cardData }: CardProps) {
  return (
    <Card className={className}>
      <Card.Thumbnail bannerImageUrl={cardData.activity.bannerImageUrl} />
      <Card.Description>
        <div>
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
          <Card.ReservationButton cardData={cardData} status={cardData.status} />
        </Card.Footer>
      </Card.Description>
    </Card>
  );
}
