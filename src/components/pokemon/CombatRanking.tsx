// Node modules.
import React from 'react';
import { Col, Row, Badge, Image } from 'antd';
import styled from 'styled-components';
// Local modules.
import { IPokemon } from '../../models/pokemon';

interface PokemonCombatRankingProps {
    className?: string;
    pokemon: IPokemon;
}

const PokemonCombatRanking: React.FC<PokemonCombatRankingProps> = (props) => {
    const { className } = props;
    const { pokemon } = props;

    return (
        <Row className={className}>
            <Col className='pokemon-ranking' flex={1}>
                <Badge
                    count={pokemon.greatLeague?.ranking || '-'}
                    overflowCount={999}
                >
                    <Image preview={false} height={45} width={45}
                        src={'/willow-pokedex/assets/combat_great_league.png'}
                    />
                </Badge>
            </Col>

            <Col className='pokemon-ranking' flex={1}>
                <Badge
                    count={pokemon.ultraLeague?.ranking || '-'}
                    overflowCount={999}
                >
                    <Image preview={false} height={45} width={45}
                        src={'/willow-pokedex/assets/combat_ultra_league.png'}
                    />
                </Badge>
            </Col>

            <Col className='pokemon-ranking' flex={1}>
                <Badge
                    count={pokemon.masterLeague?.ranking || '-'}
                    overflowCount={999}
                >
                    <Image preview={false} height={45} width={45}
                        src={'/willow-pokedex/assets/combat_master_league.png'}
                    />
                </Badge>
            </Col>
        </Row>
    );
};

const styledPokemonCombatRanking = styled(PokemonCombatRanking)`
& {
    margin-top: 2em;
    margin-bottom: 3em;
}

.pokemon-ranking {
    text-align: center;
}
`;

export default styledPokemonCombatRanking;
