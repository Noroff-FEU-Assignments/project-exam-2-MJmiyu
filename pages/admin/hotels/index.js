import styles from '../../../styles/admin/Hotels.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/page/Head';
import AdminNav from '../../../components/page/AdminNav';
import Loading from '../../../components/page/Loading';
import NextLink from '../../../components/typography/NextLink';
import { useAuthAPI } from '../../../util/AuthAPIContext';
import Page from '../../../components/page/Page';
import Title from '../../../components/typography/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Paragraph from '../../../components/typography/Paragraph';
import Stars from '../../../components/page/Stars';
import Button from '../../../components/inputs/Button';
import SubTitle from '../../../components/typography/SubTitle';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

const Hotels = () => {
  const { authGet, authDelete } = useAuthAPI();

  const router = useRouter();

  const { data, error, mutate } = useSWR('hotels', authGet);

  const onDeleteHotel = useCallback(
    async (hotel) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${hotel.attributes.name}?`
        )
      ) {
        return;
      }

      const result = await authDelete('hotels', hotel.id);

      if (result) {
        mutate();
      }
    },
    [authDelete, mutate]
  );

  const onCreateHotel = useCallback(() => {
    router.push('/admin/hotels/create');
  }, [router]);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotels</div>;
  }

  const hotels = data.data;

  return (
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Hotels</Title>

      <Button onClick={onCreateHotel}>Create hotel</Button>

      <div className={styles.Hotels}>
        {hotels.map((hotel) => {
          const {
            id,
            attributes: { name, price, stars },
          } = hotel;

          return (
            <div key={id} className={styles.Hotel}>
              <SubTitle>{name}</SubTitle>

              <Stars stars={stars} />

              <Paragraph>Price: {price} NOK</Paragraph>

              <div className={styles.HotelButtons}>
                <NextLink
                  className={styles.EditHotelLink}
                  key={id}
                  href={{ pathname: '/admin/hotels/[id]', query: { id } }}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={styles.EditHotelIcon}
                  />
                  Edit
                </NextLink>

                <Button color="red" onClick={() => onDeleteHotel(hotel)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default Hotels;
