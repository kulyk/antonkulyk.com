const isDev = process.env.NODE_ENV === 'development';
const SITE_URL = isDev ? 'http://localhost:3000' : 'https://antonkulyk.com';

const CONFIG = {
  SITE_URL,
  EMAIL: 'kuliks.anton@gmail.com',
  TWITTER_USERNAME: '@anton_kulyk',
  getUrl: (str: string): string => `${SITE_URL}/${str}`,
};

export default CONFIG;
