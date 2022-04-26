import { useEffect, useState } from 'react';
import { fetchPokemon, fetchSearchedPokemon } from '../services/pokemon';
import Input from '../components/Input';

function Main() {
  const [pokemon, setPokemon] = useState([]);
  const [searchBar, setSearchBar] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetchPokemon();
      //   console.log(resp);
      setPokemon(resp);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const resp = await fetchSearchedPokemon(searchBar);
    setPokemon(resp);
  };
  return loading ? (
    'loading...'
  ) : (
    <>
      <Input {...{ searchBar, handleSubmit }} callback={setSearchBar} />
      <ul>
        {pokemon.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.pokemon}</li>
        ))}
      </ul>
    </>
  );
}

export default Main;
