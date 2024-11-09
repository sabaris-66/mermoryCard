import { useState, useEffect } from "react";
import "../styles/homePageStyle.css";

const HeadTitle = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonCheck, setPokemonCheck] = useState([]);

  useEffect(() => {
    const pushPokemonData = async (temp) => {
      let temp2 = [];
      try {
        const res = await fetch(
          "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
        );
        const data = await res.json();
        for (let i = 0; i < 12; i++) {
          const res2 = await fetch(data.results[temp[i]].url);
          const data2 = await res2.json();
          temp2.push(data2);
          setPokemonData([...temp2]);
        }
        // setPokemonData([...temp2]);
      } catch (error) {
        console.log(error);
      }
    };
    let temp = [];

    for (let i = 0; i < 12; i++) {
      // 1302 no of pokemons 1 - 1302
      let ignore = false;

      while (!ignore) {
        let pokId = Math.floor(Math.random() * 1302);
        if (!temp.includes(pokId)) {
          temp.push(pokId);
          ignore = true;
        }
      }
    }
    pushPokemonData(temp);
    setNewGame(false);
  }, [newGame]);

  const shuffleArray = () => {
    let array = [...pokemonData];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setPokemonData([...array]);
  };

  const handleClick = (pokemonId) => {
    if (!pokemonCheck.includes(pokemonId)) {
      let temp = [...pokemonCheck];
      temp.push(pokemonId);
      setPokemonCheck([...temp]);
      shuffleArray();
      setScore(score + 1);
      if (score >= bestScore) {
        setBestScore(bestScore + 1);
      }
    } else {
      setPokemonData([]);
      setPokemonCheck([]);
      setScore(0);
      setNewGame(true);
    }
  };

  return (
    <>
      <div className="header">
        <div className="headerLeft">
          <h1>Pokemon Memory Game</h1>
          <div>
            Get points by clicking on an image but don't click on any more than
            once!
          </div>
        </div>
        <div className="headerRight">
          <div>Score: {score}</div>
          <div>Best score: {bestScore}</div>
        </div>
      </div>
      <div className="pokemonCards">
        {pokemonData.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              onClick={() => handleClick(pokemon.id)}
              className="card"
            >
              <img
                src={pokemon.sprites.front_default}
                alt={`${pokemon.name} img`}
              />
              <br />
              <div id={pokemon.id}>{`${pokemon.name
                .charAt(0)
                .toUpperCase()}${pokemon.name.slice(1)}`}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeadTitle;
