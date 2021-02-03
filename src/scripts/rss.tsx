import fs from 'fs';
import path from 'path';
import {Feed} from 'feed';
import Config from '../config';
import {PostCollectionScripted} from '../posts';
import {renderToString} from '../mdx/render-to-string';
import {getPostFullUrl} from '../utils';
import {DEST} from './common';

const year = new Date().getFullYear();

const author = {
  name: 'Anton Kulyk',
  email: Config.EMAIL,
};

const feed = new Feed({
  title: 'Anton Kulyk',
  description: '',
  id: Config.SITE_URL,
  link: Config.SITE_URL,
  language: 'en',
  image: Config.getUrl('me-min.jpg'),
  favicon: Config.getUrl('me-min.jpg'),
  copyright: `All rights reserved ${year}, Anton Kulyk`,
  author,
});

feed.addCategory('Technology');
feed.addCategory('Engineering');
feed.addCategory('Software');
feed.addCategory('Code');

async function generate(): Promise<void> {
  const collection = new PostCollectionScripted();
  const posts = await collection.getAllPostsWithContent();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  posts.forEach(async ({post, content}) => {
    const formattedContent = await renderToString(content, {scope: post});
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: getPostFullUrl(post.slug),
      description: post.description,
      content: formattedContent.renderedOutput,
      author: [author],
      date: new Date(post.publishedAt),
    });
  });

  fs.writeFileSync(path.join(DEST, 'feed.xml'), feed.rss2());
}

generate();
