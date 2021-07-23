// Node modules.
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Divider, Image, Typography, Card, Badge } from 'antd';
import Xarrow from 'react-xarrows';
import styled from 'styled-components';
// Local modules.
import type { IPokemon } from '../../models/pokemon';
import * as Pokemon from '../../components/pokemon';
import type { IEvolutionNode } from '../../utils/generate-evolution-tree';
import { useCallback } from 'react';

const getDistinctId = (pokemon: IPokemon) => `${pokemon.no}-${pokemon.form}`;

interface CostBadgeProps {
    className?: string;
    cost?: number;
    type?: 'mega' | 'male' | 'female';
}

const CostBadge: React.FC<CostBadgeProps> = (props) => {
    const { className } = props;
    const { cost, type } = props;

    if (cost === undefined) {
        return null;
    }

    return (
        <Badge className={[className, type].join(' ')}
            count={cost}
            overflowCount={999}
            size='small'
        />
    );
};

const StyledCostBadge = styled(CostBadge)`
& {
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .ant-badge-count {
        background-color: #ACACAC;
        z-index: 10;
    }

    &.mega .ant-badge-count {
        background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
        background-size: 300% 300%;
        animation: gradient 3s ease infinite;
    }

    &.female .ant-badge-count {
        background-color: #F472B6;
    }

    &.male .ant-badge-count {
        background-color: #3B82F6;
    }
}
`;

interface PokemonEvolutionCellProps {
    className?: string;
    evolutionNode?: IEvolutionNode;
    previousNode?: IEvolutionNode;
}

const PokemonEvolutionCell: React.FC<PokemonEvolutionCellProps> = (props) => {
    const { className } = props;
    const { evolutionNode, previousNode } = props;

    const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    if (!evolutionNode?.pokemon) {
        return null;
    }

    const { pokemon, requirement } = evolutionNode;
    const hasBranches = !!evolutionNode.branches?.length;

    let costBadge = <StyledCostBadge cost={requirement?.candyCost} />;
    let lineColor = '#ACACAC';
    // Mega evolution.
    if (!!requirement?.energyCost) {
        costBadge = <StyledCostBadge cost={requirement?.energyCost} type='mega' />;
        lineColor = '#23D5AB';
    }
    // Female.
    else if (requirement?.gender === 'FEMALE') {
        costBadge = <StyledCostBadge cost={requirement?.candyCost} type='female' />;
        lineColor = '#F472B6';
    }
    // Male.
    else if (requirement?.gender === 'MALE') {
        costBadge = <StyledCostBadge cost={requirement?.candyCost} type='male' />;
        lineColor = '#3B82F6';
    }

    return (
        <div className={className}>
            <Col flex={1}>
                <Link
                    onClick={scrollToTop}
                    to={`/willow-pokedex/pokemons/${pokemon.no}/${pokemon.form?.toLowerCase()}`}
                >
                    <Card id={getDistinctId(pokemon)} className={`pokemon-card ${hasBranches ? 'can-evolute' : ''}`}
                        hoverable
                        cover={
                            <Pokemon.Image
                                pokemonNo={pokemon.no}
                                pokemonForm={pokemon.form}
                            />
                        }
                    >
                        <Card.Meta
                            title={pokemon.name}
                        />
                    </Card>
                </Link>

                {hasBranches &&
                    <Row justify='center' align='top'>
                        {evolutionNode.branches?.map((en) =>
                            <StyledPokemonEvolutionCell
                                evolutionNode={en}
                                previousNode={evolutionNode}
                            />
                        )}
                    </Row>
                }
            </Col>

            {/* Draw the evolution connection */}
            {previousNode &&
                <Xarrow
                    start={getDistinctId(previousNode.pokemon)}
                    end={getDistinctId(pokemon)}
                    label={costBadge}
                    animateDrawing
                    color={lineColor}
                    dashness={{ strokeLen: 3, nonStrokeLen: 2, animation: 1 }}
                    headSize={4}
                />
            }
        </div>
    );
};

const StyledPokemonEvolutionCell = styled(PokemonEvolutionCell)`
& {
    &:not(:last-child) {
        margin-right: .5em;
    }

    &:not(:first-child) {
        margin-left: .5em;
    }

    .pokemon-card {
        width: calc(23vw);
        max-width: 100px;
        border-radius: 5px;
        background-color: #FAFAFA;
        padding: 2px;
        margin: 0 auto;

        &.can-evolute {
            margin-bottom: 60px;
        }

        /* Overwrite antd components */
        .ant-card-body {
            padding: 0 0 .5em 0 !important;
            text-align: center;
        }

        .ant-card-meta-title {
            font-size: .95em;
        }
    }
}
`;

interface PokemonEvolutionTreeProps {
    className?: string;
    evolutionTree: IEvolutionNode | null;
}

const PokemonEvolutionTree: React.FC<PokemonEvolutionTreeProps> = (props) => {
    const { className } = props;
    const { evolutionTree } = props;

    if (!evolutionTree) {
        return null;
    }

    return (
        <div id='evolution-tree' className={className}>
            <Divider plain orientation='center'>
                <Image preview={false} height={30} width={32}
                    src={'/willow-pokedex/assets/pokemon_evolution.png'}
                />
                <Typography.Title className='divider-title' level={5}>
                    {'進化路線'}
                </Typography.Title>
            </Divider>

            <Row className='container' justify='center' align='middle'>
                <StyledPokemonEvolutionCell
                    evolutionNode={evolutionTree}
                />
            </Row>
        </div>
    );
};

const styledPokemonEvolutionTree = styled(PokemonEvolutionTree)`
& {
    margin-bottom: 3em;
    position: relative;
}

.container {
    background-color: #EEEEEE;
    border-radius: 5px;
    padding: 1em 0.5em;
}
`;

export default styledPokemonEvolutionTree;
