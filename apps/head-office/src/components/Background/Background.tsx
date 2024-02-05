import './Background.scss';

interface BackgroundProps {
  className?: string;
  backgroundUrl: string;
}

export function Background({
  className,
  backgroundUrl,
}: BackgroundProps) {
  return (
    <div
      className={`sh-background-container h-screen ${className}`}
      style={{ backgroundImage: `url("${backgroundUrl}")` }}
    >
    </div>
  );
}

export default Background;
