import styles from './Textarea.module.css';
import { forwardRef } from 'react';
import InputError from './InputError';
import InputTitle from './InputTitle';

const Textarea = forwardRef(({ title, error, ...rest }, ref) => {
  return (
    <div className={styles.TextareaContainer}>
      <InputTitle title={title} />

      <textarea className={styles.Textarea} ref={ref} {...rest} />

      <InputError error={error} />
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
