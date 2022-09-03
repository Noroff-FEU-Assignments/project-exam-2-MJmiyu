import styles from './Input.module.css';
import { forwardRef } from 'react';
import InputError from './InputError';
import InputTitle from './InputTitle';

const Input = forwardRef(({ title, error, ...rest }, ref) => {
  return (
    <div className={styles.InputContainer}>
      <InputTitle title={title} />

      <input className={styles.Input} ref={ref} {...rest} />

      <InputError error={error} />
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
