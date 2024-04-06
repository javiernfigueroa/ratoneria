const Modal = ({ setShowModal, children }) => {
  const user = localStorage.getItem('nickname');
  return (
    <div className="absolute w-[500px] h-[350px] z-10 bg-transparent top-1/4 left-1/3">
      <div className="h-full bg-pgrey rounded-xl">
        <div className="flex justify-between p-5">
          <h3 className="text-white">Hola {user} </h3>
          <button className="text-white" onClick={() => setShowModal(false)}>
            X
          </button>
        </div>
        <div className="flex flex-col p-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
