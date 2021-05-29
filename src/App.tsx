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
            const res = await fetch('/willow-pokedex/data/pokemons.json');
            const allPokemons: IPokemon[] = await res.json();
            setLoading(false);
            setPokemons(allPokemons);
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: '100%', background: '#ECECEC', padding: 12 }}>
            <Router>
                <Switch>
                    <Route path='/pokemons/:pokemonNo'
                        render={() => <PokemonProfile pokemons={pokemons} />}
                    />

                    <Route path='/pokemons'
                        render={() => <SearchPage pokemons={pokemons} />}
                    />

                    <Route>
                        <Redirect to='/pokemons' />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
