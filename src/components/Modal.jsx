

const Modal = ({setShowModal, children}) => {

    

    return(
        <div className="absolute w-[500px] h-[500px] z-10 bg-white top-1/4 left-1/3">
            <div>
                <div>
                    <div className="flex justify-evenly">
                        <h3>ingresa tu comentario</h3>
                        <button onClick={()=>setShowModal(false)}>
                            X
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal