import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import styles from './Modal.module.css';

const Modal = ({ onClose, children }) => {
  const preventClose = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={styles.ModalBackground} onClick={onClose}>
      <div className={styles.Modal} onClick={preventClose}>
        <div className={styles.ModalHeader}>
          <FontAwesomeIcon
            onClick={onClose}
            icon={faXmark}
            className={styles.CloseIcon}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
