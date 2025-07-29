import { useState, useEffect } from "react";

import { Button, Title } from '@/components'
import { experience } from "@/data";

const SubSection = ({ data, category}) => {
    return (
        <section section className="md:border-none" >
            <Title name={category} />
            <ul className="space-y-8">
                {data.map((item, idx) => (
                    <li
                        key={`${category}-${idx}`}
                        className="flex flex-col md:flex-row gap-4"
                    >
                        <div className="flex flex-col gap-1 text-sm">
                            {item.title && (<h4>{item.title}</h4>)}
                            {item.subtitle && (<p>{item.subtitle}</p>)}
                            <p>
                                {item.role && (<span>{item.role}</span>)}
                                {item.institution && (<span className="pl-1">@ {item.institution}</span>)}
                            </p>
                            {item.supervisor && (<p>Supervised by {item.supervisor}</p>)}
                            {item.location && (<p>{item.location}</p>)}
                            {item.period && (<p className="text-slate-500">{item.period}</p>)}
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
                            {item.description && (
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    {item.description.map((desc, didx) => (
                                        <li key={didx} className="text-stone-700">
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {/* Links */}
                            {item.links && <div className="flex gap-2">
                                {Object.entries(item.links).map(([key, value]) =>
                                    value && <Button key={key} title={key} link={value} />
                                )}
                            </div>}
                        </div>
                    </li>
                ))}
            </ul>
        </section >
    )
};

const Experience = () => {
    // Get all category names
    const categories = Object.keys(experience);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 48rem)");
        const onChange = (e) => setIsSmallScreen(e.matches);
        mql.addEventListener("change", onChange);
        // initialize
        setIsSmallScreen(mql.matches);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return (
        <div className="pages">
            {/* Tab Buttons */}
            <div className="hidden md:flex space-x-4 border-b">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`pb-2 ${
                            selectedCategory === category
                                ? "border-b-2 border-blue-500 font-semibold"
                                : "text-gray-600"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {isSmallScreen
                ? categories.map((category) => (
                    <SubSection
                        key={category}
                        data={experience[category]}
                        category={category}
                    />
                  ))
                : (
                    <SubSection
                        data={experience[selectedCategory]}
                        category={selectedCategory}
                    />
                  )
            }
        </div>
    );
};

export default Experience;
