import HotelForm from '../../../components/forms/HotelForm';
import { HolidazeAdminHead } from '../../../components/page/Head';
import AdminNav from '../../../components/page/AdminNav';
import Page from '../../../components/page/Page';
import Title from '../../../components/typography/Title';

const CreateHotel = () => {
  return (
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Create hotel</Title>

      <HotelForm />
    </Page>
  );
};

export default CreateHotel;
