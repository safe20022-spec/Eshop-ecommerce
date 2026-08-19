import { useNavigate } from 'react-router-dom';
import type { CategoryBanner } from '../data/categoryBanners'; 

interface CategoryCardProps {
  item: CategoryBanner; 
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const { 
    id, 
    subtitle, 
    title, 
    bgTitle, 
    buttonText, 
    bgColor, 
    textColor, 
    buttonBg, 
    buttonTextColor, 
    imgUrl 
  } = item;

  const handleBrowse = () => {
    navigate(`/shop?category=${id}`);
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl ${bgColor} ${textColor} p-6 sm:p-8 flex flex-col justify-between h-80 group shadow-sm hover:shadow-xl transition-all duration-300`}>
      
      <div className="z-10 flex flex-col justify-between h-full items-start">
        <div>
          <span className="text-xs sm:text-sm font-semibold opacity-80 uppercase tracking-wider block mb-1">
            {subtitle}
          </span>
          <h3 className="text-xl sm:text-2xl font-black leading-tight mb-1">
            {title}
          </h3>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black opacity-20 uppercase tracking-wider select-none leading-none">
            {bgTitle}
          </h2>
        </div>

        <button
          onClick={handleBrowse}
          className={`${buttonBg} ${buttonTextColor} text-xs sm:text-sm font-extrabold px-7 py-3 rounded-full shadow-md transition-all duration-300 transform group-hover:scale-105 active:scale-95 cursor-pointer mt-4`}
        >
          {buttonText}
        </button>
      </div>

      <img 
        src={imgUrl} 
        alt={bgTitle} 
        className="absolute -right-2 -bottom-2 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain transform group-hover:scale-105 transition-transform duration-500 z-0 pointer-events-none"
      />
    </div>
  );
};