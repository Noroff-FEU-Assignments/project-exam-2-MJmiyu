import { useEffect } from 'react';
import styles from './Notification.module.css';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';

const Notification = ({ notification, onClose }) => {
  const { message, type = 'success' } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={cn(styles.Notification, {
        [styles.Error]: type === 'error',
      })}
    >
      <FontAwesomeIcon
        className={styles.Icon}
        icon={type === 'error' ? faXmark : faCheckCircle}
      />

      {message}
    </div>,
    document.body
  );
};

export default Notification;
