import { HolidazeHead } from '../components/page/Head';
import Nav from '../components/page/Nav';
import Title from '../components/typography/Title';
import Paragraph from '../components/typography/Paragraph';
import Page from '../components/page/Page';
import HotelImage from '../components/page/HotelImage';
import Footer from '../components/page/Footer';

const Home = () => {
  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>Holidaze</Title>

      <Paragraph>
        Welcome to Holidaze! A hotel booking site for local hotels here in
        lovely Bergen.
      </Paragraph>

      <HotelImage
        src="/bergen_frontpage.jpg"
        alt="A picture of Bergen"
        width={768}
        height={511}
      />

      <Paragraph>
        &quot;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.flickr.com/photos/54765068@N00/4390667762"
        >
          lille lungegårdsvann, bergen
        </a>
        &quot; by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.flickr.com/photos/54765068@N00"
        >
          vidart
        </a>
      </Paragraph>

      <Footer />
    </Page>
  );
};

export default Home;
