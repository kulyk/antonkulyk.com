import * as React from 'react';
import {Card} from './Card';
import Emoji from './Emoji';
import ExternalLink from './ExternalLink';

type Book = {
  title: string;
  url: string;
};

const BOOKS: Book[] = [
  {
    title: 'Life 3.0: Being Human in the Age of AI',
    url:
      'https://www.amazon.com/Life-3-0-Being-Artificial-Intelligence/dp/1101946598',
  },
];

function ReadingNow(): React.ReactElement {
  return (
    <>
      <Card id="reading-now">
        <h4>
          <Emoji name="books">📚</Emoji> Now Reading
        </h4>
        <ul id="book-list">
          {BOOKS.map((book, i) => (
            <li key={i}>
              <ExternalLink href={book.url}>{book.title}</ExternalLink>
            </li>
          ))}
        </ul>
      </Card>
      <style jsx global>{`
        #reading-now-label {
          display: inline;
          font-weight: bold;
        }

        #reading-now {
          margin: 30px 0;
        }

        #book-list {
          list-style: none;
          margin: 6px 0 0 0;
          padding: 0;
        }

        #book-list > li {
          padding-top: 4px;
        }
      `}</style>
    </>
  );
}

export default ReadingNow;
