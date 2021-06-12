// Node modules.
import React from 'react';
import {
    Row,
    Col,
    Typography,
    Divider,
    Image,
    Tag,
} from 'antd';
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

    console.log(leagueRanking);

    return (
        <div className={className}>
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

            {pokemon.quickMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    bestCombatMoveIds={leagueRanking?.quickMoveIds}
                />
            ))}

            {pokemon.eliteQuickMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    legacy={true}
                    bestCombatMoveIds={leagueRanking?.quickMoveIds}
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

            {pokemon.cinematicMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    bestCombatMoveIds={leagueRanking?.cinematicMoveIds}
                />
            ))}

            {pokemon.eliteCinematicMoves.map((move) => (
                <Pokemon.Move key={move.uniqueId}
                    move={move}
                    mode={mode}
                    legacy={true}
                    bestCombatMoveIds={leagueRanking?.cinematicMoveIds}
                />
            ))}

            <Divider />

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
        </div>
    );
};

const styledPokemonMoveTable = styled(PokemonMoveTable)`
`;

export default styledPokemonMoveTable;
