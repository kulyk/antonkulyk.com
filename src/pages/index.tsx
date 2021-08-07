import {NextPage, GetStaticProps} from 'next';
import dynamic from 'next/dynamic';
import {NextSeo} from 'next-seo';
import Config from '../config';
import {PostCollection, Post} from '../posts';
import {useTheme} from '../theming';
import Emoji from '../components/Emoji';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import ReadingNow from '../components/ReadingNow';
import Link from '../components/Link';

const PublishedAt = dynamic(() => import('../components/PublishedAt'), {
  ssr: false,
});

function Intro(): React.ReactElement {
  return (
    <section>
      <p className="intro">
        Hi, I&apos;m Anton <Emoji name="wave">👋</Emoji> I&apos;m a software
        engineer from Kyiv, Ukraine <Emoji name="Ukraine flag">🇺🇦</Emoji>
      </p>
      <p className="intro">
        Here I write about better ways to build software I find while coding,
        learning and talking to other people. Here is my{' '}
        <ExternalLink href="https://github.com/kulyk">GitHub</ExternalLink>.
      </p>
      <p className="intro">
        If you want to get in touch,{' '}
        <a href={`mailto:${Config.EMAIL}`}>send me an email</a> or ping me on{' '}
        <ExternalLink href={`https://twitter.com/${Config.TWITTER_USERNAME}`}>
          Twitter
        </ExternalLink>
        .
      </p>
      <style jsx>{`
        .intro {
          line-height: 1.5;
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
  const {title, description, emoji, slug, publishedAt} = props.post;
  const {theme} = useTheme();
  return (
    <>
      <Link href={`/posts/${slug}`}>
        <div className="article-preview">
          <div className="article-preview-main">
            <h2 className="title">
              <Emoji name="" className="article-emoji">
                {emoji}
              </Emoji>
              {title}
            </h2>
            <PublishedAt publishedAt={publishedAt} />
          </div>
          <p className="secondary description">{description}</p>
        </div>
      </Link>
      <style jsx global>{`
        .article-preview {
          padding: 10px;
          margin: 8px 0 8px 0;
          border-radius: 8px;
        }
        .article-preview:hover {
          background-color: ${theme.background.hover};
          cursor: pointer;
        }
        .article-preview-main {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .title {
          flex: 1;
          font-weight: 500;
          font-size: 1.2rem;
        }
        .article-emoji {
          padding-right: 4px;
        }
        .description {
          margin-top: 8px;
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
    <ArticlePreview key={post.slug} post={post} />
  );

  return (
    <>
      <section id="articles">
        <h1>Writing</h1>
        {props.posts.map(renderPreview)}
      </section>
      <style jsx>{`
        h1 {
          padding-bottom: 5px;
        }
        #articles {
          margin-top: 12px;
        }
      `}</style>
    </>
  );
}

type HomePageProps = {
  posts: Post[];
};

const Home: NextPage<HomePageProps> = (props: HomePageProps) => (
  <>
    <NextSeo title="Home" />
    <Layout hasNewsletterSection>
      <Intro />
      <ReadingNow />
      <Articles posts={props.posts} />
    </Layout>
  </>
);

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const collection = new PostCollection();
  const posts = await collection.getAllPosts();
  return {
    props: {posts},
  };
};

export default Home;
