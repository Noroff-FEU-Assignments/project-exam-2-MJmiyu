import { useAuthAPI } from '../../util/AuthAPIContext';
import styles from './Nav.module.css';
import NextLink from '../typography/NextLink';

const AdminNav = () => {
  const { logout } = useAuthAPI();

  return (
    <div className={styles.Nav}>
      <NextLink className={styles.NavLink} href="/admin/hotels">
        Hotels
      </NextLink>
      <NextLink className={styles.NavLink} href="/admin/bookings">
        Bookings
      </NextLink>
      <NextLink className={styles.NavLink} href="/admin/messages">
        Messages
      </NextLink>
      <div className={styles.NavLink} onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default AdminNav;
