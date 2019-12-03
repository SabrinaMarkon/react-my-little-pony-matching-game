import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Grid() {
  const [chosenCard, setChosenCard] = useState({
    card1: null,
    id1: null,
    card2: null,
    id2: null,
    matches: []
  });
  const [ponyGrid, setPonyGrid] = useState([]);

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
  }, []);

  // instead of YES and NO we flip the cards.
  const didItmatch = () =>
    chosenCard.card1 &&
    chosenCard.card2 &&
    chosenCard.card1 === chosenCard.card2 && // names are the same for both cards.
    chosenCard.id1 !== chosenCard.id2 // ids must be different so we know match is not 2 of the same card.
      ? "YES" // yes - leave turned up and make unclickable somehow.
      : "NO!"; // no - pause then flip back to hide.

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
  };

  const ponies = ponyGrid.map(pony => {
    const cardSide =
      chosenCard.id1 === pony.id || chosenCard.id2 === pony.id
        ? `MLP-${pony.name}.jpg`
        : `MLP-BackOfCards.jpg`;
    return (
      <div
        key={pony.id}
        className="grid__square"
        onClick={event => handleClick(pony)}
      >
        <img
          src={`./images/${cardSide}`}
          alt={pony.name}
          id={pony.id}
          className="grid__square--pony-image"
        />
      </div>
    );
  });

  return (
    <>
      <div>
        {chosenCard.card1} - {chosenCard.card2} - {didItmatch()} <br />
      </div>
      <div className="grid">{ponies}</div>
    </>
  );
}
