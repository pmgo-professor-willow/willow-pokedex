// Node modules.
import React from 'react';
import { Row, Col, Tag, Typography } from 'antd';
import styled from 'styled-components';
import {
    LikeTwoTone,
} from '@ant-design/icons';
// Local modules.
import { IMove } from '../../models/pokemon';
import { TypeIcon } from './index';

interface PokemonMoveHeaderProps {
    className?: string;
}

const PokemonMoveHeader: React.FC<PokemonMoveHeaderProps> = (props) => {
    const { className } = props;

    return (
        <div className={className}>
            <Row className='pokemon-move-header' wrap={false} gutter={1} align='middle'>
                <Col span={18} />

                <Col className='cell' span={3}>
                    <Typography.Text>
                        {'傷害'}
                    </Typography.Text>
                </Col>

                <Col className='cell' span={3}>
                    <Typography.Text>
                        {'能量'}
                    </Typography.Text>
                </Col>
            </Row>
        </div>
    );
};

const styledPokemonMoveHeader = styled(PokemonMoveHeader)`
.pokemon-move-header {
    .cell {
        text-align: right;

        span {
            font-size: 0.75em;
            color: rgba(0, 0, 0, 0.55) !important;
        }
    }
}
`;

export default styledPokemonMoveHeader;
