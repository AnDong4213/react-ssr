import type { NextWebVitalsMetric } from 'next/app';
import Layout from 'components/layout';
import { NextPage } from 'next';
import { StoreProvider } from 'store/index';
import ErrorBoundary from 'components/ErrorBoundary';
import '../styles/globals.css';

interface IProps {
  initialValue: Record<any, any>;
  Component: NextPage;
  pageProps: any;
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // console.log(metric);

  if (metric.label === 'web-vital') {
    console.log('metric', metric);
  }
  /* switch (metric.name) {
    case 'FCP':
      console.log('FCP', metric);
      break;
    case 'LCP':
      console.log('LCP', metric);
      break;
    case 'CLS':
      console.log('CLS', metric);
      break;
    case 'FID':
      console.log('FID', metric);
      break;
    case 'TTFB':
      console.log('TTFB', metric);
      break;
    default:
      break;
  }

  const body = JSON.stringify(metric);
  const url = 'https://xxxx.com';
  console.log(body, url); */

  // 这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（unload）文档之前向 Web 服务器发送数据。
  /* if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  } */
}

function MyApp({ initialValue, Component, pageProps }: IProps) {
  const renderLayout = () => {
    if ((Component as any).layout === null) {
      return <Component {...pageProps} />;
    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
  };

  return (
    <ErrorBoundary>
      <StoreProvider initialValue={initialValue}>
        {renderLayout()}
      </StoreProvider>
    </ErrorBoundary>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  // console.log('ctx----', ctx?.req.cookies);
  const { userId, nickname, avatar } = ctx?.req?.cookies || {};

  return {
    initialValue: {
      user: {
        userInfo: { userId, nickname, avatar },
      },
    },
  };
};

export default MyApp;
