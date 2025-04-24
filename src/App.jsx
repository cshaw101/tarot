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
    <div className="min-h-screen bg-tarot flex flex-col items-center justify-between p-4 sm:p-6">
      {/* Tarot Table */}
      <div className="table-container relative w-full max-w-4xl rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center justify-between">
        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-tarot text-yellow-200 mb-4">🌙 Tarot Reading</h1>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            className="rune-button bg-purple-800 text-yellow-200 disabled:bg-gray-600"
            onClick={handleDeal}
            disabled={hand.length > 0 || placedCards.some(card => card !== null)}
          >
            Deal Cards
          </button>
          <button
            className="rune-button bg-purple-800 text-yellow-200"
            onClick={handleShuffle}
          >
            Shuffle
          </button>
        </div>

        {/* Placed Cards (Table Slots) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-6">
          {placedCards.map((card, index) => (
            <div
              key={index}
              className="w-[90px] h-[144px] sm:w-[110px] sm:h-[176px] bg-purple-900 rounded-lg flex items-center justify-center transform"
              style={{ transform: `rotate(${(index - 2) * 5}deg)` }}
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
                <span className="text-yellow-300">Empty</span>
              )}
            </div>
          ))}
        </div>

        {/* Hand (Bottom Row) */}
        <div className="flex justify-center items-center gap-1 smවන්න sm:gap-2">
          {hand.length > 0 ? (
            hand.map((card, index) => (
              <div
                key={index}
                className="transform"
                style={{ transform: `rotate(${(index - 2) * 5}deg)` }}
              >
                <Card
                  frontImage={card.image}
                  backImage={backOfCard}
                  name={card.name}
                  onClick={() => handlePlace(card, index)}
                  isRevealed={false}
                  isInHand={true}
                />
              </div>
            ))
          ) : (
            <p className="text-yellow-200">Click "Deal Cards" to begin!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;