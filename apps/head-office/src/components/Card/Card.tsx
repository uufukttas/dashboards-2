import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardProps } from './types';
import './Card.css';

export function Card({ cardContent, className }: ICardProps) {
  return (
    <div className={`${BRAND_PREFIX}-card-container p-8 shadow-custom lg:mx-8 ${className}`}>
      <CardHeader>
        {cardContent?.header}
      </CardHeader>
      <CardBody>
        {cardContent?.body}
      </CardBody>
      <CardFooter>
        {cardContent?.footer}
      </CardFooter>
    </div>
  );
};

export default Card;
