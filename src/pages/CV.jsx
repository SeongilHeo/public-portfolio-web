import { Button, Title } from '@/components';
import { cv } from '@/data';

const CV = () => {

    return (
        <div className="pages">
            <div>
                <Title name="CV" />
                <div className="flex flex-col items-end gap-1 md:gap-2">
                    <Button title="Download" link={cv.pdf} style="text-sm px-2 py-1 md:px-4 md:py-2" />
                    <p>Last Update: {cv.updated}</p>
                </div>
            </div>
            <iframe
                src={cv.pdf}
                title="CV"
                className="aspect-a4 border-2 rounded-2xl"
                frameBorder="0"
            />
        </div>
    );
};

export default CV;
