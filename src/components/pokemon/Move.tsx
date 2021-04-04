// Node modules.
import { times } from 'lodash';
import React from 'react';
import { Row, Col, Tag, Typography, Progress } from 'antd';
// Local modules.
import { IMove } from '../../models/pokemon';
import { TypeIcon } from './index';

enum PokemonTypeColorEnum {
    POKEMON_TYPE_BUG = '#9DC130',
    POKEMON_TYPE_DARK = '#5F606D',
    POKEMON_TYPE_DRAGON = '#0773C7',
    POKEMON_TYPE_ELECTRIC = '#EDD53F',
    POKEMON_TYPE_FAIRY = '#EF97E6',
    POKEMON_TYPE_FIGHTING = '#D94256',
    POKEMON_TYPE_FIRE = '#F8A54F',
    POKEMON_TYPE_FLYING = '#9BB4E8',
    POKEMON_TYPE_GHOST = '#6970C5',
    POKEMON_TYPE_GRASS = '#5DBE62',
    POKEMON_TYPE_GROUND = '#D78555',
    POKEMON_TYPE_ICE = '#7ED4C9',
    POKEMON_TYPE_NORMAL = '#9A9DA1',
    POKEMON_TYPE_POISON = '#B563CE',
    POKEMON_TYPE_PSYCHIC = '#F87C7A',
    POKEMON_TYPE_ROCK = '#CEC18C',
    POKEMON_TYPE_STEEL = '#5596A4',
    POKEMON_TYPE_WATER = '#559EDF',
}

interface PokemonMoveEnergyBarProps {
    energyDelta: number;
    type: IMove['type'];
}

const PokemonMoveEnergyBar: React.FC<PokemonMoveEnergyBarProps> = (props) => {
    const { energyDelta, type } = props;
    const count = Math.floor(100 / Math.abs(energyDelta));

    return (
        <Row gutter={3} justify={'center'} align={'middle'}>
            {times(count, (i) => (
                <Col key={i} flex={1}>
                    <Progress showInfo={false}
                        strokeWidth={10}
                        percent={100}
                        strokeColor={PokemonTypeColorEnum[type]}
                    />
                </Col>
            ))}
        </Row>
    );
};

interface PokemonMoveProps {
    move: IMove;
    mode: 'pve' | 'pvp';
    legacy?: boolean;
}

const PokemonMove: React.FC<PokemonMoveProps> = (props) => {
    const { move, mode, legacy } = props;

    const { power, energyDelta } = mode === 'pvp' ? move.combat : move.base;

    return (
        <Row wrap={false} gutter={1} align='middle' style={{ marginBottom: 10 }}>
            <Col flex='auto'>
                <Row wrap={false} gutter={5} align='middle'>
                    <Col flex='none' style={{ display: 'flex', alignContent: 'center' }}>
                        <TypeIcon pokemonType={move.type} size={20} />
                    </Col>

                    <Col flex='none'>
                        <Row wrap={false} gutter={5}>
                            <Col flex='none'>
                                <Typography.Text strong>
                                    {move.name}
                                </Typography.Text>
                            </Col>
                                
                            <Col flex='none'>
                                {legacy &&
                                    <Tag color='red'>{'絕版'}</Tag>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

            {energyDelta < 0 &&
                <Col span={6} style={{ textAlign: 'end' }}>
                    <PokemonMoveEnergyBar
                        energyDelta={energyDelta}
                        type={move.type}
                    />
                </Col>
            }

            <Col span={3} style={{ textAlign: 'end' }}>
                <Typography.Text>
                    {power}
                </Typography.Text>
            </Col>

            <Col span={3} style={{ textAlign: 'end' }}>
                <Typography.Text>
                    {energyDelta}
                </Typography.Text>
            </Col>
        </Row>
    );
};

export default PokemonMove;
