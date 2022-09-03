import Head from 'next/head';

const CustomHead = ({ admin }) => {
  return (
    <Head>
      <title>{admin ? 'Holidaze Admin' : 'Holidaze'}</title>
      <meta
        name="description"
        content={admin ? 'Admin page for holidaze' : 'Hotels in Bergen'}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export const HolidazeHead = () => {
  return <CustomHead />;
};

export const HolidazeAdminHead = () => {
  return <CustomHead admin />;
};
