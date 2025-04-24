import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import backOfCard from './assets/backOfCard/back.jpg';
import './App.css';

const App = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [placedCards, setPlacedCards] = useState([null, null, null, null, null]);
  const [revealed, setRevealed] = useState({});

  // Load tarot card images
  useEffect(() => {
    const images = import.meta.glob('./assets/tarot/*.jpg', { eager: true });
    const cardList = Object.entries(images).map(([path, module]) => {
      const name = path.split('/').pop().replace('.jpg', '');
      return {
        name: `Card ${name}`,
        image: module.default,
      };
    });
    setDeck(cardList);
  }, []);

  // Deal 5 random cards
  const handleDeal = () => {
    if (hand.length > 0 || placedCards.some(card => card !== null)) return;
    const shuffled = [...deck].sort(() => 0.5 - Math.random());
    const drawnCards = shuffled.slice(0, 5);
    setHand(drawnCards);
  };

  // Place a card from hand to a slot
  const handlePlace = (card, handIndex) => {
    const nextEmptySlot = placedCards.findIndex(slot => slot === null);
    if (nextEmptySlot === -1) return;
    const newPlacedCards = [...placedCards];
    newPlacedCards[nextEmptySlot] = card;
    setPlacedCards(newPlacedCards);
    setHand(prev => prev.filter((_, i) => i !== handIndex));
  };

  // Flip a placed card
  const handleFlip = (index) => {
    setRevealed(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Shuffle (reset game)
  const handleShuffle = () => {
    setHand([]);
    setPlacedCards([null, null, null, null, null]);
    setRevealed({});
  };

  return (
    <div className="w-screen h-screen bg-pumpkin overflow-hidden flex flex-col items-center justify-center m-0 p-0">


      {/* Tarot Table */}
      <div className="table-container w-full h-full p-0 m-0 flex flex-col items-center justify-center">

        {/* Header */}
        <h1 className="text-base sm:text-2xl font-pumpkin text-amber-200 mb-2 sm:mb-4">🎃 Enchanted Pumpkin Tarot</h1>

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-3 sm:mb-6">
          <button
            className="lantern-button bg-orange-800 text-amber-200 disabled:bg-gray-600"
            onClick={handleDeal}
            disabled={hand.length > 0 || placedCards.some(card => card !== null)}
          >
            Deal Cards
          </button>
          <button
            className="lantern-button bg-orange-800 text-amber-200"
            onClick={handleShuffle}
          >
            Shuffle
          </button>
        </div>

      {/* Placed Cards (Table Slots) */}
<div className="flex flex-col items-center justify-center gap-2 sm:gap-4 flex-1">
  {/* Top row: 3 cards */}
  <div className="flex justify-center items-center gap-2 sm:gap-4">
    {placedCards.slice(0, 3).map((card, index) => (
      <div
        key={index}
        className="w-[80px] h-[128px] sm:w-[130px] sm:h-[200px]
 bg-orange-900 rounded-lg flex items-center justify-center"
      >
        {card ? (
          <Card
            frontImage={card.image}
            backImage={backOfCard}
            name={card.name}
            onClick={() => handleFlip(index)}
            isRevealed={revealed[index] || false}
            isInHand={false}
          />
        ) : (
          <span className="text-amber-300 text-xs sm:text-sm">Empty</span>
        )}
      </div>
    ))}
  </div>

  {/* Bottom row: 2 cards, slightly indented */}
  <div className="flex justify-center items-center gap-2 sm:gap-4 mt-1 sm:mt-2 pl-6 sm:pl-12">
    {placedCards.slice(3, 5).map((card, index) => (
      <div
        key={index + 3}
        className="w-[80px] h-[128px] sm:w-[130px] sm:h-[200px]
 bg-orange-900 rounded-lg flex items-center justify-center"
      >
        {card ? (
          <Card
            frontImage={card.image}
            backImage={backOfCard}
            name={card.name}
            onClick={() => handleFlip(index + 3)}
            isRevealed={revealed[index + 3] || false}
            isInHand={false}
          />
        ) : (
          <span className="text-amber-300 text-xs sm:text-sm">Empty</span>
        )}
      </div>
    ))}
  </div>
</div>


        {/* Hand (Bottom Row) */}
        <div className="fixed bottom-0 left-0 w-full bg-pumpkin bg-opacity-80 py-2 sm:static sm:bg-transparent sm:py-0">
          <div className="flex flex-row justify-center items-center gap-1 sm:gap-2">
            {hand.length > 0 ? (
              hand.map((card, index) => (
                <Card
                  key={index}
                  frontImage={card.image}
                  backImage={backOfCard}
                  name={card.name}
                  onClick={() => handlePlace(card, index)}
                  isRevealed={false}
                  isInHand={true}
                />
              ))
            ) : (
              <p className="text-amber-200 text-xs sm:text-base">Click "Deal Cards" to begin!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;