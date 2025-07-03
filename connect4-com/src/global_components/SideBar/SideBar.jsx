const Sidebar = ({ children, authButtons }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-[250px] z-10 bg-[#46494f] overflow-x-hidden pt-5 flex flex-col">
      <div>
        {children}
      </div>

      <div className="pt-[30px]">
        {authButtons}
      </div>
    </div>
  );
};
export default Sidebar;
