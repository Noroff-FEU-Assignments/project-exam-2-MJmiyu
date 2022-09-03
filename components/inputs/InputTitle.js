import styles from './InputTitle.module.css';

const InputTitle = ({ title }) => {
  return <h5 className={styles.InputTitle}>{title}</h5>;
};

export default InputTitle;
