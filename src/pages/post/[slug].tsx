import {NextPage, GetStaticPaths, GetStaticProps} from 'next';
import dynamic from 'next/dynamic';
import {NextSeo} from 'next-seo';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import Config from '../../config';
import {PostCollection, Post as PostType} from '../../posts';
import {hydrate} from '../../mdx/hydrate';
import {renderToString, MdxSource} from '../../mdx/render-to-string';
import {useTheme} from '../../theming';
import Emoji from '../../components/Emoji';
import Layout from '../../components/Layout';
import Newsletter from '../../components/Newsletter';
import {getPostFullUrl} from '../../utils';

const LINE_HEIGHT = 1.65;

const PublishedAt = dynamic(() => import('../../components/PublishedAt'), {
  ssr: false,
});

function ShareSection({url}: {url: string}): React.ReactElement {
  return (
    <>
      <section id="share-root">
        <h2 id="hey">Do you have a moment?</h2>
        <div id="share-container">
          <p id="share-title">
            Hi, I&apos;m new to blogging. If you enjoyed the post, please share
            it on Facebook or Twitter, it will help me a lot{' '}
            <Emoji name="pray">🙏</Emoji>
          </p>
          <div>
            <TwitterShareButton url={url} style={{marginRight: 16}}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <FacebookShareButton url={url}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
          </div>
        </div>
      </section>
      <style jsx>{`
        #share-root {
          margin-top: 80px;
        }

        #share-container {
          display: flex;
          justify-content: space-between;
        }

        #hey {
          padding-bottom: 16px;
        }

        #share-title {
          flex: 0.8;
          line-height: 1.5em;
        }
      `}</style>
    </>
  );
}

type PostPageProps = {
  post: PostType;
  content: MdxSource;
};

const Post: NextPage<PostPageProps> = (props: PostPageProps) => {
  const {post, content} = props;
  const {title, description} = post;
  const {theme} = useTheme();
  const postUrl = getPostFullUrl(post.slug);
  // const mdx = useMemo(() => hydrate(content), [content]);
  return (
    <>
      <NextSeo
        canonical={postUrl}
        openGraph={{
          title,
          description,
          type: 'website',
          locale: 'en_US',
          url: postUrl,
          site_name: 'Anton Kulyk',
          images: [{url: Config.getUrl(`banners/${post.banner}`)}],
        }}
        twitter={{
          handle: '@anton_kulyk',
          site: '@anton_kulyk',
          cardType: 'summary_large_image',
        }}
      />
      <Layout title={title} description={description}>
        <h1>{title}</h1>
        <div className="about-article">
          <h3 className="description secondary">{description}</h3>
          <PublishedAt publishedAt={post.publishedAt} />
        </div>
        <article id="post">{hydrate(content)}</article>
        <ShareSection url={postUrl} />
        <Newsletter />
      </Layout>
      <style jsx global>{`
        .about-article {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 12px;
        }

        .description {
          display: flex;
          flex: 0.9;
        }

        #post {
          margin-top: 20px;
        }

        #post > h1,
        #post > h2,
        #post > h3,
        #post > h4,
        #post > h5,
        #post > h6 {
          margin: 36px 0 10px 0;
        }

        #post > p {
          line-height: ${LINE_HEIGHT};
          margin: 0px 0 24px 0;
        }

        #post li {
          line-height: ${LINE_HEIGHT};
          margin: 10px 0;
        }

        #post > blockquote {
          background-color: ${theme.code.background};
          color: ${theme.code.text};
          border-radius: 6px;
          padding: 12px 18px;
          text-align: left;
          white-space: pre-wrap;
          word-spacing: normal;
          word-break: normal;
          margin: 0;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0;
          margin-inline-end: 0;
        }

        #post > blockquote > p {
          margin: 0.5em 1em !important;
        }
      `}</style>
    </>
  );
};

type UrlQuery = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const collection = new PostCollection();
  const slugs = collection.getAllPostSlugs();
  const paths = slugs.map(slug => ({
    params: {slug},
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  UrlQuery
> = async context => {
  const slug = context.params?.slug;
  if (!slug) {
    throw new Error('Post not found');
  }
  const collection = new PostCollection();
  const {post, content} = await collection.findBySlug(slug);
  const mdxContent = await renderToString(content, {scope: post});
  return {props: {post, content: mdxContent}};
};

export default Post;
