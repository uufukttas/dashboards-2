interface ICardProps {
  BRAND_PREFIX: string;
  children: React.ReactNode;
  containerClassName?: string;
};

export function Card({ BRAND_PREFIX, children, containerClassName }: ICardProps) {
  const cardPrefix: string = `${BRAND_PREFIX}-card`;

  return (
    <div className={`${cardPrefix}-container shadow-custom ${containerClassName}`}>
      {children}
    </div>
  );
};

export default Card;