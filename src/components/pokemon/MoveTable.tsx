// Node modules.
import React, { useState } from 'react';
import {
    Row,
    Col,
    Typography,
    Checkbox,
    Divider,
    Image,
    Tag,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styled from 'styled-components';
// Local modules.
import { IPokemon, ILeagueRanking } from '../../models/pokemon';
import * as Pokemon from '../../components/pokemon';

type Mode = 'pve' | 'pvp';

interface PokemonMoveTableProps {
    className?: string;
    pokemon: IPokemon;
    mode: Mode;
    leagueRanking?: ILeagueRanking;
}

const PokemonMoveTable: React.FC<PokemonMoveTableProps> = (props) => {
    const { className } = props;
    const { pokemon, mode, leagueRanking } = props;

    const [detailed, setDetailed] = useState(false);

    const toggleDetailMode = (e: CheckboxChangeEvent) => {
        setDetailed(e.target.checked);
    };

    return (
        <div className={className}>
            <Divider plain orientation='center'>
                <Image preview={false} height={30} width={57.7}
                    src={'/willow-pokedex/assets/quick_move.png'}
                />
                <Typography.Title className='divider-title' level={5}>
                    {'一般招式'}
                </Typography.Title>
            </Divider>

            <div className='detail-checkbox'>
                <Checkbox checked={detailed} onChange={toggleDetailMode}>
                    {'詳細數據'}
                </Checkbox>
            </div>

            <Pokemon.MoveHeader
                detailed={detailed}
            />

            {pokemon.quickMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    detailed={detailed}
                    bestCombatMoveIds={leagueRanking?.quickMoveIds}
                />
            ))}

            {pokemon.eliteQuickMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    legacy={true}
                    detailed={detailed}
                    bestCombatMoveIds={leagueRanking?.quickMoveIds}
                />
            ))}

            <Divider plain orientation='center'>
                <Image preview={false} height={30} width={57.7}
                    src={'/willow-pokedex/assets/cinematic_move.png'}
                />
                <Typography.Title className='divider-title' level={5}>
                    {'特殊招式'}
                </Typography.Title>
            </Divider>

            <div className='detail-checkbox'>
                <Checkbox checked={detailed} onChange={toggleDetailMode}>
                    {'詳細數據'}
                </Checkbox>
            </div>

            <Pokemon.MoveHeader
                detailed={detailed}
            />

            {pokemon.cinematicMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    detailed={detailed}
                    bestCombatMoveIds={leagueRanking?.cinematicMoveIds}
                />
            ))}

            {pokemon.eliteCinematicMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    legacy={true}
                    detailed={detailed}
                    bestCombatMoveIds={leagueRanking?.cinematicMoveIds}
                />
            ))}

            <Divider />

            {!detailed &&
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

                    {pokemon.form === 'PURIFIED' &&
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
                    }

                    {pokemon.form === 'SHADOW' &&
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
                    }
                </Row>
            }
            
            {detailed &&
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Row align='middle'>
                            <Col flex={0}>
                                <Tag color='blue'>{'DPS'}</Tag>
                            </Col>
                            <Col flex={1}>
                                <Typography.Text>
                                    {'每秒可造成傷害'}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row align='middle'>
                            <Col flex={0}>
                                <Tag color='blue'>{'EPS'}</Tag>
                            </Col>
                            <Col flex={1}>
                                <Typography.Text>
                                    {'每秒可產生能量'}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row align='middle'>
                            <Col flex={0}>
                                <Tag color='blue'>{'時間'}</Tag>
                            </Col>
                            <Col flex={1}>
                                <Typography.Text>
                                    {'技能施放時間 (毫秒 ms)'}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
        </div>
    );
};

const styledPokemonMoveTable = styled(PokemonMoveTable)`
& {
    .detail-checkbox {
        text-align: right;
        margin-bottom: 0.25em;

        label {
            transform: scale(0.85);
            transform-origin: right;

            span {
                padding-right: 0;
                color: rgba(0,0,0,0.55) !important;
            }
        }
    }

    /* Overwrite antd components */
    .ant-tag {
        border: none;
    }
}
`;

export default styledPokemonMoveTable;
