interface BackgroundProps {
  className?: string;
  backgroundUrl?: string;
}

export function Background({
  className,
  backgroundUrl = 'https://ho.sharz.net/images/theme/5000/background.jpg',
}: BackgroundProps) {
  return (
    <div
      className={`sh-background-container ${className}`}
      style={{ backgroundImage: `url("${backgroundUrl}")` }}
    >
    </div>
  );
}

export default Background;
