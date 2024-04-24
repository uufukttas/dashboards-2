import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardProps } from './types';
import './Card.css';

const Card = ({ cardBody, cardFooter, cardHeader, className }: ICardProps) => {
  return (
    <div className={`${BRAND_PREFIX}-card-container p-8 shadow-custom lg:mx-8 ${className}`}>
      <CardHeader>
        {cardHeader}
      </CardHeader>
      <CardBody>
        {cardBody}
      </CardBody>
      <CardFooter>
        {cardFooter}
      </CardFooter>
    </div>
  );
};

export default Card;
