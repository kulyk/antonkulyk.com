import * as React from 'react';
import {Card} from './Card';
import Emoji from './Emoji';

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
  {
    title: 'Blood, Sweat, and Pixels',
    url:
      'https://www.amazon.com/Blood-Sweat-Pixels-Triumphant-Turbulent/dp/0062651234',
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
              <a href={book.url} target="_blank" rel="noreferrer">
                {book.title}
              </a>
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
