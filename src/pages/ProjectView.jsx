import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Markdown, Spinner, TableOfContents } from '@/components';
import { project } from '@/data';
import PageNotFound from '@/pages/PageNotFound';

// Simple slugify utility to avoid external dependency
const slugifyText = text =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

const HeadingWithLink = level => {
  const Tag = `h${level}`;
  return ({ node, children, ...props }) => {
    const text = React.Children.toArray(children).join('');
    const id = slugifyText(text);
    return (
      <Tag id={id} {...props} className={`mt-8 mb-4 text-${4 - level}xl`}>
        <a href={`#${id}`}>
          {children}
        </a>
      </Tag>
    );
  };
};

const Title = ({ data }) => {
    return (
        <div align="center" className="flex flex-col gap-4 text-lg mb-20">
            <h1>{data.title}</h1>
            <p>
                {data.members.map((member, idx) =>
                    member.includes("Seongil Heo") ? (
                        <strong key={idx}><Markdown content={member} components={{ p: ({ node, ...props }) => <span {...props} /> }} /></strong>
                    ) : (
                        <span key={idx}><Markdown content={member} components={{ p: ({ node, ...props }) => <span {...props} /> }} /></span>
                    )
                ).reduce((prev, curr) => [prev, ', ', curr])}
            </p>
            <p><strong><Markdown content={data.institution} /></strong></p>
            {data.links && <div className="flex gap-2 justify-center">
                {Object.entries(data.links).map(([key, value]) =>
                    (key!== "Page" && value) && <Button key={key} title={key} link={value} style={"px-4 py-2 "}/>
                )}
            </div>}
        </div>
    );
};

const ProjectView = () => {
    const { key } = useParams();
    const [meta, setMeta] = useState(null);
    const [markdown, setMarkdown] = useState('');
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchMarkdown = async () => {
            const response = await fetch(`/content/${key}/main.md`);

            const contentType = response.headers.get('Content-Type') || '';

            if (response.ok && contentType.includes('text/markdown')) {
                const text = await response.text();
                const data = project.find(item => item.key.trim() === key.trim());
                document.title = data.title;
                setMeta(data);
                setMarkdown(text);
                setNotFound(false);
            } else {
                setNotFound(true);
            }
        };

        fetchMarkdown();
    }, [key]);
    
    return (
        <div className="pages">
            {notFound ? (
                <PageNotFound />
            ) : meta ? (
                <div className="max-w-full lg:max-w-4xl mx-auto mb-20 overflow-hidden">
                    <TableOfContents />
                    <Title data={meta} />
                    <div id="md-content" className="space-y-8">
                        <Markdown content={markdown} components={
                            {
                                h1: HeadingWithLink(1),
                                h2: HeadingWithLink(2),
                                h3: HeadingWithLink(3),
                                p: ({ node, children, ...props }) => {
                                  // if a paragraph only contains an image or figure, render children without wrapping in <p>
                                  if (
                                    node.children &&
                                    node.children.length === 1 &&
                                    ['img', 'figure'].includes(node.children[0].tagName)
                                  ) {
                                    return <>{children}</>;
                                  }
                                  return <p {...props}>{children}</p>;
                                },
                                img: ({ node, ...props }) => {
                                  return (
                                    <figure className="flex flex-col gap-2 items-center justify-center text-slate-700 my-4">
                                      <img {...props} className="max-h-96" />
                                      {props.alt && (
                                        <figcaption className="text-sm">
                                          Figure {props.alt}
                                        </figcaption>
                                      )}
                                    </figure>
                                  );
                                },
                                ul: ({ node, ...props }) => (
                                    <ul {...props} className="list-disc list-inside" />
                                ),
                                h4: ({ node, ...props }) => (
                                    <h4 {...props} className="mb-2" />
                                ),
                                h5: ({ node, ...props }) => (
                                    <h5 {...props} className="mb-2" />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong {...props} className="font-semibold" />
                                ),
                            }
                        } />
                    </div>
                </div>
            ) : (
                <div className="w-full h-full">
                    <Spinner/>
                </div>
            )}
        </div>
    );
};

export default ProjectView;
