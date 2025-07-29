import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const Markdown = ({ content, components }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      skipHtml={false}
      components={{
        ol: ({ node, start, children, ...props }) => (
          <ol start={start} className="list-decimal list-inside mb-2" {...props}>
            {children}
          </ol>
        ),
        a: ({ node, ...props }) => (
          <a {...props} className="text-blue-500" />
        ),
        strong: ({ node, ...props }) => (
          <strong {...props} className="text-amber-500 font-semibold" />
        ),
        ...components, 
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
