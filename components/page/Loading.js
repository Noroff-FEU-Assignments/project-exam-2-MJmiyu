import styles from './Loading.module.css';

/* Spinner from https://loading.io/css/ */
const Loading = () => {
  return (
    <div className={styles.SpinnerContainer}>
      <div className={styles.Spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
