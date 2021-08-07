import {NextPage} from 'next';
import {NextSeo} from 'next-seo';
import Emoji from '../components/Emoji';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import {getUrl} from '../utils';

const About: NextPage<unknown> = () => {
  return (
    <>
      <NextSeo
        title="About"
        canonical={getUrl('about')}
        openGraph={{
          title: 'About',
          url: getUrl('about'),
        }}
      />
      <Layout>
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
          Currently I work at{' '}
          <ExternalLink href="https://metabase.com">Metabase</ExternalLink> —
          the fastest, easiest, open-source tool to share data and analytics
          inside your company.
        </p>
        <p>
          Also, I&apos;m a Ukrainian{' '}
          <a href="https://makerfaire.com">Maker Faire</a> producer & hackathons
          organizer.
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

export default About;
