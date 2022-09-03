import styles from './InputError.module.css';
import cn from 'classnames';

const InputError = ({ error }) => {
  return (
    <span className={cn(styles.Error, !error && styles.Hidden)}>
      {error ? error.message : '-'}
    </span>
  );
};

export default InputError;
