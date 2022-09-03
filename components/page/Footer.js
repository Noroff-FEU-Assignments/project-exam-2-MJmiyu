import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from '../typography/NextLink';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <NextLink className={styles.FooterLink} href="/">
        Home
      </NextLink>
      <NextLink className={styles.FooterLink} href="/hotels">
        Hotels
      </NextLink>
      <NextLink className={styles.FooterLink} href="/contact">
        Contact
      </NextLink>
      <NextLink target="_blank" href="https://facebook.com">
        <FontAwesomeIcon className={styles.FooterLink} icon={faFacebook} />
      </NextLink>
      <NextLink target="_blank" href="https://twitter.com">
        <FontAwesomeIcon className={styles.FooterLink} icon={faTwitter} />
      </NextLink>
      <NextLink target="_blank" href="https://instagram.com">
        <FontAwesomeIcon className={styles.FooterLink} icon={faInstagram} />
      </NextLink>
    </div>
  );
};

export default Footer;
