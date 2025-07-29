import { Button, Title } from '@/components'
import { publication } from '@/data';

const Publication = () => {
    // Sort years in descending order
    const years = Object.keys(publication).sort((a, b) => b - a);

    return (
        <div className="pages">
            <section className="border-none">
                <Title name="Publication" />
                <div className="md:px-10">
                    {years.map((year) => (
                        <div key={year} className="mb-12">
                            {/* year */}
                            <h3 className="text-2xl font-semibold mb-4">{year}</h3>

                            <ul className="space-y-6">
                                {Object.values(publication[year]).map((item) => (
                                    <li key={item.key} className="flex flex-col md:flex-row gap-6">
                                        {/* Thumbnail */}
                                        {item.thumbnail && (
                                            <img 
                                                src={item.thumbnail} 
                                                alt={`${item.key} thumbnail`} 
                                                className="w-full md:w-60 h-40 object-cover rounded-lg border-2 p-1"
                                            />
                                        )}

                                        {/* Publication Details */}
                                        <div className="flex-1 flex flex-col gap-1 text-sm">
                                            <h4>{item.title}</h4>
                                            <p>
                                                {item.authors.map((author, idx) =>
                                                    author === "Seongil Heo" ? (
                                                        <strong key={idx}>{author}</strong>
                                                    ) : (
                                                        <span key={idx}>{author}</span>
                                                    )
                                                ).reduce((prev, curr) => [prev, ', ', curr])}
                                            </p>
                                            <p>{item.venue}</p>
                                            {/* Links */}
                                            {item.links && <div className="mt-4 flex gap-2">
                                                {Object.entries(item.links).map(([key, value]) =>
                                                    value && <Button key={key} title={key} link={value} />
                                                )}
                                            </div>}
                                            {item.etc && (<p className="text-red-500"> {item.etc} </p>)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Publication;
