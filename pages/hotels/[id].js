import { useRouter } from 'next/router';
import styles from '../../styles/Hotel.module.css';
import Nav from '../../components/page/Nav';
import useSWR from 'swr';
import { HolidazeHead } from '../../components/page/Head';
import { useAPI } from '../../util/APIContext';
import { useCallback, useState } from 'react';
import BookHotelForm from '../../components/forms/BookHotelForm';
import Loading from '../../components/page/Loading';
import Button from '../../components/inputs/Button';
import Page from '../../components/page/Page';
import Title from '../../components/typography/Title';
import Modal from '../../components/page/Modal';
import Stars from '../../components/page/Stars';
import Paragraph from '../../components/typography/Paragraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import HotelImage from '../../components/page/HotelImage';
import Notification from '../../components/page/Notification';
import Footer from '../../components/page/Footer';

const Hotel = () => {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState();

  const router = useRouter();
  const { id } = router.query;

  const { get } = useAPI();

  const { data, error } = useSWR('hotels/' + id, get);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const onBooking = useCallback(() => {
    setNotification({ message: 'Booking succsessful' });
    closeModal();
  }, [closeModal]);

  const onError = useCallback(() => {
    setNotification({ type: 'error', message: 'Booking failed' });
    closeModal();
  }, [closeModal]);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  const hotel = data.data;

  const {
    attributes: { name, stars, description, address, price, image },
  } = hotel;

  const imageUrl = image.data
    ? image.data.attributes.formats.small.url
    : '/placeholder.png';

  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>{name}</Title>

      <div className={styles.HotelContainer}>
        <HotelImage
          alt="Image of the hotel"
          src={imageUrl}
          width={500}
          height={500}
        />

        <Paragraph>{description}</Paragraph>

        <Paragraph>
          <FontAwesomeIcon icon={faLocationDot} /> {address}
        </Paragraph>

        <div className={styles.HotelInfo}>
          <Stars stars={stars} />

          <Paragraph>
            Price: <span className={styles.Bold}>{price}</span> NOK
          </Paragraph>

          <Button onClick={openModal}>Book room</Button>
        </div>
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <BookHotelForm
            hotel={hotel}
            onBooking={onBooking}
            onError={onError}
          />
        </Modal>
      )}

      {notification && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <Footer />
    </Page>
  );
};

export default Hotel;
