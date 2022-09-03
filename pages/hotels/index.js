import styles from '../../styles/Hotels.module.css';
import useSWR from 'swr';
import { useAPI } from '../../util/APIContext';
import { HolidazeHead } from '../../components/page/Head';
import Nav from '../../components/page/Nav';
import Loading from '../../components/page/Loading';
import NextLink from '../../components/typography/NextLink';
import Page from '../../components/page/Page';
import Title from '../../components/typography/Title';
import SubTitle from '../../components/typography/SubTitle';
import Stars from '../../components/page/Stars';
import Paragraph from '../../components/typography/Paragraph';
import HotelImage from '../../components/page/HotelImage';
import Footer from '../../components/page/Footer';

const Hotels = () => {
  const { get } = useAPI();

  const { data, error } = useSWR('hotels', get);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotels</div>;
  }

  const hotels = data.data;

  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>Holidaze hotels</Title>

      <div className={styles.Hotels}>
        {hotels.map((hotel) => {
          const {
            id,
            attributes: { name, image },
          } = hotel;

          const imageUrl = image.data
            ? image.data.attributes.formats.small.url
            : '/placeholder.png';

          return (
            <NextLink
              key={id}
              href={{ pathname: '/hotels/[id]', query: { id } }}
            >
              <div className={styles.Hotel}>
                <SubTitle>{name}</SubTitle>

                <HotelImage
                  src={imageUrl}
                  alt="A picture of the hotel"
                  width={300}
                  height={300}
                />

                <div className={styles.HotelInfo}>
                  <Stars stars={hotel.attributes.stars} />

                  <Paragraph>
                    Price:{' '}
                    <span className={styles.Bold}>
                      {hotel.attributes.price}
                    </span>{' '}
                    NOK
                  </Paragraph>
                </div>
              </div>
            </NextLink>
          );
        })}
      </div>

      <Footer />
    </Page>
  );
};

export default Hotels;
