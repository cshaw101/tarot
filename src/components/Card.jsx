import React from 'react';

const Card = ({ frontImage, backImage, name, onClick, isRevealed, isInHand }) => {
  return (
    <div
      className={`w-[90px] h-[144px] sm:w-[110px] sm:h-[176px] cursor-pointer transition-transform duration-300 transform ${isInHand ? 'active:scale-95' : ''} card-glow`}
      onClick={onClick}
      role="button"
      aria-label={isInHand ? `Place ${name} in slot` : `Flip ${name}`}
    >
      <div className="w-full h-full rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
        <img
          src={isRevealed ? frontImage : backImage}
          alt={name}
          className={`w-full h-full ${isRevealed ? 'object-contain' : 'object-cover'} transition-opacity duration-300`}
        />
      </div>
    </div>
  );
};

export default Card;