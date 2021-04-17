// Node modules.
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import fetch from 'node-fetch';
// Local modules.
import { IPokemon } from './models/pokemon';
import PokemonProfile from './screens/PokemonProfile';

const App: React.FC = () => {
    const [, setLoading] = useState<boolean>(false);
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await fetch('/willow-pokedex/data/pokemons.json');
            const allPokemons: IPokemon[] = await res.json();
            setLoading(false);
            setPokemons(allPokemons.slice(24, 25));
        };

        fetchData();
    }, []);

    return (
        <Router>
            <div className='App' style={{ padding: 12 }}>
                {pokemons.map((pokemon, i) => (
                    <PokemonProfile key={i}
                        pokemon={pokemon}
                    />
                ))}
            </div>
        </Router>
    );
};

export default App;
