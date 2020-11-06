import {NextPage} from 'next';
import {NextSeo} from 'next-seo';
import {Emoji, Layout} from '../components';
import {getUrl} from '../utils';

const Post: NextPage<unknown> = () => {
  return (
    <>
      <NextSeo
        canonical={getUrl('about')}
        openGraph={{
          title: 'About',
          url: getUrl('About'),
        }}
      />
      <Layout title="About">
        <h1>
          Hi <Emoji name="wave">👋</Emoji>
        </h1>
        <p>
          I&apos;m a software engineer. I wrote my first program in Visual Basic
          at the age of 15. At that moment I felt in love with programming and
          we were both (mostly) happy <Emoji name="laughing">😂</Emoji>
        </p>
        <p>
          I mostly work with JavaScript (React, React Native, Node.js) and
          Python (Django). I&apos;ve written code for{' '}
          <a href="https://pix.style">Pix</a>,{' '}
          <a href="https://spacenation.org">Space Nation</a> and other products,
          which unfortunately are under NDA.
        </p>
        <p>
          This is my personal corner on the Internet. Here I keep my thoughts
          and ideas about better ways to build software I find while coding,
          learning and talking to other people.
        </p>
      </Layout>
      <style jsx>{`
        h2,
        h3,
        h4,
        h5 {
          margin-top: 1rem;
        }
        p {
          line-height: 1.5;
          font-size: 1.2rem;
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};

export default Post;
