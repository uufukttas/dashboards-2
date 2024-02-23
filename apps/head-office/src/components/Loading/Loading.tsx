import './Loading.css';

const Loading = () => {
  return (
    <div className="sh-loading-spinner-container flex items-center justify-center absolute top-0 left-0 w-full h-screen opacity-70 bg-[#54565A]">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
