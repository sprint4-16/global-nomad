import Card from '../../components/Card/Card';

interface CardProps {
  cardData: {
    id: number;
    title: string;
    price: number;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
  };
}

export default function ExperienceCard({ cardData }: CardProps) {
  return (
    <Card>
      {cardData && (
        <>
          <Card.Thumbnail bannerImageUrl={cardData.bannerImageUrl} />
          <Card.Description>
            <div>
              <Card.StarRating rating={cardData.rating} reviewCount={cardData.reviewCount} />
              <Card.Title>{cardData.title}</Card.Title>
            </div>
            <Card.Footer>
              <Card.Price price={cardData.price} />
              <Card.Dropdown activityId={cardData.id} />
            </Card.Footer>
          </Card.Description>
        </>
      )}
    </Card>
  );
}
