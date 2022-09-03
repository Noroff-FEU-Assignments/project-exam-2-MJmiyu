import styles from './SubTitle.module.css';

const SubTitle = ({ children }) => {
  return <h2 className={styles.SubTitle}>{children}</h2>;
};

export default SubTitle;
