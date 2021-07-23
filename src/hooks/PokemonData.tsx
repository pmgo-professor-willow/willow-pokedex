// Node modules.
import { useEffect, useState } from 'react';
// Local modules.
import type { IPokemon } from '../models/pokemon';

const usePokemonData = (): [boolean, IPokemon[]] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const [res] = await Promise.all([
                fetch('/willow-pokedex/data/pokemons.min.json'),
                new Promise((resolve) => setTimeout(resolve, 1000)),
            ]);
            const allPokemons: IPokemon[] = await res.json();
            setLoading(false);
            setPokemons(allPokemons);
        };

        fetchData();
    }, []);

    return [loading, pokemons];
};

export {
    usePokemonData,
};
