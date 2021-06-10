// Node modules.
import { maxBy } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Row, Col, Typography, Divider, Image, Radio, Alert, Tag, Select, Button } from 'antd';
import styled from 'styled-components';
// Local modules.
import type { IPokemon, IPokemonStatus } from '../models/pokemon';
import * as Pokemon from '../components/pokemon';

interface PokemonProfileProps {
    className?: string;
    pokemons: IPokemon[];
}

const PokemonProfile: React.FC<PokemonProfileProps> = (props) => {
    const { className } = props;
    const { pokemons } = props;

    const { pokemonNo, pokemonForm } = useParams<{ pokemonNo: string, pokemonForm: string }>();

    const [mode, setMode] = useState<'pve' | 'pvp'>('pve');
    const [isomorphicPokemons, setIsomorphicPokemons] = useState<IPokemon[]>([]);
    const [displayPokemon, setDisplayPokemon] = useState<IPokemon | undefined>();
    const [selectedForm, setSelectedForm] = useState(pokemonForm);
    const [shiny, setShiny] = useState(false);
    const [maximum, setMaximum] = useState<IPokemonStatus>(displayPokemon?.stats!);

    const onChangeForm = useCallback((form: string) => {
        setSelectedForm(form);
    }, []);

    useEffect(() => {
        const newIsomorphicPokemons = pokemons.filter((p) => p.no === parseInt(pokemonNo));
        const newDisplayPokemon = newIsomorphicPokemons.find((p) => p.form?.toLowerCase() === pokemonForm);
        setIsomorphicPokemons(newIsomorphicPokemons);
        setDisplayPokemon(newDisplayPokemon);
    }, [pokemons, pokemonNo, pokemonForm]);

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

    if (pokemonForm !== selectedForm) {
        return <Redirect to={`/willow-pokedex/pokemons/${pokemonNo}/${selectedForm}`} />;
    }

    return (
        <div className={className}>
            <Row justify={'center'} align={'middle'}>
                <Col className='pokemon-avatar' flex={0}>
                    {/* Image */}
                    <Pokemon.Image
                        pokemonNo={displayPokemon.no}
                        pokemonForm={displayPokemon.form}
                        shiny={shiny}
                        size={125}
                    />

                    {/* Name */}
                    <Typography.Title level={3}>
                        {displayPokemon.name}
                    </Typography.Title>
                </Col>

                <Col className='pokemon-meta' flex={3}>
                    {/* Types */}
                    <Row justify={'center'} align={'middle'}>
                        <Col className='pokemon-types' span={12}>
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
                        <Col className='pokemon-stat' span={24}>
                            <Pokemon.Stat
                                type='attack'
                                value={displayPokemon.stats.baseAttack}
                                percent={displayPokemon.stats.baseAttack / maximum.baseAttack * 100}
                            />
                        </Col>

                        <Col className='pokemon-stat' span={24}>
                            <Pokemon.Stat
                                type='defense'
                                value={displayPokemon.stats.baseDefense}
                                percent={displayPokemon.stats.baseDefense / maximum.baseDefense * 100}
                            />
                        </Col>

                        <Col className='pokemon-stat' span={24}>
                            <Pokemon.Stat
                                type='stamina'
                                value={displayPokemon.stats.baseStamina}
                                percent={displayPokemon.stats.baseStamina / maximum.baseDefense * 100}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row align='middle'>
                <Col className='pokemon-forms' flex={2}>
                    <Select className='pokemon-forms-select'
                        value={selectedForm}
                        onChange={onChangeForm}
                    >
                        {isomorphicPokemons.map(({ form }, i) => (
                            <Select.Option key={i} value={String(form).toLowerCase()}>{form}</Select.Option>
                        ))}
                    </Select>
                </Col>

                <Col className='pokemon-shiny' flex={1}>
                    <Button block
                        type={shiny ? 'primary' : 'dashed'}
                        onClick={() => setShiny(!shiny)}
                    >
                        {'異色✨'}
                    </Button>
                </Col>
            </Row>

            <Divider />

            <Row>
                <Col className='pokemon-mode' flex={1}>
                    <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
                        <Radio.Button value='pve' children={'道館對戰 & 團體戰'} />
                        <Radio.Button value='pvp' children={'訓練家對戰'} />
                    </Radio.Group>
                </Col>
            </Row>

            {mode === 'pvp' &&
                <Pokemon.CombatRanking pokemon={displayPokemon} />
            }

            <Divider plain orientation='left'>
                <Row wrap={false} gutter={5} align='middle' justify='center'>
                    <Col flex='none'>
                        <Image preview={false} height={30} width={57.7}
                            src={'/willow-pokedex/assets/quick_move.png'}
                        />
                    </Col>
                    <Col flex='none'>
                        <Typography.Title className='divider-title' level={5}>
                            {'一般招式'}
                        </Typography.Title>
                    </Col>
                </Row>
            </Divider>

            {displayPokemon.quickMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                />
            ))}

            {displayPokemon.eliteQuickMoves.map((move) => (
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
                            src={'/willow-pokedex/assets/cinematic_move.png'}
                        />
                    </Col>
                    <Col flex='none'>
                        <Typography.Title className='divider-title' level={5}>
                            {'特殊招式'}
                        </Typography.Title>
                    </Col>
                </Row>
            </Divider>

            {displayPokemon.cinematicMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                />
            ))}

            {displayPokemon.eliteCinematicMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    legacy={true}
                />
            ))}

            <Alert type='warning'
                message={
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Row align='middle'>
                                <Col flex={0}>
                                    <Tag color='red'>{'絕版'}</Tag>
                                </Col>
                                <Col flex={1}>
                                    <Typography.Text>
                                        {'招式須透過活動或厲害招式學習器習得'}
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>

                        {displayPokemon.form === 'PURIFIED' && (
                            <Col span={24}>
                                <Row align='middle'>
                                    <Col flex={0}>
                                        <Tag color='cyan'>{'淨化'}</Tag>
                                    </Col>
                                    <Col flex={1}>
                                        <Typography.Text>
                                            {'招式需透過淨化暗影寶可夢獲得'}
                                        </Typography.Text>
                                    </Col>
                                </Row>
                            </Col>
                        )}

                        {displayPokemon.form === 'SHADOW' && (
                            <Col span={24}>
                                <Row align='middle'>
                                    <Col flex={0}>
                                        <Tag color='purple'>{'暗影'}</Tag>
                                    </Col>
                                    <Col flex={1}>
                                        <Typography.Text>
                                            {'捕獲暗影寶可夢時會獲得該招式'}
                                        </Typography.Text>
                                    </Col>
                                </Row>
                            </Col>
                        )}
                    </Row>
                }
            />

            <Divider plain orientation='left'>
                <Row wrap={false} gutter={5} align='middle' justify='center'>
                    <Col flex='none'>
                        <Image preview={false} height={30} width={47}
                            src={'/willow-pokedex/assets/pokemon_desc.png'}
                        />
                    </Col>
                    <Col flex='none'>
                        <Typography.Title className='divider-title' level={5}>
                            {'關於'}
                        </Typography.Title>
                    </Col>
                </Row>
            </Divider>

            <Row align='middle'>
                <Col className='' flex={1}>
                    <Typography.Title level={5}>
                        {displayPokemon.category}
                    </Typography.Title>
                    
                    <Typography.Paragraph>
                        {displayPokemon.description}
                    </Typography.Paragraph>
                </Col>
            </Row>

            <Divider plain orientation='left'>
                <Row wrap={false} gutter={5} align='middle' justify='center'>
                    <Col flex='none'>
                        <Image preview={false} height={30} width={30}
                            src={'/willow-pokedex/assets/pokemon_cp.png'}
                        />
                    </Col>
                    <Col flex='none'>
                        <Typography.Title className='divider-title' level={5}>
                            {'最大 CP'}
                        </Typography.Title>
                    </Col>
                </Row>
            </Divider>

            <Pokemon.CombatPower cpTable={displayPokemon.cpTable} />
        </div>
    );
};

const styledPokemonProfile = styled(PokemonProfile)`
.pokemon-avatar {
    text-align: center;
}

.pokemon-meta {
    text-align: center;
}

.pokemon-stat {
    text-align: center;
}

.pokemon-forms {
    text-align: center;

    .pokemon-forms-select {
        width: 90%;
    }
}

.pokemon-shiny {
    text-align: center;
}

.pokemon-mode {
    text-align: center;
}

.divider-title {
    margin: 0;
}
`;

export default styledPokemonProfile;
