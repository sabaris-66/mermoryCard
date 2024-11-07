import { useState, useEffect } from "react";

const HeadTitle = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div>
      <div className="headerLeft">
        <h1>Pokemon Memory Game</h1>
        <div>
          Get points by clicking on an image but don't click on any more than
          once!
        </div>
      </div>
      <div className="headerRight">
        <div>{score}</div>
        <div>{bestScore}</div>
      </div>
    </div>
  );
};

export default HeadTitle;
