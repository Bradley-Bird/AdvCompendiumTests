import { useEffect } from 'react';
import { fetchPokemon } from '../services/pokemon';

function Main() {
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetchPokemon();
      console.log(resp);
    };
    fetchData();
  }, []);

  return <div>Main</div>;
}

export default Main;
