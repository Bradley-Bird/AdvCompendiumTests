import { useEffect, useState } from 'react';
import { fetchPokemon, fetchSearchedPokemon } from '../services/pokemon';
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

  const handleSubmit = async () => {
    const resp = await fetchSearchedPokemon(searchBar);
    setPokemon(resp);
  };
  return (
    <>
      <Input {...{ searchBar, handleSubmit }} callback={setSearchBar} />
      {pokemon.map((pokemon) => (
        <li key={pokemon.id}>{pokemon.pokemon}</li>
      ))}
    </>
  );
}

export default Main;
