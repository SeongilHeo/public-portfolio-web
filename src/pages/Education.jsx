import { Button, Title } from '@/components';
import { education } from '@/data';

const Education = () => {

    return (
        <div className="pages">
            <section className="border-none">
                <Title name="Education" />
                <div className="md:px-10">
                    <ul className="flex flex-col gap-4 py-4">
                        {education.map((item) => (
                            <li key={item.key} className="flex gap-4 items-center">
                                <img src={item.icon} alt={item.key} className="w-16 h-16 p-2" />
                                <div className="text-sm flex flex-col gap-1">
                                    <h4>{item.degree} - {item.major}</h4>
                                    <p>{item.school}, {item.period}</p>
                                    <p>Supervisor:
                                        &nbsp; {item.supervisor} 
                                        {item.lab && <a href={item.labLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">&nbsp; @ {item.lab}</a> }
                                    </p>
                                    <Button title="Transcript" link={item.transcript} style="w-fit"/>
                                </div>
                            </li>
                        ))}
                  </ul>
                </div>

            </section>
        </div>
    );
};

export default Education;
