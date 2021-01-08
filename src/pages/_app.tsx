import {AppProps} from 'next/app';
import Router from 'next/router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import withGA from 'next-ga';
import {DefaultSeo} from 'next-seo';
import Config from '../config';
import {ThemeProvider} from '../theming';

const fonts = [
  "'Inter'",
  '-apple-system',
  'BlinkMacSystemFont',
  "'Helvetica Neue'",
  "'Helvetica'",
  "'Arial'",
  'sans-serif',
];

function App({Component, pageProps}: AppProps): React.ReactElement {
  return (
    <>
      <DefaultSeo
        canonical={Config.SITE_URL}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: Config.SITE_URL,
          images: [
            {
              url: Config.getUrl('banners/main.png'),
            },
          ],
          site_name: 'Anton Kulyk',
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

export default withGA(process.env.NEXT_PUBLIC_ANALYTICS_ID, Router)(App);
