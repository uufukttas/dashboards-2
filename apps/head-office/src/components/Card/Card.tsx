'use client';

import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import './Card.scss';

interface ICardProps {
  cardHeaderChildren?: React.JSX.Element;
  cardBodyChildren?: React.JSX.Element;
  cardFooterChildren?: React.JSX.Element;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export function Card({
  cardHeaderChildren,
  cardBodyChildren,
  cardFooterChildren,
  className,
  onClick,
}: ICardProps) {
  return (
    <div className={`sh-card-container p-8 rounded shadow-custom mx-8 ${className}`}>
      <CardHeader>
        {cardHeaderChildren}
      </CardHeader>
      <CardBody onClick={onClick}>
        {cardBodyChildren}
      </CardBody>
      <CardFooter>
        {cardFooterChildren}
      </CardFooter>
    </div>
  );
};

export default Card;
