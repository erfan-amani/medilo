import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from './Icons/CloseIcon';

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="absolute h-screen w-screen fixed top-0 left-0 z-40 bg-gray-500 backdrop-filter backdrop-blur-md bg-opacity-20"
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50 w-11/12 bg-white p-8">
      <CloseIcon
        onClose={props.onClose}
        className="absolute top-8 right-8 cursor-pointer"
      />
      {props.children}
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById('backdrop-root')
      )}
      {createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default Modal;
