// Node modules.
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import fetch from 'node-fetch';
import { Row, Col, Typography, Divider, Image } from 'antd';
// Local modules.
import { IPokemon } from './models/pokemon';
import * as Pokemon from './components/pokemon';

const App: React.FC = () => {
    const [, setLoading] = useState<boolean>(false);
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await fetch('https://pmgo-professor-willow.github.io/willow-pokedex/data/pokemons.json');
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
                    <React.Fragment key={i}>
                        <Row justify={'center'} align={'middle'}>
                            <Col flex={0} style={{ textAlign: 'center' }}>
                                {/* Image */}
                                <Pokemon.Image pokemonNo={pokemon.no} size={125} />

                                {/* Name */}
                                <Typography.Title level={3}>
                                    {pokemon.name}
                                </Typography.Title>
                            </Col>

                            <Col flex={3} style={{ textAlign: 'center' }}>
                                {/* Types */}
                                <Row justify={'center'} align={'middle'}>
                                    <Col span={12} style={{ textAlign: 'center' }}>
                                        <Row key={i}>
                                            {pokemon.types.map((type, j) => (
                                                <Col key={j} flex={1}>
                                                    <Pokemon.TypeIcon pokemonType={type} size={35} />
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>

                                {/* Stats */}
                                <Row justify={'center'} align={'middle'}>
                                    <Col span={24} style={{ textAlign: 'center' }}>
                                        <Pokemon.Stat type='attack' value={pokemon.stats.baseAttack} />
                                    </Col>

                                    <Col span={24} style={{ textAlign: 'center' }}>
                                        <Pokemon.Stat type='defense' value={pokemon.stats.baseDefense} />
                                    </Col>

                                    <Col span={24} style={{ textAlign: 'center' }}>
                                        <Pokemon.Stat type='stamina' value={pokemon.stats.baseStamina} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Divider plain orientation='left'>
                            <Row wrap={false} gutter={5} align='middle' justify='center'>
                                <Col flex='none'>
                                    <Image preview={false} height={30} width={57.7}
                                        src={'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Item_1201.png'}
                                    />
                                </Col>
                                <Col flex='none'>
                                    {'一般招式'}
                                </Col>
                            </Row>
                        </Divider>

                        {pokemon.quickMoves?.map((move) => (
                            <Pokemon.Move key={move.uniqueId}
                                move={move}
                            />
                        ))}

                        {pokemon.eliteQuickMoves?.map((move) => (
                            <Pokemon.Move key={move.uniqueId}
                                move={move}
                                legacy={true}
                            />
                        ))}

                        <Divider plain orientation='left'>
                            <Row wrap={false} gutter={5} align='middle' justify='center'>
                                <Col flex='none'>
                                    <Image preview={false} height={30} width={57.7}
                                        src={'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Item_1202.png'}
                                    />
                                </Col>
                                <Col flex='none'>
                                    {'特殊招式'}
                                </Col>
                            </Row>
                        </Divider>

                        {pokemon.cinematicMoves?.map((move) => (
                            <Pokemon.Move key={move.uniqueId}
                                move={move}
                            />
                        ))}

                        {pokemon.eliteCinematicMoves?.map((move) => (
                            <Pokemon.Move key={move.uniqueId}
                                move={move}
                                legacy={true}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </Router>
    );
};

export default App;
