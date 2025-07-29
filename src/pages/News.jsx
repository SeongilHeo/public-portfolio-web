import { Markdown, Title } from '@/components';
import { news } from '@/data';
import { FontAwesomeIcon, iconMap } from '@/icons';

const News = () => {
    return (
        <div className="pages">
            <section className="border-none">
                <Title name="News" />
                <div className="md:px-10">
                    <ul className="flex flex-col gap-10 p-4">
                        {news.map((item, index) => (
                            <li key={`news-${index}`} className="flex flex-col gap-4 border-l-4 pl-5">
                                <p className="flex flex-col md:flex-row gap-4">
                                    <span className="flex gap-4 items-center">
                                        <FontAwesomeIcon icon={iconMap[item.type]} />
                                        {item.date}
                                    </span>
                                    <span className="hidden md:block">{"-"}</span>
                                    <strong><Markdown content={item.title} components={{ p: ({ node, ...props }) => <span {...props} /> }}/></strong>
                                </p>
                                <Markdown content={item.description} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default News;
