import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardProps } from './types';
import './Card.css';

const Card = ({ cardBody, cardFooter, cardHeader, className }: ICardProps): React.ReactNode => {
  return (
    <div className={`${BRAND_PREFIX}-card-container p-8 shadow-custom ${className}`}>
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
