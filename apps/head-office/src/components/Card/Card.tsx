import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardProps } from './types';
import './Card.css';

const Card: React.FC<ICardProps> = ({ cardBody, cardFooter, cardHeader, className }: ICardProps) => {
  const cardPrefix: string = `${BRAND_PREFIX}-card`;

  return (
    <div className={`${cardPrefix}-container shadow-custom ${className}`}>
      {
        cardHeader && (
          <CardHeader>
            {cardHeader}
          </CardHeader>
        )
      }
      {
        cardBody && (
          <CardBody>
            {cardBody}
          </CardBody>
        )
      }
      {
        cardFooter && (
          <CardFooter>
            {cardFooter}
          </CardFooter>
        )
      }
    </div>
  );
};

export default Card;
