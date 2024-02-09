'use client';

import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import styles from './Card.module.scss';

interface CardProps {
  cardHeaderChildren?: React.JSX.Element;
  cardBodyChildren: React.JSX.Element;
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
}: CardProps) {
  return (
    <div className={`${styles['sh-card-container']} p-8 rounded shadow-custom mx-8 ${className}`}>
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
