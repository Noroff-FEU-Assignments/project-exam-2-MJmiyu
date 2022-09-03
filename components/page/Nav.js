import styles from './Nav.module.css';
import NextLink from '../typography/NextLink';
import Search from './Search';

const Nav = () => {
  return (
    <div className={styles.Nav}>
      <NextLink className={styles.NavLink} href="/">
        Home
      </NextLink>
      <NextLink className={styles.NavLink} href="/hotels">
        Hotels
      </NextLink>
      <NextLink className={styles.NavLink} href="/contact">
        Contact
      </NextLink>
      <Search />
    </div>
  );
};

export default Nav;
