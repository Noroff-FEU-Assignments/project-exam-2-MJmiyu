import { useRouter } from 'next/router';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/page/Head';
import HotelForm from '../../../components/forms/HotelForm';
import AdminNav from '../../../components/page/AdminNav';
import Loading from '../../../components/page/Loading';
import { useAuthAPI } from '../../../util/AuthAPIContext';
import Page from '../../../components/page/Page';
import Title from '../../../components/typography/Title';

const EditHotel = () => {
  const router = useRouter();
  const { id } = router.query;

  const { authGet } = useAuthAPI();

  const { data, error, mutate } = useSWR('hotels/' + id, authGet);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  const hotel = data.data;

  return (
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Edit hotel</Title>

      <HotelForm hotel={hotel} mutate={mutate} />
    </Page>
  );
};

export default EditHotel;
