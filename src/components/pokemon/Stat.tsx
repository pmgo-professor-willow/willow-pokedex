// Node modules.
import React from 'react';
import { Row, Col, Typography, Progress } from 'antd';

interface PokemonStatProps {
    type: 'attack' | 'defense' | 'stamina';
    value: number;
}

const PokemonStat: React.FC<PokemonStatProps> = (props) => {
    const { type, value } = props;

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
                    percent={30}
                    strokeColor={strokeColor}
                />
            </Col>
        </Row>
    );
};

export default PokemonStat;
