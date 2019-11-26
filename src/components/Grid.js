import React, { useState } from "react";

export default function Grid() {
  const [chosenCard, setchosenCard] = useState([]);
  console.log(chosenCard);

  // 8 G1 Ponies :3
  const PONIES = [
    "CottonCandy",
    "Blossom",
    "Bluebell",
    "Snuzzle",
    "Butterscotch",
    "Minty",
    "LemonDrop",
    "Peachy"
  ];

  // Doubled for matching...
  const GRID = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

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

  const buildPonyGrid = () => {
    const shuffledGrid = shuffleArray([...GRID]);
    const ponyGrid = shuffledGrid.map(item => PONIES[item]);
    return ponyGrid;
  };

  const handleClick = index => {
    setchosenCard(chosenCard.push(index));
    console.log(chosenCard);
  };

  const ponies = buildPonyGrid().map((pony, index) => (
    <div key={`${pony}-${index}`} className="grid__square">
      <img
        src={`./images/MLP-${pony}.jpg`}
        alt={pony}
        className="grid__square--pony-image"
        onClick={() => handleClick(pony)}
      />
      <div className="grid__square--pony-name">{pony}</div>
    </div>
  ));

  return <div className="grid">{ponies}</div>;
}
