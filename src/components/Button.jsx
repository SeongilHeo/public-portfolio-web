import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon, iconMap } from '@/icons'

const Button = ({title, link, style }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link.startsWith('/project')) {
      navigate(link);
    } else {
      window.open(link, '_blank');
    }
  };
  
  return (
    <button 
      onClick={handleClick} 
      className={`flex gap-2 items-center text-xs bg-slate-500 text-white rounded-lg px-2 py-1 hover:bg-white hover:text-slate-500 border border-slate-500 transition-colors duration-300 shadow-2xl ${style}`}
    >
      <FontAwesomeIcon icon={iconMap[title]} />
      {title}
    </button>
  );
};

export default Button;
