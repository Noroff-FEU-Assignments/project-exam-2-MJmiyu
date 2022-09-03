import useSWR from 'swr';
import AdminNav from '../../components/page/AdminNav';
import { HolidazeAdminHead } from '../../components/page/Head';
import Loading from '../../components/page/Loading';
import { useAuthAPI } from '../../util/AuthAPIContext';
import styles from '../../styles/admin/Bookings.module.css';
import Page from '../../components/page/Page';
import Title from '../../components/typography/Title';
import Button from '../../components/inputs/Button';
import { useCallback, useState } from 'react';
import { format } from 'date-fns';
import Notification from '../../components/page/Notification';

const Bookings = () => {
  const [notification, setNotification] = useState();

  const { authGet, authDelete } = useAuthAPI();

  const { data, error, mutate } = useSWR('bookings', authGet);

  const onDeleteBooking = useCallback(
    async (id) => {
      if (!window.confirm('Are your sure you wish to delete this booking?')) {
        return;
      }
      const result = await authDelete('/bookings', id);

      if (result) {
        setNotification({ message: 'Booking deleted' });

        mutate();
      } else {
        setNotification({ type: 'error', message: 'Deleting booking failed' });
      }
    },
    [authDelete, mutate]
  );

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching bookings</div>;
  }

  const bookings = data.data;
  return (
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Bookings</Title>

      <div className={styles.Bookings}>
        <div className={styles.Booking}>
          <div>Hotel</div>

          <div>Email</div>

          <div>From</div>

          <div>To</div>

          <div>Rooms</div>

          <div>Price</div>
        </div>

        {bookings.map((booking) => {
          const {
            id,
            attributes: { email, fromDate, toDate, rooms, hotelName, price },
          } = booking;

          return (
            <div className={styles.Booking} key={id}>
              <div title={hotelName}>{hotelName}</div>

              <div title={email}>{email}</div>

              <div>{format(new Date(fromDate), 'yyyy-MM-dd')}</div>

              <div>{format(new Date(toDate), 'yyyy-MM-dd')}</div>

              <div>{rooms}</div>

              <div>{price}</div>

              <div className={styles.DeleteBookingColumn}>
                <Button color="red" onClick={() => onDeleteBooking(id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {notification && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </Page>
  );
};

export default Bookings;
