import styles from './Paragraph.module.css';
import cn from 'classnames';

const Paragraph = ({ className, children }) => {
  return (
    <p className={cn(styles.Paragraph, { [className]: !!className })}>
      {children}
    </p>
  );
};

export default Paragraph;
