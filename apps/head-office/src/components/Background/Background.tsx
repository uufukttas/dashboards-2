import './Background.css';

interface IBackgroundProps {
  backgroundUrl: string;
  className?: string;
};

const Background = ({
  backgroundUrl,
  className,
}: IBackgroundProps) => {
  return (
    <div
      className={`sh-background-container h-screen ${className}`}
      style={{ backgroundImage: `url("${backgroundUrl}")` }}
    >
    </div>
  );
};

export default Background;
