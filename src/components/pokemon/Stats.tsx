// Node modules.
import { maxBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Image, Typography, Progress } from 'antd';
import styled from 'styled-components';
// Local modules.
import type { IPokemon, IPokemonStatus } from '../../models/pokemon';

interface PokemonStatProps {
    type: 'attack' | 'defense' | 'stamina';
    value: number;
    percent: number;
}

const PokemonStat: React.FC<PokemonStatProps> = (props) => {
    const { type, value, percent } = props;

    let displayText = '';
    let strokeColor = '';

    switch (type) {
        case 'attack':
            displayText = '攻擊';
            strokeColor = '#f44336';
            break;
        case 'defense':
            displayText = '防禦';
            strokeColor = '#4e91fc';
            break;
        case 'stamina':
            displayText = 'HP';
            strokeColor = '#f7b24a';
            break;
    }

    return (
        <Row justify={'center'} align={'middle'}>
            <Col span={5} style={{ textAlign: 'right' }}>
                <Typography.Text>
                    {displayText}
                </Typography.Text>
            </Col>

            <Col span={4} style={{ textAlign: 'right' }}>
                <Typography.Text>
                    {value}
                </Typography.Text>
            </Col>

            <Col span={1} />

            <Col span={14}>
                <Progress status='active' showInfo={false}
                    strokeWidth={12}
                    percent={percent}
                    strokeColor={strokeColor}
                />
            </Col>
        </Row>
    );
};


interface PokemonStatsProps {
    className?: string;
    allPokemons: IPokemon[];
    pokemon?: IPokemon;
}

const PokemonStats: React.FC<PokemonStatsProps> = (props) => {
    const { className } = props;
    const { allPokemons, pokemon } = props;

    const [maximum, setMaximum] = useState<IPokemonStatus>(pokemon?.stats!);

    useEffect(() => {
        setMaximum({
            baseStamina: maxBy(allPokemons, (pokemon) => pokemon.stats.baseStamina)?.stats.baseAttack!,
            baseAttack: maxBy(allPokemons, (pokemon) => pokemon.stats.baseAttack)?.stats.baseAttack!,
            baseDefense: maxBy(allPokemons, (pokemon) => pokemon.stats.baseDefense)?.stats.baseDefense!,
        });
    }, [allPokemons]);

    if (!pokemon) {
        return null;
    }

    return (
        <div id='stats' className={className}>
            <Divider plain orientation='center'>
                <Image preview={false} height={30} width={30}
                    src={'/willow-pokedex/assets/pokemon_stats.png'}
                />
                <Typography.Title className='divider-title' level={5}>
                    {'能力素質'}
                </Typography.Title>
            </Divider>

            <Row justify={'center'} align={'middle'}>
                <Col className='pokemon-stat' span={24}>
                    <PokemonStat
                        type='attack'
                        value={pokemon.stats.baseAttack}
                        percent={pokemon.stats.baseAttack / maximum.baseAttack * 100}
                    />
                </Col>

                <Col className='pokemon-stat' span={24}>
                    <PokemonStat
                        type='defense'
                        value={pokemon.stats.baseDefense}
                        percent={pokemon.stats.baseDefense / maximum.baseDefense * 100}
                    />
                </Col>

                <Col className='pokemon-stat' span={24}>
                    <PokemonStat
                        type='stamina'
                        value={pokemon.stats.baseStamina}
                        percent={pokemon.stats.baseStamina / maximum.baseDefense * 100}
                    />
                </Col>
            </Row>
        </div>
    );
};

const styledPokemonStats = styled(PokemonStats)`
& {
    margin-bottom: 3em;
    
    .pokemon-stat {
        text-align: center;
    }
}
`;

export default styledPokemonStats;
