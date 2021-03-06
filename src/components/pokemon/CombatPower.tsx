// Node modules.
import React from 'react';
import { Divider, Image, Table, Typography } from 'antd';
import styled from 'styled-components';

interface PokemonCombatPowerProps {
    className?: string;
    cpTable: {
        [level: string]: number;
    };
}

const PokemonCombatPower: React.FC<PokemonCombatPowerProps> = (props) => {
    const { className } = props;
    const { cpTable } = props;

    const data = [
        { level: 15, cp: cpTable['15'], description: '調查課題遭遇' },
        { level: 20, cp: cpTable['20'], description: '孵化 / 團體戰' },
        { level: 25, cp: cpTable['25'], description: '團體戰 (天氣加成)' },
        { level: 30, cp: cpTable['30'], description: '野生遭遇' },
        { level: 35, cp: cpTable['35'], description: '野生遭遇 (天氣加成)' },
        { level: 40, cp: cpTable['40'], description: '最高等級' },
        { level: 50, cp: cpTable['50'], description: '最高等級 (XL)' },
    ];

    return (
        <div id='combat-power' className={className}>
            <Divider plain orientation='center'>
                <Image preview={false} height={30} width={30}
                    src={'/willow-pokedex/assets/pokemon_cp.png'}
                />

                <Typography.Title className='divider-title' level={5}>
                    {'最大 CP'}
                </Typography.Title>
            </Divider>

            <Table dataSource={data} pagination={false} size='small' showHeader={false}>
                <Table.Column
                    align='center'
                    key='level'
                    dataIndex='level'
                    render={(value) => (
                        <Typography.Text strong>
                            {`等級 ${value}`}
                        </Typography.Text>
                    )}
                />

                <Table.Column
                    key='description'
                    dataIndex='description'
                    render={(value) => (
                        <Typography.Text type='secondary'>
                            {value}
                        </Typography.Text>
                    )}
                />

                <Table.Column
                    key='cp'
                    dataIndex='cp'
                />
            </Table>
        </div>
    );
};

const styledPokemonCombatPower = styled(PokemonCombatPower)`
`;

export default styledPokemonCombatPower;
