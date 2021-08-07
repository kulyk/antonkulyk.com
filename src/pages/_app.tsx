import {AppProps} from 'next/app';
import {DefaultSeo} from 'next-seo';
import Config from '../config';
import {ThemeProvider} from '../theming';
import {useAnalytics} from '../hooks/useAnalytics';

const fonts = [
  'Inter',
  '-apple-system',
  'BlinkMacSystemFont',
  "'Inter'",
  "'Helvetica Neue'",
  "'Helvetica'",
  "'Arial'",
  'sans-serif',
];

function App({Component, pageProps}: AppProps): React.ReactElement {
  useAnalytics();
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Anton Kulyk"
        defaultTitle="Anton Kulyk"
        description={[
          'Software engineer from Kyiv, Ukraine.',
          'Writing about better ways to build software.',
          'TypeScript, JavaScript, React, React Native, Node.js',
        ].join(' ')}
        canonical={Config.SITE_URL}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: Config.SITE_URL,
          site_name: 'Anton Kulyk',
          images: [
            {
              url: Config.getUrl('banners/main.png'),
            },
          ],
        }}
        twitter={{
          handle: Config.TWITTER_USERNAME,
          site: Config.TWITTER_USERNAME,
          cardType: 'summary_large_image',
        }}
      />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: ${fonts.join(', ')};
          -webkit-font-smoothing: antialiased;
          font-display: swap;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
          padding: 0;
          color: rgb(224, 224, 222);
        }

        a {
          text-decoration: none;
        }

        button {
          border-style: none;
          padding: 5px 10px;
          font-size: 1rem;
          border-radius: 5px;
        }

        button:hover {
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.3;
        }

        input {
          border-style: solid;
          border-width: 1px;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 1rem;
        }
      `}</style>
    </>
  );
}

export default App;
