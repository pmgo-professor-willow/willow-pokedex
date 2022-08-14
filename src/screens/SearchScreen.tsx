// Node modules.
import { chain } from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Space, Affix, Input, Row, Col, Typography, Divider, Spin } from 'antd';
import LazyLoad from 'react-lazyload';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
// Local modules.
import type { IGeneration } from '../models/generation';
import { PokemonContext } from '../contexts/pokemon';
import * as Pokemon from '../components/pokemon';

interface SearchScreenProps {
    className?: string;
}

const DEFAULT_SCROLL_THRESHOLD = '2000px';

const SearchScreen: React.FC<SearchScreenProps> = (props) => {
    const { className } = props;

    const pokemons = useContext(PokemonContext);

    const [hasMore, setHasMore] = useState(true);
    const [generations, setGenerations] = useState<IGeneration[]>([]);
    const [displayGenerations, setDisplayGenerations] = useState<IGeneration[]>([]);

    const onSearch = useCallback((value: string) => {
        if (!value) {
            setHasMore(true);
            setDisplayGenerations(generations.slice(0, 1));
            return;
        }

        setHasMore(false);

        const displayGenerations = generations.map((generation) => ({
            ...generation,
            pokemons: generation.pokemons.filter((pokemon) =>
                pokemon.name?.includes(value) || pokemon.uniqueId?.includes(value.toUpperCase())
            ),
        }));
        setDisplayGenerations(displayGenerations);
    }, [generations]);

    const fetchMoreData = useCallback(() => {
        if (!hasMore || displayGenerations.length >= generations.length) {
            setHasMore(false);
            return;
        }

        const [startIdx, endIdx] = [
            displayGenerations.length,
            displayGenerations.length + 1,
        ];
        const nextGeneration = generations.slice(startIdx, endIdx);
        setDisplayGenerations(displayGenerations.concat(nextGeneration));
    }, [generations, displayGenerations, hasMore]);

    useEffect(() => {
        const generationRules = [
            { generationNo: 1, displayGeneration: '關都地區', noRange: [1, 151], extraForms: [] },
            { generationNo: 2, displayGeneration: '城都地區', noRange: [152, 251], extraForms: [] },
            { generationNo: 3, displayGeneration: '豐緣地區', noRange: [252, 386], extraForms: [] },
            { generationNo: 4, displayGeneration: '神奧地區', noRange: [387, 493], extraForms: [] },
            { generationNo: 5, displayGeneration: '合眾地區', noRange: [494, 649], extraForms: [] },
            { generationNo: 6, displayGeneration: '卡洛斯地區', noRange: [650, 721], extraForms: [] },
            { generationNo: 7, displayGeneration: '阿羅拉地區', noRange: [722, 809], extraForms: ['ALOLA'] },
            { generationNo: 8, displayGeneration: '伽勒爾地區', noRange: [810, 898], extraForms: ['GALARIAN'] },
            { generationNo: 4, displayGeneration: '洗翠地區', noRange: [899, 905], extraForms: ['HISUIAN'] },
            { generationNo: 9, displayGeneration: '帕底亞地區', noRange: [906, Infinity], extraForms: ['PALDEAN'] },
        ];

        // Group by no and get the first one.
        const generations = generationRules.map((generationRule) => ({
            no: generationRule.generationNo,
            displayName: generationRule.displayGeneration,
            pokemons: chain(pokemons)
                .filter(({ no, form }) => {
                    const noInRange = generationRule.noRange[0] <= no && no <= generationRule.noRange[1];
                    const sameForm = generationRule.extraForms.includes(String(form));
                    return noInRange || sameForm;
                })
                .groupBy(({ no }) => no)
                .map(([first]) => first)
                .value()
        }));

        setGenerations(generations);
        setDisplayGenerations(generations.slice(0, 1));
    }, [pokemons]);

    return (
        <Space className={className} direction='vertical'>
            <Affix>
                <div className='search-box'>
                    <Input.Search
                        placeholder='搜尋寶可夢'
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </Affix>

            <InfiniteScroll
                dataLength={displayGenerations.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spin className='loading' />}
                scrollThreshold={DEFAULT_SCROLL_THRESHOLD}
            >
                {/* Blocks by generations */}
                {displayGenerations.map((generation) => (generation.pokemons.length === 0
                    ? null
                    : (
                        <div className='generation-block'>
                            <Divider className='generation-title'>
                                {generation.displayName}
                            </Divider>

                            {/* Blocks by pokemons */}
                            <Row key={generation.displayName} className='pokemons' justify='start' gutter={[8, 8]}>
                                {generation.pokemons.map((pokemon) =>
                                    <Col key={pokemon.no}
                                        id={`${generation.displayName}-${pokemon.name}`}
                                        className={'pokemon-item'}
                                        flex='33%'
                                    >
                                        <Link to={`/pokemons/${pokemon.no}/${pokemon.form?.toLowerCase()}`}>
                                            <div className={['pokemon-container', pokemon.types[0]].join(' ')}>
                                                {/* Image */}
                                                <LazyLoad height={100} offset={1000}>
                                                    <Pokemon.AddressedImage
                                                        pokemonNo={pokemon.no}
                                                        pokemonForm={pokemon.form}
                                                        size={100}
                                                    />
                                                </LazyLoad>

                                                <Row className='pokemon-info'>
                                                    {/* No. */}
                                                    <Col flex='20px'>
                                                        <Typography.Text className='pokemon-no'>
                                                            {pokemon.no.toString().padStart(3, '0')}
                                                        </Typography.Text>
                                                    </Col>

                                                    {/* Name */}
                                                    <Col flex='auto'>
                                                        <Typography.Text className='pokemon-name'>
                                                            {pokemon.name}
                                                        </Typography.Text>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Link>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    )
                ))}
            </InfiniteScroll>
        </Space>
    );
};

const styledSearchScreen = styled(SearchScreen)`
& {
    width: 100%;

    /* Fix the infinite-scroll layout issue */
    .infinite-scroll-component > .ant-row {
        margin-left: 0;
        margin-right: 0;
    }
}

.search-box {
    padding: 12px 12px 0 12px;
}

.loading {
    display: flex;
    justify-content: center;
    margin: 1.5em 0;
}

.generation-title {
    color: rgba(0, 0, 0, 0.65);
    font-size: 1.25em;
    letter-spacing: .25em;
    padding: 0;
    margin: .5em 0 .5em 0;
}

.pokemons {
    padding: 0 12px 36px 12px;
    
    .pokemon-item {
        text-align: center;

        .pokemon-container {
            background: #FFF;
            border-radius: 5px;

            &.POKEMON_TYPE_NORMAL {
                background-color: #D5C398;
                background-image: url("/willow-pokedex/type-backgrounds/normal.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_FIRE {
                background-color: #5C2A3D;
                background-image: url("/willow-pokedex/type-backgrounds/fire.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_WATER {
                background-color: #0085A1;
                background-image: url("/willow-pokedex/type-backgrounds/water.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_GRASS {
                background-color: #AED059;
                background-image: url("/willow-pokedex/type-backgrounds/grass.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_ELECTRIC {
                background-color: #123A63;
                background-image: url("/willow-pokedex/type-backgrounds/electric.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_ICE {
                background-color: #416987;
                background-image: url("/willow-pokedex/type-backgrounds/ice.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_FIGHTING {
                background-color: #836F52;
                background-image: url("/willow-pokedex/type-backgrounds/fighting.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_POISON {
                background-color: #04102D;
                background-image: url("/willow-pokedex/type-backgrounds/poison.png");
                background-size: 100% 100%;
            } 

            &.POKEMON_TYPE_GROUND {
                background-color: #BE9973;
                background-image: url("/willow-pokedex/type-backgrounds/ground.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_FLYING {
                background-color: #6CA1EB;
                background-image: url("/willow-pokedex/type-backgrounds/flying.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_PSYCHIC {
                background-color: #232CB5;
                background-image: url("/willow-pokedex/type-backgrounds/psychic.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_BUG {
                background-color: #C0A910;
                background-image: url("/willow-pokedex/type-backgrounds/bug.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_ROCK {
                background-color: #76808E;
                background-image: url("/willow-pokedex/type-backgrounds/rock.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_GHOST {
                background-color: #191256;
                background-image: url("/willow-pokedex/type-backgrounds/ghost.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_DARK {
                background-color: #04102D;
                background-image: url("/willow-pokedex/type-backgrounds/dark.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_DRAGON {
                background-color: #436B40;
                background-image: url("/willow-pokedex/type-backgrounds/dragon.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_STEEL {
                background-color: #1C2936;
                background-image: url("/willow-pokedex/type-backgrounds/steel.png");
                background-size: 100% 100%;
            }

            &.POKEMON_TYPE_FAIRY {
                background-color: #8D70E0;
                background-image: url("/willow-pokedex/type-backgrounds/fairy.png");
                background-size: 100% 100%;
            }

            .pokemon-info {
                background-color: rgba(0, 0, 0, .5);
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                
                .pokemon-no {
                    color: rgba(255, 255, 255, .65);
                    font-size: 0.65em;
                    padding-left: .5em;
                }

                .pokemon-name {
                    color: rgba(255, 255, 255, .85);
                }
            }
        }
    }
}
`;

export default styledSearchScreen;
