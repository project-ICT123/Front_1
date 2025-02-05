import React from 'react';

const Card = ({ imageSrc, images, title , onClick }) => {
  return (
    <div
      className="bg-white shadow  lg:h-[250px] sm:h-[200px] h-[150px] rounded-xl flex flex-col items-center justify-center hover:shadow-2xl cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
        <div className="relative flex items-center justify-center">
            <img src={imageSrc} alt={title} className="w-16 sm:w-20" />
            { images && (
                <img src={images} alt={title} className="absolute -top-2 -right-2 w-5 sm:w-6" />
            )}
        </div>
        <h3 className="text-logocolor font-semibold mt-4 text-sm sm:text-base text-center">
            {title}
        </h3>
    </div>
  );
};

export default Card;
