const Backdrop = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed bottom-0 left-0 top-0 z-10 flex h-full 
    w-full items-center justify-center bg-black bg-opacity-25"
    >
      {children}
    </div>
  )
}

export default Backdrop
