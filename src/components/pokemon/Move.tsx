// Node modules.
import React from 'react';
import { Row, Col, Tag, Typography } from 'antd';
// Local modules.
import { ICombatMove } from '../../models/pokemon';
import { TypeIcon } from './index';

interface PokemonMoveProps {
    move: ICombatMove;
    legacy?: boolean;
}

const PokemonMove: React.FC<PokemonMoveProps> = (props) => {
    const { move, legacy } = props;

    return (
        <Row wrap={false} gutter={1} align='middle' style={{ marginBottom: 10 }}>
            <Col flex='auto'>
                <Row wrap={false} gutter={5} align='middle'>
                    <Col flex='none' style={{ display: 'flex', alignContent: 'center' }}>
                        <TypeIcon pokemonType={move.type} size={20} />
                    </Col>

                    <Col flex='auto'>
                        <Row wrap={false} gutter={5}>
                            <Col flex='none'>
                                <Typography.Text strong>
                                    {move.name}
                                </Typography.Text>
                            </Col>
                                
                            <Col flex='auto'>
                                {legacy &&
                                    <Tag color='red'>{'絕版'}</Tag>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

            <Col flex={1} style={{ textAlign: 'end' }}>
                <Typography.Text>
                    {move.power}
                </Typography.Text>
            </Col>
        </Row>
    );
};

export default PokemonMove;
