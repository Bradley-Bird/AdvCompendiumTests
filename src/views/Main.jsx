import { useEffect, useState } from 'react';
import { fetchPokemon, fetchSearchedPokemon } from '../services/pokemon';
import Input from '../components/Input';

function Main() {
  const [pokemon, setPokemon] = useState([]);
  const [searchBar, setSearchBar] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const resp = await fetchPokemon();
        //   console.log(resp);
        setPokemon(resp);
        setLoading(false);
      };
      fetchData();
    } catch {
      console.error('there has been an error');
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const resp = await fetchSearchedPokemon(searchBar);
      setPokemon(resp);
      setLoading(false);
    } catch {
      console.error('Search returned no results, please try again');
    }
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
