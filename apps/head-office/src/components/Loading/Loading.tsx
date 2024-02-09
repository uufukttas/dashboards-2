import './Loading.scss'

export function Header() {
  return (
    <div className="sh-loading-container flex items-center justify-center absolute top-0 left-0 w-full h-screen opacity-70 bg-[#54565A]">
      <div className="sh-loading-spinner"></div>
    </div>
  );
};

export default Header;
