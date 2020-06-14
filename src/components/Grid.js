import React, { useState, useEffect } from "react";
import Card from "./Card";
import Reset from "./Reset";

export default function Grid() {
  const [ponyGrid, setPonyGrid] = useState([]);
  const [chosenCard, setChosenCard] = useState({
    card1: null,
    id1: null,
    card2: null,
    id2: null
  });
  const [toggleReset, setToggleReset] = useState(0);
  const [matches, setMatches] = useState([]);
  const [matchedCardText, setMatchedCardText] = useState();

  useEffect(() => {
    // 8 G1 Ponies, double trouble for matching. :3
    const PONIES = [
      { id: 0, name: "CottonCandy" },
      { id: 1, name: "CottonCandy" },
      { id: 2, name: "Blossom" },
      { id: 3, name: "Blossom" },
      { id: 4, name: "BlueBelle" },
      { id: 5, name: "BlueBelle" },
      { id: 6, name: "Snuzzle" },
      { id: 7, name: "Snuzzle" },
      { id: 8, name: "Butterscotch" },
      { id: 9, name: "Butterscotch" },
      { id: 10, name: "Minty" },
      { id: 11, name: "Minty" },
      { id: 12, name: "LemonDrop" },
      { id: 13, name: "LemonDrop" },
      { id: 14, name: "Peachy" },
      { id: 15, name: "Peachy" }
    ];

    /* If the reset button was clicked, make sure all cards are face down. */
    setChosenCard({
      card1: null,
      id1: null,
      card2: null,
      id2: null
    });
    setMatches([]);
    setMatchedCardText();

    /*
    IN-PLACE O(n) SHUFFLE (Fisher-Yates)
    n = total elements in grid array.
    m = total remaining unshuffled elements.
    n - m = total elements already shuffled.
    i = random index out of remaining elements.
    */
    const shuffleArray = arr => {
      let m = arr.length; // Total unshuffled elements starts with the entire array size.
      let t, i;
      // while we have remaining elements that we haven't yet shuffled.
      while (m) {
        // choose one of the remaining elements, which is 1 less than m elements (after m is picked up here)
        i = Math.floor(Math.random() * m--);
        // swap i with m.
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
      }
      return arr;
    };
    const newPonyGrid = shuffleArray([...PONIES]);
    setPonyGrid(newPonyGrid);
  }, [toggleReset]);

  const didItMatch = () => {
    if (
      chosenCard.card1 &&
      chosenCard.card2 &&
      chosenCard.card1 === chosenCard.card2 && // names are the same for both cards.
      chosenCard.id1 !== chosenCard.id2
    ) {
      // Add pony name to the matches array so we know this set should remain face up.
      setMatches([...matches, chosenCard.card1]);
      setMatchedCardText(`You Matched ${chosenCard.card1}!`);
    }
  };

  const handleClick = card => {
    !chosenCard.card1
      ? setChosenCard({ ...chosenCard, card1: card.name, id1: card.id })
      : !chosenCard.card2
      ? setChosenCard({ ...chosenCard, card2: card.name, id2: card.id })
      : setChosenCard({
          ...chosenCard,
          card1: card.name,
          id1: card.id,
          card2: null,
          id2: null
        });
    didItMatch();
  };

  const ponies = ponyGrid.map(pony => {
    const inMatches = matches.includes(pony.name);
    const cardSide =
      chosenCard.id1 === pony.id || chosenCard.id2 === pony.id || inMatches
        ? `MLP-${pony.name}.jpg`
        : `MLP-FrontOfCards.jpg`;
    return (
      <Card
        key={pony.id}
        pony={pony}
        cardSide={cardSide}
        inMatches={inMatches}
        handleClick={handleClick}
      />
    );
  });

  return (
    <>
      <div className="match">
        {matchedCardText} <br />
      </div>
      <div className="grid">{ponies}</div>
      <div className="reset">
        <Reset onClick={() => setToggleReset(!toggleReset)} />
      </div>
    </>
  );
}
