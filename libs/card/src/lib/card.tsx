import CardBody from './CardComponents/CardBody';
import CardFooter from './CardComponents/CardFooter';
import CardHeader from './CardComponents/CardHeader';
export interface ICardProps {
  BRAND_PREFIX: string;
  cardBody: React.JSX.Element;
  cardHeader?: React.JSX.Element;
  cardFooter?: React.JSX.Element;
  className?: string;
  containerClassName?: string;
};

export function Card({ BRAND_PREFIX, cardBody, cardFooter, cardHeader, containerClassName }: ICardProps) {
  const cardPrefix: string = `${BRAND_PREFIX}-card`;

  return (
    <div className={`${cardPrefix}-container shadow-custom ${containerClassName}`}>
      {
        cardHeader && (
          <CardHeader brandPrefix={BRAND_PREFIX}>
            {cardHeader}
          </CardHeader>
        )
      }
      {
        cardBody && (
          <CardBody brandPrefix={BRAND_PREFIX}>
            {cardBody}
          </CardBody>
        )
      }
      {
        cardFooter && (
          <CardFooter brandPrefix={BRAND_PREFIX}>
            {cardFooter}
          </CardFooter>
        )
      }
    </div>
  );
};

export default Card;