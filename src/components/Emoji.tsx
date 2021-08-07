/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import classNames from 'classnames';

type Props = {
  id?: string;
  className?: string;
  name: string;
  size?: string | number;
  children: string;
};

const defaultProps = {
  size: '1rem',
};

function isAppleDevice(): boolean {
  return /iPad|iPhone|iPod|Mac/.test(navigator.userAgent) && !window.MSStream;
}

// Repository: https://github.com/twitter/twemoji/
// Unicode: https://unicode.org/emoji/charts/full-emoji-list.html
const TWEEMOJI: Record<string, string> = {
  '❤️': '2764.svg',
  '📚': '1f4da.svg',
  '👋': '1f44b.svg',
  '🙏': '1f64f.svg',
  '🤦‍♂️': '1f926-200d-2642-fe0f.svg',
  '📬': '1f4ec.svg',
  '🧰': '1f9f0.svg',
  '✨': '2728.svg',
  '🇺🇦': '1f1fa-1f1e6.svg',
  '👽': '1f47d.svg',
  '🍺': '1f37a.svg',
  '🕺': '1f57a.svg',
  '🔥': '1f525.svg',
  '👻': '1f47b.svg',
  '🎸': '1f3b8.svg',
  '🐨': '1f428.svg',
  '💩': '1f4a9.svg',
  '😱': '1f631.svg',
  '🤩': '1f929.svg',
  '🌈': '1f308.svg',
  '👨‍💻': '1f468-200d-1f4bb.svg',
  '🦄': '1f984.svg',
};

function Emoji(props: Props): React.ReactElement {
  const {name, size, className, children, ...rest} = props;
  const finalClassName = classNames('emoji', className);
  const label = `${name} emoji`;

  if (typeof window === 'undefined' || isAppleDevice() || !TWEEMOJI[children]) {
    return (
      <>
        <span
          role="img"
          aria-label={label}
          className={finalClassName}
          {...rest}>
          {children}
        </span>
        <style jsx>{`
          span.emoji {
            font-size: ${size};
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <img
        src={`http://twemoji.maxcdn.com/2/svg/${TWEEMOJI[children]}`}
        alt={label}
        aria-label={label}
        className={finalClassName}
        {...rest}
      />
      <style jsx>{`
        img.emoji {
          width: ${size};
          height: ${size};
          margin: 0 2px;
        }
      `}</style>
    </>
  );
}

Emoji.defaultProps = defaultProps;

export default Emoji;
