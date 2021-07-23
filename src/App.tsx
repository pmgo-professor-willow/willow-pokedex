// Node modules.
import React, { useEffect, useState } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import fetch from 'node-fetch';
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
// Local modules.
import type { IPokemon } from './models/pokemon';
import * as Screen from './screens/';
import { withTracker } from './hoc/ga';
import { PokemonContext } from './contexts/pokemon';
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
        <PokemonContext.Provider value={pokemons}>
            <HashRouter>
                <Switch>
                    <Route path='/willow-pokedex/pokemons/:pokemonNo/:pokemonForm'
                        component={withTracker(Screen.PokemonProfileScreen)}
                    />

                    <Route path='/willow-pokedex/pokemons'
                        component={withTracker(Screen.SearchScreen)}
                    />

                    <Route>
                        <Redirect to='/willow-pokedex/pokemons' />
                    </Route>
                </Switch>
            </HashRouter>

            {/* TODO: This is temporary */}
            <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 100 }}>
                <Button type='primary' block size='small'>
                    {'圖鑑尚在測試，歡迎留訊息給博士'}
                    <SendOutlined />
                </Button>
            </div>
        </PokemonContext.Provider>
    );
};

export default App;
