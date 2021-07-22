// Node modules.
import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
// Local modules.
import type { IPokemon } from '../../models/pokemon';
import * as Pokemon from '../../components/pokemon';

interface PokemonTypesProps {
    className?: string;
    pokemon: IPokemon;
}

const PokemonTypes: React.FC<PokemonTypesProps> = (props) => {
    const { className } = props;
    const { pokemon } = props;

    return (
        <div id='types' className={className}>
            <Row className='types' justify={'center'} align={'middle'}>
                {pokemon.types.map((type, i) => (
                    <Col key={i} span={6}>
                        <Pokemon.TypeIcon pokemonType={type} size={35} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

const styledPokemonTypes = styled(PokemonTypes)`
& {
    text-align: center;
    padding: 1em;
    margin-bottom: 2em;
}
`;

export default styledPokemonTypes;
