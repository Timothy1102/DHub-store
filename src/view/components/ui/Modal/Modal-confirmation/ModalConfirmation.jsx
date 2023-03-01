import "./modal-confirmation.css";

const ModalConfirmation = ({ setShowModal, title, subTitle }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h4 className="text-center font-bold text-2xl">{title}</h4>
        <p className="text-center text-light" style={{ fontSize: 15}}>
          {subTitle}
        </p>

        {/* <div className="input__item mb-4">
          <input type="number" placeholder="" />
        </div> */}

        <button className="place__bid-btn" onClick={() => setShowModal(false)}>Cancel</button>
        <button className="place__bid-btn" onClick={() => setShowModal(false)}>Continue</button>
      </div>
    </div>
  );
};

export default ModalConfirmation;
