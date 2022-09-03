import Nav from '../components/page/Nav';
import ContactForm from '../components/forms/ContactForm';
import { HolidazeHead } from '../components/page/Head';
import Title from '../components/typography/Title';
import Page from '../components/page/Page';
import Footer from '../components/page/Footer';

const Contact = () => {
  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>Contact us</Title>

      <ContactForm />

      <Footer />
    </Page>
  );
};

export default Contact;
