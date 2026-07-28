import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Editorial markdown renderer. Styling lives in `.prose-editorial` (globals.css);
 * here we only adjust structure (scrollable tables, safe external links).
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-editorial">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
          a: ({ href, children }) => {
            const external = !!href && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {children}
              </a>
            );
          },
          // Use display:block spans, not <figure>, since react-markdown nests
          // standalone images inside a <p> (a <figure> there is invalid HTML → hydration error).
          img: ({ src, alt }) => (
            <span className="md-figure">
              {/* Local, pre-sized assets — plain img keeps the build fully static. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={typeof src === 'string' ? src : ''} alt={alt ?? ''} loading="lazy" />
              {alt ? <span className="md-cap">{alt}</span> : null}
            </span>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
