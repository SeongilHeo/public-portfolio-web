import { Button, Title, Markdown } from '@/components'
import { project } from '@/data';

const Project = () => {
    return (
        <div className="pages">
            <section className="border-none">
                <Title name="Projects" />
                <div className="md:px-10">
                    <ul className="space-y-10">
                        {project.map((item, idx) => (
                            <li key={idx} className="flex flex-col md:flex-row gap-6">
                                {/* Thumbnail */}
                                {item.thumbnail && (
                                    <img
                                        src={item.thumbnail}
                                        alt={`${item.title} thumbnail`}
                                        className="w-full md:w-60 h-40 object-cover rounded-lg border-2 p-1"
                                    />
                                )}

                                {/* Project Details */}
                                <div className="flex-1 flex flex-col justify-between text-sm">
                                    <div className="flex flex-col gap-1">
                                        <h4>{item.title}</h4>
                                        <p><Markdown content={item.institution} /></p>
                                        <p>
                                            {item.members.map((member, idx) =>
                                                member.includes("Seongil Heo") ? (
                                                    <strong key={idx}><Markdown content={member} components={{ p: ({ node, ...props }) => <span {...props} /> }} /></strong>
                                                ) : (
                                                    <span key={idx}><Markdown content={member} components={{ p: ({ node, ...props }) => <span {...props} /> }} /></span>
                                                )
                                            ).reduce((prev, curr) => [prev, ', ', curr])}
                                        </p>
                                        <p className="text-gray-500">{item.period}</p>
                                        {item.keywords && item.keywords.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {item.keywords.map((kw, kidx) =>
                                                    kw ? (
                                                        <span
                                                            key={kidx}
                                                            className="text-xs bg-stone-200 px-2 py-1 rounded"
                                                        >
                                                            {kw}
                                                        </span>
                                                    ) : null
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Links */}
                                    {item.links && <div className="mt-4 flex gap-2">
                                        {Object.entries(item.links).map(([key, value]) =>
                                            value && <Button key={key} title={key} link={value} />
                                        )}
                                    </div>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Project;
