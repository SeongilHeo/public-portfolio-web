import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solidIcons, regularIcons, brandIcons } from './initIcons';
import { iconMap } from './iconMap';

library.add(...solidIcons, ...regularIcons, ...brandIcons);

export { FontAwesomeIcon, iconMap };
