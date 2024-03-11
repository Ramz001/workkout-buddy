const Backdrop = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute bottom-0 left-0 top-0 flex items-center justify-center 
    w-full h-full bg-black bg-opacity-25 z-10"
    >
      {children}
    </div>
  );
};

export default Backdrop;
