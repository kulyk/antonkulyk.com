import ExternalLink, {ExternalLinkProps} from './ExternalLink';

function ShareButton(props: ExternalLinkProps): React.ReactElement {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <ExternalLink className="share-btn" {...props} />
      <style jsx global>{`
        .share-btn svg {
          width: 2.5rem;
          height: 2.5rem;
          fill: rgba(58, 58, 60, 1);
        }
        .share-btn svg:hover {
          fill: rgba(58, 58, 60, 0.6);
        }
      `}</style>
    </>
  );
}

type ShareButtonProps = React.HTMLAttributes<HTMLAnchorElement> & {
  url: string;
};

export function TwitterShareButton({
  url,
  ...props
}: ShareButtonProps): React.ReactElement {
  const u = encodeURIComponent(url);
  return (
    <ShareButton {...props} href={`https://twitter.com/share?url=${u}`}>
      <svg
        height="512pt"
        viewBox="0 0 512 512"
        width="512pt"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm116.886719 199.601562c.113281 2.519532.167969 5.050782.167969 7.59375 0 77.644532-59.101563 167.179688-167.183594 167.183594h.003906-.003906c-33.183594 0-64.0625-9.726562-90.066406-26.394531 4.597656.542969 9.277343.8125 14.015624.8125 27.53125 0 52.867188-9.390625 72.980469-25.152344-25.722656-.476562-47.410156-17.464843-54.894531-40.8125 3.582031.6875 7.265625 1.0625 11.042969 1.0625 5.363281 0 10.558593-.722656 15.496093-2.070312-26.886718-5.382813-47.140624-29.144531-47.140624-57.597657 0-.265624 0-.503906.007812-.75 7.917969 4.402344 16.972656 7.050782 26.613281 7.347657-15.777343-10.527344-26.148437-28.523438-26.148437-48.910157 0-10.765624 2.910156-20.851562 7.957031-29.535156 28.976563 35.554688 72.28125 58.9375 121.117187 61.394532-1.007812-4.304688-1.527343-8.789063-1.527343-13.398438 0-32.4375 26.316406-58.753906 58.765625-58.753906 16.902344 0 32.167968 7.144531 42.890625 18.566406 13.386719-2.640625 25.957031-7.53125 37.3125-14.261719-4.394531 13.714844-13.707031 25.222657-25.839844 32.5 11.886719-1.421875 23.214844-4.574219 33.742187-9.253906-7.863281 11.785156-17.835937 22.136719-29.308593 30.429687zm0 0" />
      </svg>
    </ShareButton>
  );
}

export function FacebookShareButton({
  url,
  ...props
}: ShareButtonProps): React.ReactElement {
  const u = encodeURIComponent(url);
  const link = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
  return (
    <ShareButton {...props} href={link}>
      <svg
        enableBackground="new 0 0 512 512"
        height="512"
        viewBox="0 0 512 512"
        width="512"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m512 256c0-141.4-114.6-256-256-256s-256 114.6-256 256 114.6 256 256 256c1.5 0 3 0 4.5-.1v-199.2h-55v-64.1h55v-47.2c0-54.7 33.4-84.5 82.2-84.5 23.4 0 43.5 1.7 49.3 2.5v57.2h-33.6c-26.5 0-31.7 12.6-31.7 31.1v40.8h63.5l-8.3 64.1h-55.2v189.5c107-30.7 185.3-129.2 185.3-246.1z" />
      </svg>
    </ShareButton>
  );
}
