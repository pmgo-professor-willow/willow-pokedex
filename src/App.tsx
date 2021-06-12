// Node modules.
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import fetch from 'node-fetch';
// Local modules.
import { IPokemon } from './models/pokemon';
import SearchPage from './screens/SearchPage';
import PokemonProfile from './screens/PokemonProfile';

const App: React.FC = () => {
    const [, setLoading] = useState<boolean>(false);
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await fetch('/willow-pokedex/data/pokemons.min.json');
            const allPokemons: IPokemon[] = await res.json();
            setLoading(false);
            setPokemons(allPokemons);
        };

        fetchData();
    }, []);

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
