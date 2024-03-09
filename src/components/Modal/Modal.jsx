import { useEffect, useCallback } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, closeModal }) => {
  const handlerCloseESC = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleClickBackdrop = useCallback(
    ({ target, currentTarget }) => {
      if (target === currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handlerCloseESC);

    return () => {
      document.removeEventListener('keydown', handlerCloseESC);
    };
  }, [handlerCloseESC, closeModal]);

  return createPortal(
    <div className={styles.overlay} onClick={handleClickBackdrop}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;