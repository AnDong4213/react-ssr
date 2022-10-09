import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/layout';
import { NextPage } from 'next';

interface IProps {
  initialValue: Record<any, any>;
  Component: NextPage;
  pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
