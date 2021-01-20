import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Layout>
        <Typography paragraph>main1</Typography>
        <Typography paragraph>main2</Typography>
      </Layout>
    </>
  );
}
