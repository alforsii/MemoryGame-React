import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), match: false }));

    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  const handleMatch = () => {
    if (!choiceOne || !choiceTwo) return;
    setDisabled(true);
    if (choiceOne.src === choiceTwo.src) {
      const updatedCards = cards.map((card) =>
        card.src === choiceOne.src ? { ...card, match: true } : card
      );
      setCards(updatedCards);
      console.log("matched", updatedCards);
    } else {
      console.log("No matched");
    }
    setTimeout(() => {
      resetTurns();
    }, 1000);
  };

  useEffect(() => {
    handleMatch();
    // eslint-disable-next-line
  }, [choiceTwo]);
  useEffect(() => {
    console.log(turns);
    // eslint-disable-next-line
  }, [turns]);
  useEffect(() => {
    shuffleCards();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Magic Match</h1>

        <div>
          <p style={{ float: "right" }}>Turns: {turns}</p>
          <div>
            <button onClick={shuffleCards}>New Game</button>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.match}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
