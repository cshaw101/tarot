import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import backOfCard from './assets/backOfCard/back.jpg';

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const images = import.meta.glob('./assets/tarot/*.jpg', { eager: true });
    const cardList = Object.entries(images).map(([path, module], i) => {
      const name = path.split('/').pop().replace('.jpg', '');
      return {
        name: `Card ${name}`,
        image: module.default,
      };
    });

    // Shuffle and limit to 5
    const shuffled = cardList.sort(() => 0.5 - Math.random()).slice(0, 5);
    setCards(shuffled);
  }, []);

  const [revealed, setRevealed] = useState([]);

  const handleReveal = (name) => {
    setRevealed((prev) => [...prev, name]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-semibold text-purple-700 mb-8">🃏 Tarot Reading</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
  {cards.map((card, index) => (
    <Card
      key={index}
      name={card.name}
      frontImage={card.image}
      backImage={backOfCard}
      onClick={handleReveal}
    />
  ))}
</div>

      {revealed.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-medium">Revealed Cards:</h2>
          <ul className="mt-2">
            {revealed.map((card, index) => (
              <li key={index} className="text-gray-700">{card}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
