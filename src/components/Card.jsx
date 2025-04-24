import React, { useState } from 'react';

const Card = ({ frontImage, backImage, name, onClick }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      onClick(name);
    }
  };

  return (
    <div
      className="w-[160px] h-[256px] cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="w-[160px] h-[256px] rounded-lg shadow-md overflow-hidden bg-white flex items-center justify-center">
        <div className="w-[160px] h-[256px] relative">
          <img
            src={isRevealed ? frontImage : backImage}
            alt={name}
            className="w-[160px] h-[256px] min-w-[160px] max-w-[160px] min-h-[256px] max-h-[256px] object-contain absolute top-0 left-0"
            style={{ width: '160px', height: '256px', aspectRatio: 'unset' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;