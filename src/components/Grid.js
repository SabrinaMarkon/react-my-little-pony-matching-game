import React from "react";

export default function Grid() {
  // 8 G1s :)
  const PONIES = [
    "Cotton Candy",
    "Blossom",
    "Bluebell",
    "Snuzzle",
    "Butterscotch",
    "Minty",
    "Lemon Drop",
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

  const ponies = buildPonyGrid().map((pony, index) => (
    <div key={index}>{pony}</div>
  ));

  return <>{ponies}</>;
}