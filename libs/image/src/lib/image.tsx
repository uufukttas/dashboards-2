interface IImageProps {
  alt: string;
  className?: string;
  height?: number;
  id?: string;
  src: string;
  srcset?: string;
  width?: number;
};

export function Image({ alt, className, height, id, src, srcset, width }: IImageProps) {
  return (
    <img
      alt={alt}
      className={`image ${className}`}
      height={height}
      id={id}
      src={src}
      srcSet={srcset}
      width={width}
    />
  );
};

export default Image;
