// Node modules.
import React from 'react';
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';

interface PokemonMoveHeaderProps {
    className?: string;
    detailed?: boolean;
}

const PokemonMoveHeader: React.FC<PokemonMoveHeaderProps> = (props) => {
    const { className } = props;
    const { detailed } = props;

    return (
        <div className={className}>
            <Row className='pokemon-move-header' wrap={false} gutter={1} align='middle'>
                <Col flex='auto' />

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

                {detailed &&
                    <Col className='cell' span={3}>
                        <Typography.Text>
                            {'DPS'}
                        </Typography.Text>
                    </Col>
                }

                {detailed &&
                    <Col className='cell' span={3}>
                        <Typography.Text>
                            {'EPS'}
                        </Typography.Text>
                    </Col>
                }

                {detailed &&
                    <Col className='cell' span={3}>
                        <Typography.Text>
                            {'時間'}
                        </Typography.Text>
                    </Col>
                }
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
