import { Fragment } from "react";
import ReactDOM from "react-dom";
import modalStyle from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={modalStyle.backdrop} onClick={props.onClose}></div>;
};
const OverlayModal = (props) => {
  return (
    <div className={modalStyle.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const tempatPortal = document.getElementById(`modall`);

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        tempatPortal
      )}
      {ReactDOM.createPortal(
        <OverlayModal>{props.children}</OverlayModal>,
        tempatPortal
      )}
    </Fragment>
  );
};

export default Modal;
