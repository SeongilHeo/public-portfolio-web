import ReactGA from 'react-ga4';

export const initGA = () => {
    const gaId = import.meta.env.VITE_GA_ID;
    if (!gaId) {
        console.warn('VITE_GA_ID is not defined. Skipping Google Analytics initialization.');
        return;
    }
    ReactGA.initialize(gaId);
};

export const trackPage = (path, title) => {
    ReactGA.send({
        hitType: 'pageview',
        page: path,
        title: title
    });
};