import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import './Card.css';

interface ICardContentProps {
  body: React.JSX.Element;
  header?: React.JSX.Element;
  footer?: React.JSX.Element;
};

interface ICardProps {
  cardContent: ICardContentProps;
  className?: string;
};

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
