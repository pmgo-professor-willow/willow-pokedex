// Node modules.
import React from 'react';
import { Col, Row, Button, Badge, Image } from 'antd';
import styled from 'styled-components';
// Local modules.
import type { IPokemon, League } from '../../models/pokemon';

interface RankingButtonProps {
    ranking?: number;
    imageSrc: string;
    league: League;
    setLeague: React.Dispatch<React.SetStateAction<League | undefined>>;
    active: boolean;
}

const RankingButton: React.FC<RankingButtonProps> = (props) => {
    const { ranking, imageSrc, league, setLeague, active } = props;

    return (
        <Button type={active ? 'primary' : 'link'}
            onClick={() => setLeague(league)}
        >
            <Badge
                count={ranking || '-'}
                overflowCount={999}
            >
                <Image preview={false} height={45} width={45}
                    src={imageSrc}
                />
            </Badge>
        </Button>
    );
};

interface PokemonCombatRankingProps {
    className?: string;
    pokemon: IPokemon;
    league?: League;
    setLeague: React.Dispatch<React.SetStateAction<League | undefined>>;
}

const PokemonCombatRanking: React.FC<PokemonCombatRankingProps> = (props) => {
    const { className } = props;
    const { pokemon, league, setLeague } = props;

    return (
        <Row className={className}>
            <Col className='pokemon-ranking' flex={1}>
                <RankingButton
                    ranking={pokemon.greatLeague?.ranking}
                    imageSrc={'/willow-pokedex/assets/combat_great_league.png'}
                    league={'greatLeague'}
                    setLeague={setLeague}
                    active={league === 'greatLeague'}
                />
            </Col>

            <Col className='pokemon-ranking' flex={1}>
                <RankingButton
                    ranking={pokemon.ultraLeague?.ranking}
                    imageSrc={'/willow-pokedex/assets/combat_ultra_league.png'}
                    league={'ultraLeague'}
                    setLeague={setLeague}
                    active={league === 'ultraLeague'}
                />
            </Col>

            <Col className='pokemon-ranking' flex={1}>
                <RankingButton
                    ranking={pokemon.masterLeague?.ranking}
                    imageSrc={'/willow-pokedex/assets/combat_master_league.png'}
                    league={'masterLeague'}
                    setLeague={setLeague}
                    active={league === 'masterLeague'}
                />
            </Col>
        </Row>
    );
};

const styledPokemonCombatRanking = styled(PokemonCombatRanking)`
& {
    padding-bottom: 1em;
}

.pokemon-ranking {
    text-align: center;

    button {
        padding: 2em 2em 5em 2em;

        &.ant-btn-primary {
            background: rgba(24, 144, 255, 0.15);
        }
    }
}
`;

export default styledPokemonCombatRanking;
