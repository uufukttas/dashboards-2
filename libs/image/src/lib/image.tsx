interface IImageProps {
  alt: string;
  className?: string;
  height?: number;
  src: string;
  srcset?: string;
  width?: number;
};

export function Image({ alt, className, height, src, srcset, width }: IImageProps) {
  return (
    <img
      alt={alt}
      className={`image ${className}`}
      height={height}
      src={src}
      srcSet={srcset}
      width={width}
    />
  );
};

export default Image;
