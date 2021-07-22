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

interface CandyCostBadgeProps {
    className?: string;
    candyCost?: number;
}

const CandyCostBadge: React.FC<CandyCostBadgeProps> = (props) => {
    const { className } = props;
    const { candyCost } = props;

    if (candyCost === undefined) {
        return null;
    }

    return (
        <Badge className={className}
            count={candyCost}
            overflowCount={999}
            size='small'
        />
    );
};

const StyledCandyCostBadge = styled(CandyCostBadge)`
& {
    .ant-badge-count {
        background-color: #ACACAC;
        z-index: 10;
    }
}
`;

interface EvolutionCellProps {
    className?: string;
    evolutionNode?: IEvolutionNode;
    previousNode?: IEvolutionNode;
}

const EvolutionCell: React.FC<EvolutionCellProps> = (props) => {
    const { className } = props;
    const { evolutionNode, previousNode } = props;

    const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    if (!evolutionNode?.pokemon) {
        return null;
    }

    const { pokemon, requirement } = evolutionNode;
    const hasBranches = !!evolutionNode.branches?.length;

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
                    <Row justify='center' align='middle'>
                        {evolutionNode.branches?.map((en) =>
                            <StyledEvolutionCell
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
                    label={
                        <StyledCandyCostBadge
                            candyCost={requirement?.candyCost}
                        />
                    }
                    animateDrawing
                    color='#ACACAC'
                    dashness={{ strokeLen: 3, nonStrokeLen: 2, animation: 1 }}
                    headSize={4}
                />
            }
        </div>
    );
};

const StyledEvolutionCell = styled(EvolutionCell)`
& {
    &:not(:last-child) {
        margin-right: .5em;
    }

    &:not(:first-child) {
        margin-left: .5em;
    }

    .pokemon-card {
        width: calc(20vw);
        max-width: 100px;
        border-radius: 5px;
        background-color: #FAFAFA;
        padding: 5px;
        margin: 0 auto;

        &.can-evolute {
            margin-bottom: 45px;
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

interface EvolutionTreeProps {
    className?: string;
    evolutionTree: IEvolutionNode | null;
}

const EvolutionTree: React.FC<EvolutionTreeProps> = (props) => {
    const { className } = props;
    const { evolutionTree } = props;

    if (!evolutionTree) {
        return null;
    }

    return (
        <div id='evolution-tree' className={className}>
            <Divider plain orientation='center'>
                <Image preview={false} height={30} width={20}
                    src={'/willow-pokedex/assets/pokemon_evolution.png'}
                />
                <Typography.Title className='divider-title' level={5}>
                    {'進化'}
                </Typography.Title>
            </Divider>

            <Row className='container' justify='center' align='middle'>
                <StyledEvolutionCell
                    evolutionNode={evolutionTree}
                />
            </Row>
        </div>
    );
};

const styledEvolutionTree = styled(EvolutionTree)`
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

export default styledEvolutionTree;
