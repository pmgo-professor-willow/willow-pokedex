// Node modules.
import React from 'react';
import { Col, Divider, Image, Row, Typography } from 'antd';
import styled from 'styled-components';
// Local modules.
import { IPokemon } from '../../models/pokemon';

interface PokemonAboutProps {
    className?: string;
    pokemon: IPokemon;
}

const PokemonAbout: React.FC<PokemonAboutProps> = (props) => {
    const { className } = props;
    const { pokemon } = props;

    return (
        <div id='about' className={className}>
            <Divider plain orientation='center'>
                <Image preview={false} height={30} width={47}
                    src={'/willow-pokedex/assets/pokemon_desc.png'}
                />
                <Typography.Title className='divider-title' level={5}>
                    {'關於'}
                </Typography.Title>
            </Divider>

            <Row align='middle'>
                <Col className='' flex={1}>
                    <Typography.Title level={5}>
                        {pokemon.category}
                    </Typography.Title>

                    <Typography.Paragraph>
                        {pokemon.description}
                    </Typography.Paragraph>
                </Col>
            </Row>
        </div>
    );
};

const styledPokemonAbout = styled(PokemonAbout)`
& {
    margin-bottom: 3em;
}
`;

export default styledPokemonAbout;
