import Card from '../../components/Card/Card';

interface CardProps {
  cardData: {
    activity: {
      title: string;
      bannerImageUrl: string;
    };
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
  };
}

export default function ReviewCard({ cardData }: CardProps) {
  return (
    <Card where="review">
      <Card.Thumbnail bannerImageUrl={cardData.activity.bannerImageUrl} where="review" />
      <Card.Description where="review">
        <Card.Title where="review">{cardData.activity.title}</Card.Title>
        <Card.Schedule
          date={cardData.date}
          startTime={cardData.startTime}
          endTime={cardData.endTime}
          headCount={cardData.headCount}
        />
        <Card.Divider />
        <Card.Price where="review" price={cardData.totalPrice} />
      </Card.Description>
    </Card>
  );
}
