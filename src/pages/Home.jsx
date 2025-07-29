import { Link } from 'react-router-dom';

import { Markdown } from '@/components';
import { education, biography, news } from '@/data';
import { FontAwesomeIcon, iconMap } from '@/icons';

const Home = () => {
    // Slice to show only the top 5 items
    const topNews = news.slice(0, 3);

    return (
        <div className="pages">
            <section className="flex flex-col items-center md:flex-row gap-6 p-4">
                {/* Profile */}
                <div className="md:w-1/3 flex flex-col justify-center items-center gap-6">
                    <img src="/images/profile.jpeg" alt="profile" className="aspect-square w-80 rounded-full object-contain border-2 border-slate-900 shadow-2xl" />
                    <h1>Seongil Heo</h1>
                </div>
                <div className="md:w-2/3 flex flex-col justify-between gap-6">
                    {/* About Me */}
                    <div className="md:p-4 flex flex-col gap-4">
                        <Markdown content={biography.description} />
                    </div>
                    <div className="w-full flex flex-col md:flex-row gap-6">
                        {/* Interests */}
                        <div className="md:w-1/2">
                            <h2>Interests</h2>
                            <ul className="flex flex-col gap-4 py-4">
                                {biography.interests.map((item) => (
                                    <li key={item.key} className="flex gap-4 items-center">
                                        <FontAwesomeIcon icon={["fa", "book-open"]} />
                                        <span>{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Education */}
                        <div className="md:w-1/2">
                            <h2>Education</h2>
                            <ul className="flex flex-col gap-4 py-4">
                                {education.map((item) => (
                                    <li key={item.key} className="flex gap-4">
                                        <img src={item.icon} alt={item.key} className="w-10 h-10 p-2" />
                                        <div>
                                            <p>{item.degree} - {item.major}</p>
                                            <p> {item.school}, {item.period}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* News */}
            <section className="border-none">
                <h2 className="border-strong hover:border-blue-500 w-fit pb-2 px-1 mb-8 cursor-pointer">
                    <Link to="/news" >
                        News
                    </Link>
                </h2>
                <ul className="flex flex-col gap-4 p-4 relative">
                    {topNews.map((item, index) => (
                        <li key={`news-${index}`} className="flex gap-4 items-center">
                            <FontAwesomeIcon icon={iconMap[item.type]} />
                            <p>{item.date}{" - "} <Markdown content={item.title} components={{ p: ({ node, ...props }) => <span {...props} /> }} /></p>
                        </li>
                    ))}
                    <Link to="/news" >
                        <div className="absolute inset-0 transition-colors hover:bg-slate-200/70 duration-300 rounded-2xl flex items-center justify-center gap-4 text-2xl text-black/0 hover:text-black/100">
                            <FontAwesomeIcon icon={'newspaper'} />
                            More
                        </div>
                    </Link>
                </ul>
            </section>
        </div>
    );
};

export default Home;
