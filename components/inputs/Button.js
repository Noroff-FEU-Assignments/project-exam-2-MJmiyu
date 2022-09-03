import styles from './Button.module.css';
import cn from 'classnames';

const Button = ({ className, color = 'default', children, ...rest }) => {
  return (
    <button
      className={cn(styles.Button, {
        [className]: !!className,
        [styles.Red]: color === 'red',
        [styles.Gray]: color === 'gray',
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
