// Node modules.
import { times } from 'lodash';
import React from 'react';
import { Row, Col, Tag, Typography, Progress } from 'antd';
import styled from 'styled-components';
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

interface PokemonCombatMoveBuffsProps {
    buffs: IMove['combat']['buffs'];
}

const PokemonCombatMoveBuffs: React.FC<PokemonCombatMoveBuffsProps> = (props) => {
    const { buffs } = props;

    if (!buffs) {
        return null;
    }

    const buffColumn = (target: 'self' | 'enemy', metric: 'atk' | 'def', count: number): JSX.Element => {
        const targetText = target === 'self' ? '自身' : '敵方';
        const metricText = metric === 'atk' ? '攻擊' : '防禦';
        const levelText = count > 0
            ? `上升 ${count} 層`
            : `下降 ${Math.abs(count)} 層`;

        let iconText = '';
        if (count === 1) {
            iconText = '🔼';
        } else if (count === -1) {
            iconText = '🔽';
        } else if (count >= 2) {
            iconText = '⏫';
        } else if (count <= -2) {
            iconText = '⏬';
        }

        return (
            <Row className='pokemon-move-sub' wrap={false} gutter={1} align='middle'>
                <Col flex={1}>
                    <Typography.Text>
                        {`${iconText} ${targetText}${metricText}${levelText}`}
                    </Typography.Text>
                </Col>
            </Row>
        );
    };

    return (
        <>
            <Row className='pokemon-move-sub' wrap={false} gutter={1} align='middle'>
                <Col className='numberic' flex={1}>
                    <Typography.Text>
                        {`📈 觸發機率: ${buffs.buffActivationChance * 100}%`}
                    </Typography.Text>
                </Col>
            </Row>

            {buffs.attackerAttackStatStageChange && (
                buffColumn('self', 'atk', buffs.attackerAttackStatStageChange)
            )}

            {buffs.attackerDefenseStatStageChange && (
                buffColumn('self', 'def', buffs.attackerDefenseStatStageChange)
            )}

            {buffs.targetAttackStatStageChange && (
                buffColumn('enemy', 'atk', buffs.targetAttackStatStageChange)
            )}

            {buffs.targetDefenseStatStageChange && (
                buffColumn('enemy', 'def', buffs.targetDefenseStatStageChange)
            )}
        </>
    );
};

interface PokemonMoveProps {
    className?: string;
    move: IMove;
    mode: 'pve' | 'pvp';
    legacy?: boolean;
}

const PokemonMove: React.FC<PokemonMoveProps> = (props) => {
    const { className } = props;
    const { move, mode, legacy } = props;

    const isPVP = mode === 'pvp';
    const { power, energyDelta } = isPVP ? move.combat : move.base;

    return (
        <div className={className}>
            <Row className='pokemon-move-main' wrap={false} gutter={1} align='middle'>
                <Col flex='auto'>
                    <Row wrap={false} gutter={5} align='middle'>
                        <Col className='pokemon-move-type' flex='none'>
                            <TypeIcon pokemonType={move.type} size={20} />
                        </Col>

                        <Col flex='none'>
                            <Row wrap={false} gutter={5}>
                                {/* Move name */}
                                <Col flex='none'>
                                    <Typography.Text strong>
                                        {move.name}
                                    </Typography.Text>
                                </Col>

                                {/* Tags */}
                                <Col flex='none'>
                                    {legacy &&
                                        <Tag color='red'>{'絕版'}</Tag>
                                    }
                                    {move.uniqueId === 'RETURN' &&
                                        <Tag color='cyan'>{'淨化'}</Tag>
                                    }
                                    {move.uniqueId === 'FRUSTRATION' &&
                                        <Tag color='purple'>{'暗影'}</Tag>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                {energyDelta < 0 &&
                    <Col className='numberic' span={6}>
                        <PokemonMoveEnergyBar
                            energyDelta={energyDelta}
                            type={move.type}
                        />
                    </Col>
                }

                <Col className='numberic' span={3}>
                    <Typography.Text>
                        {power}
                    </Typography.Text>
                </Col>

                <Col className='numberic' span={3}>
                    <Typography.Text>
                        {energyDelta}
                    </Typography.Text>
                </Col>
            </Row>

            {isPVP &&
                <PokemonCombatMoveBuffs
                    buffs={move.combat.buffs}
                />
            }
        </div>
    );
};

const styledPokemonMove = styled(PokemonMove)`
& {
    margin-bottom: 0.75em;
}

.pokemon-move-main {
    .pokemon-move-type {
        display: flex;
        align-content: center;
    }

    .numberic {
        text-align: end;
    }
}

.pokemon-move-sub {
    padding-left: 2.5em;
    margin: 0.25em 0;
}
`;

export default styledPokemonMove;
