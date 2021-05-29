// Node modules.
import { maxBy } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Row, Col, Typography, Divider, Image, Radio, Alert, Tag, Select } from 'antd';
// Local modules.
import type { IPokemon, IPokemonStatus } from '../models/pokemon';
import * as Pokemon from '../components/pokemon';

interface PokemonProfileProps {
    pokemons: IPokemon[];
}

const PokemonProfile: React.FC<PokemonProfileProps> = (props) => {
    const { pokemons } = props;

    const { pokemonNo } = useParams<{ pokemonNo: string }>();

    const [mode, setMode] = useState<'pve' | 'pvp'>('pve');
    const [isomorphicPokemons, setIsomorphicPokemons] = useState<IPokemon[]>([]);
    const [displayPokemon, setDisplayPokemon] = useState<IPokemon | null>(null);
    const [maximum, setMaximum] = useState<IPokemonStatus>(displayPokemon?.stats!);

    const onChangeForm = useCallback((form: string) => {
        const selectedPokemon = (
            isomorphicPokemons.find((p) => p.form === form) ||
            isomorphicPokemons.find((p) => !p.form)
        )!;

        setDisplayPokemon(selectedPokemon);
    }, [isomorphicPokemons]);

    useEffect(() => {
        const newIsomorphicPokemons = pokemons.filter((p) => p.no === parseInt(pokemonNo));
        const [newDisplayPokemon] = newIsomorphicPokemons;
        setIsomorphicPokemons(newIsomorphicPokemons);
        setDisplayPokemon(newDisplayPokemon);
    }, [pokemons, pokemonNo]);

    useEffect(() => {
        setMaximum({
            baseStamina: maxBy(pokemons, (pokemon) => pokemon.stats.baseStamina)?.stats.baseAttack!,
            baseAttack: maxBy(pokemons, (pokemon) => pokemon.stats.baseAttack)?.stats.baseAttack!,
            baseDefense: maxBy(pokemons, (pokemon) => pokemon.stats.baseDefense)?.stats.baseDefense!,
        });
    }, [pokemons]);

    if (!displayPokemon) {
        return null;
    }

    return (
        <React.Fragment>
            <Row justify={'center'} align={'middle'}>
                <Col flex={0} style={{ textAlign: 'center' }}>
                    {/* Image */}
                    <Pokemon.Image pokemonNo={displayPokemon.no} size={125} />

                    {/* Name */}
                    <Typography.Title level={3}>
                        {displayPokemon.name}
                    </Typography.Title>
                </Col>

                <Col flex={3} style={{ textAlign: 'center' }}>
                    {/* Types */}
                    <Row justify={'center'} align={'middle'}>
                        <Col span={12} style={{ textAlign: 'center' }}>
                            <Row>
                                {displayPokemon.types.map((type, i) => (
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
                                value={displayPokemon.stats.baseAttack}
                                percent={displayPokemon.stats.baseAttack / maximum.baseAttack * 100}
                            />
                        </Col>

                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Pokemon.Stat
                                type='defense'
                                value={displayPokemon.stats.baseDefense}
                                percent={displayPokemon.stats.baseDefense / maximum.baseDefense * 100}
                            />
                        </Col>

                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Pokemon.Stat
                                type='stamina'
                                value={displayPokemon.stats.baseStamina}
                                percent={displayPokemon.stats.baseStamina / maximum.baseDefense * 100}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col flex={1} style={{ textAlign: 'center' }}>
                    <Select style={{ width: '70%' }}
                        defaultValue={ displayPokemon.form }
                        onChange={onChangeForm}
                    >
                        {isomorphicPokemons.map(({ form }, i) => (
                            <Select.Option key={i} value={String(form)}>{form}</Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            <Divider />

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

            {displayPokemon.quickMoves?.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                />
            ))}

            {displayPokemon.eliteQuickMoves?.map((move) => (
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

            {displayPokemon.cinematicMoves?.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                />
            ))}

            {displayPokemon.eliteCinematicMoves?.map((move) => (
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
