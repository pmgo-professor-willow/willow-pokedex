// Node modules.
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import fetch from 'node-fetch';
// Local modules.
import { IPokemon } from './models/pokemon';
import SearchPage from './screens/SearchPage';
import PokemonProfile from './screens/PokemonProfile';
import { FullLoading } from './components/misc';

const App: React.FC = () => {
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

    if (loading) {
        return (
            <FullLoading />
        );
    }

    return (
        <Router>
            <Switch>
                <Route path='/willow-pokedex/pokemons/:pokemonNo/:pokemonForm'
                    render={() => <PokemonProfile pokemons={pokemons} />}
                />

                <Route path='/willow-pokedex/pokemons'
                    render={() => <SearchPage pokemons={pokemons} />}
                />

                <Route>
                    <Redirect to='/willow-pokedex/pokemons' />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
