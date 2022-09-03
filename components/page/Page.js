import styles from './Page.module.css';

const Page = ({ children }) => {
  return <div className={styles.Page}>{children}</div>;
};

export default Page;
