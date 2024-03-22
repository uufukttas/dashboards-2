'use client';

import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import './Card.css';

interface ICardProps {
  cardContent: {
    header?: React.JSX.Element;
    body: React.JSX.Element;
    footer?: React.JSX.Element;
  };
  className?: string;
};

export function Card({
  cardContent,
  className,
}: ICardProps) {
  return (
    <div className={`${BRAND_PREFIX}-card-container p-8 shadow-custom mx-8 ${className}`}>
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
