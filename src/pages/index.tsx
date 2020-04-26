import {NextPage} from 'next';
import {format, parseISO} from 'date-fns';
import {Post} from '../types';
import {Emoji, Layout} from '../components';
import FAKE_POSTS from '../fakePosts';

function Intro(): React.ReactElement {
  return (
    <section>
      <p className="intro">
        Hi, I&apos;m Anton <Emoji name="wave">👋</Emoji> I&apos;m a full-stack
        software engineer currently leading the software team at{' '}
        <a href="https://pix.style" target="_blank" rel="noopener noreferrer">
          Pix
        </a>
        . We combine creativity with portability through our backpacks with LED
        screens you can control with your phone.
      </p>
      <p className="intro">
        Here I write about better ways to build software I found while coding,
        learning and talking to other people. Primarily I work with React, React
        Native and Node.js. Here is my{' '}
        <a
          href="https://github.com/kulyk"
          target="_blank"
          rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
      <p className="intro">
        If you want to get in touch,{' '}
        <a href="mailto:kuliks.anton@gmail.com">send me an email</a>.
      </p>
      <style jsx>{`
        .intro {
          line-height: 1.5;
          font-size: 1.2rem;
          margin-top: 1rem;
        }
        .intro:first-child {
          margin-top: 0;
        }
      `}</style>
    </section>
  );
}

type ArticlePreviewProps = {
  post: Post;
};

function ArticlePreview(props: ArticlePreviewProps): React.ReactElement {
  const {title, description} = props.post;
  const publishedDate = parseISO(props.post.publishedAt);
  const publishedAt = format(publishedDate, 'dd MMMM');
  return (
    <>
      <div className="article-preview">
        <div>
          <h2 className="title">{title}</h2>
          <p className="secondary description">{description}</p>
        </div>
        <p className="secondary">{publishedAt}</p>
      </div>
      <style jsx>{`
        .article-preview {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px;
          margin: 8px 0 8px 0;
        }
        .article-preview:hover {
          background-color: rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }
        .title {
          font-weight: 500;
          font-size: 1.2rem;
        }
        .secondary {
          color: rgba(0, 0, 0, 0.6);
        }
        .description {
          margin-top: 3px;
        }
      `}</style>
    </>
  );
}

type ArticlesBlockProps = {
  posts: Post[];
};

function Articles(props: ArticlesBlockProps): React.ReactElement {
  const renderPreview = (post: Post): React.ReactElement => (
    <ArticlePreview key={post.id} post={post} />
  );

  return (
    <>
      <section id="articles">
        <h1>Articles</h1>
        {props.posts.map(renderPreview)}
      </section>
      <style jsx>{`
        h1 {
          padding-bottom: 5px;
        }
        #articles {
          margin-top: 50px;
        }
      `}</style>
    </>
  );
}

type HomePageProps = {
  posts: Post[];
};

const Home: NextPage<HomePageProps> = (props: HomePageProps) => (
  <Layout>
    <Intro />
    <Articles posts={props.posts} />
  </Layout>
);

export function getStaticProps(): {props: HomePageProps} {
  return {
    props: {
      posts: FAKE_POSTS,
    },
  };
}

export default Home;