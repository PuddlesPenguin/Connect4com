const Header = ({ children, authButtons }) => {
  return (
    <header className="fixed top-0 left-0 w-full h-[70px] z-10 bg-[#46494f] flex items-center p-4">
      {/* Left-aligned content */}
      <div className="flex items-center space-x-0">
        {children}
      </div>

      {/* Right-aligned UserAuthButtons */}
      <div className="flex items-center space-x-4 ml-auto">
        {authButtons}
      </div>
    </header>
  );
};
export default Header;