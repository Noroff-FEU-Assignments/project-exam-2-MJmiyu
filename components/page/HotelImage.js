import Image from 'next/image';
import styles from './HotelImage.module.css';

const HotelImage = ({ alt, ...rest }) => {
  return <Image className={styles.HotelImage} alt={alt} {...rest} />;
};

export default HotelImage;
