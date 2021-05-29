// Node modules.
import { maxBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Row, Col, Typography, Divider, Image, Radio, Alert, Tag } from 'antd';
// Local modules.
import type { IPokemon, IPokemonStatus } from '../models/pokemon';
import * as Pokemon from '../components/pokemon';

interface PokemonProfileProps {
    pokemons: IPokemon[];
}

const PokemonProfile: React.FC<PokemonProfileProps> = (props) => {
    const { pokemons } = props;

    const [mode, setMode] = useState<'pve' | 'pvp'>('pve');

    const { pokemonNo } = useParams<{ pokemonNo: string }>();

    const pokemon = pokemons.find((p) => p.no === parseInt(pokemonNo));

    const [maximum, setMaximum] = useState<IPokemonStatus>(pokemon?.stats!);

    useEffect(() => {
        setMaximum({
            baseStamina: maxBy(pokemons, (pokemon) => pokemon.stats.baseStamina)?.stats.baseAttack!,
            baseAttack: maxBy(pokemons, (pokemon) => pokemon.stats.baseAttack)?.stats.baseAttack!,
            baseDefense: maxBy(pokemons, (pokemon) => pokemon.stats.baseDefense)?.stats.baseDefense!,
        });
    }, [pokemons]);

    if (!pokemon) {
        return null;
    }

    return (
        <React.Fragment>
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
                            <Row>
                                {pokemon.types.map((type, i) => (
                                    <Col key={i} flex={1}>
                                        <Pokemon.TypeIcon pokemonType={type} size={35} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>

                    {/* Stats */}
                    <Row justify={'center'} align={'middle'}>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Pokemon.Stat
                                type='attack'
                                value={pokemon.stats.baseAttack}
                                percent={pokemon.stats.baseAttack / maximum.baseAttack * 100}
                            />
                        </Col>

                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Pokemon.Stat
                                type='defense'
                                value={pokemon.stats.baseDefense}
                                percent={pokemon.stats.baseDefense / maximum.baseDefense * 100}
                            />
                        </Col>

                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Pokemon.Stat
                                type='stamina'
                                value={pokemon.stats.baseStamina}
                                percent={pokemon.stats.baseStamina / maximum.baseDefense * 100}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col flex={1} style={{ textAlign: 'center' }}>
                    <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
                        <Radio.Button value='pve' children={'道館對戰 & 團體戰'} />
                        <Radio.Button value='pvp' children={'訓練家對戰'} />
                    </Radio.Group>
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
                    mode={mode}
                />
            ))}

            {pokemon.eliteQuickMoves?.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
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
                    mode={mode}
                />
            ))}

            {pokemon.eliteCinematicMoves?.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    legacy={true}
                />
            ))}

            <Alert type='warning'
                message={
                    <Row justify='center' align='middle'>
                        <Col>
                            <Tag color='red'>{'絕版'}</Tag>
                        </Col>
                        <Col>
                            <Typography.Text>
                                {'招式須透過活動或厲害招式學習器習得'}
                            </Typography.Text>
                        </Col>
                    </Row>
                }
            />
        </React.Fragment>
    );
};

export default PokemonProfile;
