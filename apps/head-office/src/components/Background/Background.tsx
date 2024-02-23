import './Background.css';

interface BackgroundProps {
  backgroundUrl: string;
  className?: string;
};

const Background = ({
  backgroundUrl,
  className,
}: BackgroundProps) => {
  return (
    <div
      className={`sh-background-container h-screen ${className}`}
      style={{ backgroundImage: `url("${backgroundUrl}")` }}
    >
    </div>
  );
};

export default Background;
