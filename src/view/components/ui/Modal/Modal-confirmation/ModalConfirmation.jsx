import "./modal-confirmation.css";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ModalConfirmation = ({ setShowModal, title, subTitle, buttonOnClick }) => {
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

        <div className="flex">
          <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="confirm-btn" onClick={() => buttonOnClick()}>
            <div className="flex gap-2 justify-center items-center">
              <span>Continue</span>
              <Spin indicator={antIcon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
