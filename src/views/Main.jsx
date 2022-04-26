import { useEffect, useState } from 'react';
import { fetchPokemon } from '../services/pokemon';

function Main() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetchPokemon();
      //   console.log(resp);
      setPokemon(resp);
    };
    fetchData();
  }, []);

  return (
    <>
      {pokemon.map((pokemon) => (
        <li key={pokemon.id}>{pokemon.pokemon}</li>
      ))}
    </>
  );
}

export default Main;
