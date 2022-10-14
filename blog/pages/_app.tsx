// import type { AppProps } from 'next/app';
import Layout from 'components/layout';
import { NextPage } from 'next';
import { StoreProvider } from 'store/index';
import '../styles/globals.css';

interface IProps {
  initialValue: Record<any, any>;
  Component: NextPage;
  pageProps: any;
}

function MyApp({ initialValue, Component, pageProps }: IProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  console.log('ctx----', ctx?.req.cookies);
  const { userId, nickname, avatar } = ctx?.req.cookies;

  return {
    initialValue: {
      user: {
        userInfo: { userId, nickname, avatar },
      },
    },
  };
};

export default MyApp;
