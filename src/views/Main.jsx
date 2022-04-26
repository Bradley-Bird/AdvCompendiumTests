import { useEffect, useState } from 'react';
import { fetchPokemon } from '../services/pokemon';
import Input from '../components/Input';

function Main() {
  const [pokemon, setPokemon] = useState([]);
  const [searchBar, setSearchBar] = useState('');
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
      <Input {...{ searchBar }} callback={setSearchBar} />
      {pokemon.map((pokemon) => (
        <li key={pokemon.id}>{pokemon.pokemon}</li>
      ))}
    </>
  );
}

export default Main;
