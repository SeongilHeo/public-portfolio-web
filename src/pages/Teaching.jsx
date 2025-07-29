import { Button, Title } from '@/components';
import { teaching } from '@/data';

const Teaching = () => {
    // Sort years in descending order
    const years = Object.keys(teaching).sort((a, b) => b - a);

    return (
        <div className="pages">
            <section className="border-none">
                <Title name="Teaching"/>
                <div className="md:px-10">

                {years.map((year) => (
                    <div key={year} className="mb-12">
                        {/* year */}
                        <h3 className="text-2xl font-semibold mb-4">{year}</h3>

                        <ul className="space-y-6">
                            {teaching[year].map((item) => (
                                <li key={item.key} className="flex items-center gap-4">
                                    {/* logo */}
                                    <img src={item.icon} alt={`${item.institution} logo`} className="w-12 h-12 object-contain" />

                                    {/* lecture information */}
                                    <div className="text-sm flex flex-col gap-1">
                                        <h4>{item.subject}</h4>
                                        <p>{item.role} @ {item.institution}</p>
                                        <p >Professor: {item.professor || 'N/A'}</p>
                                        <p className="text-slate-500">{item.period}</p>
                                        {item.link && (<Button title="Link" link={item.link} style="mt-4 w-fit" /> )}
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

export default Teaching;