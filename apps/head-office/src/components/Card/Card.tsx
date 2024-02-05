'use client';

import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

interface CardProps {
  cardHeaderChildren?: React.JSX.Element;
  cardBodyChildren: React.JSX.Element;
  cardFooterChildren?: React.JSX.Element;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Card({
  cardHeaderChildren,
  cardBodyChildren,
  cardFooterChildren,
  className
 }: CardProps) {
  return (
    <>
      <div className={`sh-card-container items-center justify-center p-8 rounded shadow-custom mx-8 ${className}`}>
        <CardHeader>
          {cardHeaderChildren}
        </CardHeader>
        <CardBody>
          {cardBodyChildren}
        </CardBody>
        <CardFooter>
          {cardFooterChildren}
        </CardFooter>
      </div>
    </>
  );
}

export default Card;
