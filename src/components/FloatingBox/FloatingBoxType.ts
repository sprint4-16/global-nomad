export interface FloatingBoxProps {
  price: number;
}
export interface HeadCountInfoProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
export type PriceInfoProps = FloatingBoxProps & Pick<HeadCountInfoProps, 'count'>;
