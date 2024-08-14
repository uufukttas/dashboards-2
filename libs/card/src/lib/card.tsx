interface ICardProps {
  BRAND_PREFIX: string;
  children: React.ReactNode;
  containerClassName?: string;
  style?: React.CSSProperties;
};

export function Card({ BRAND_PREFIX, children, containerClassName, style }: ICardProps) {
  const cardPrefix: string = `${BRAND_PREFIX}-card`;

  return (
    <div className={`${cardPrefix}-container shadow-custom ${containerClassName}`} style={style}>
      {children}
    </div>
  );
};

export default Card;