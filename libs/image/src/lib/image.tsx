interface ImageProps {
  alt: string;
  className?: string;
  height?: number;
  src: string;
  srcset?: string;
  width?: number;
}

export function Image({
  alt = "sharz logo",
  className = "",
  height = 100,
  src = "https://sharz.net/build/img/logo.svg",
  srcset = "",
  width = 100,
}: ImageProps) {
  return (
    <img
      alt={alt}
      className={className}
      height={height}
      src={src}
      srcSet={srcset}
      width={width}
    />
  );
}

export default Image;
