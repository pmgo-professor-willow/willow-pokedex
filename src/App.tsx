// Node modules.
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
// Local modules.
import * as Screen from './screens/';
import { withTracker } from './hoc/ga';
import { usePokemonData } from './hooks/PokemonData';
import { PokemonContext } from './contexts/pokemon';
import { FullLoading } from './components/misc';

const App: React.FC = () => {
    const [loading, pokemons] = usePokemonData();


    if (loading) {
        return (
            <FullLoading />
        );
    }

    return (
        <PokemonContext.Provider value={pokemons}>
            <HashRouter>
                <Switch>
                    <Route path='/pokemons/:pokemonNo/:pokemonForm'
                        component={withTracker(Screen.PokemonProfileScreen)}
                    />

                    <Route path='/pokemons'
                        component={withTracker(Screen.SearchScreen)}
                    />

                    <Route>
                        <Redirect to='/pokemons' />
                    </Route>
                </Switch>
            </HashRouter>

            {/* TODO: This is temporary */}
            <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 100 }}>
                <a href={'https://line.me/R/oaMessage/@611mscwy/?給博士，'}>
                    <Button type='primary' block size='small'>
                        {'圖鑑尚在測試，歡迎留訊息給博士'}
                        <SendOutlined />
                    </Button>
                </a>
            </div>
        </PokemonContext.Provider>
    );
};

export default App;
