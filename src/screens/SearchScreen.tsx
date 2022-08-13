// Node modules.
import { chain } from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Space, Affix, Input, Row, Col, Typography } from 'antd';
import LazyLoad from 'react-lazyload';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
// Local modules.
import type { IPokemon } from '../models/pokemon';
import { PokemonContext } from '../contexts/pokemon';
import * as Pokemon from '../components/pokemon';

interface SearchScreenProps {
    className?: string;
}

const DEFAULT_ITEM_LIMIT = 100;

const SearchScreen: React.FC<SearchScreenProps> = (props) => {
    const { className } = props;

    const pokemons = useContext(PokemonContext);

    const [hasMore, setHasMore] = useState(true);
    const [allPokemons, setAllPokemons] = useState<IPokemon[]>([]);
    const [displayPokemons, setDisplayPokemons] = useState<IPokemon[]>([]);

    const onSearch = useCallback((value: string) => {
        if (!value) {
            setHasMore(true);
            setDisplayPokemons(allPokemons.slice(0, DEFAULT_ITEM_LIMIT));
            return;
        }

        const filteredPokemons = allPokemons.filter((p) => {
            return p.name?.includes(value) || p.uniqueId?.includes(value.toUpperCase());
        });
        setHasMore(false);
        setDisplayPokemons(filteredPokemons);
    }, [allPokemons]);

    const fetchMoreData = useCallback(() => {
        if (!hasMore || displayPokemons.length >= allPokemons.length) {
            setHasMore(false);
            return;
        }

        const [startIdx, endIdx] = [
            displayPokemons.length,
            displayPokemons.length + DEFAULT_ITEM_LIMIT,
        ];
        const nextPokemons = allPokemons.slice(startIdx, endIdx);
        setDisplayPokemons(displayPokemons.concat(nextPokemons));
    }, [allPokemons, displayPokemons, hasMore]);

    useEffect(() => {
        // Group by no and get the first one.
        const filteredPokemons = chain(pokemons).groupBy(({ no }) => no).map(([f]) => f).value();
        setAllPokemons(filteredPokemons);
        setDisplayPokemons(filteredPokemons.slice(0, DEFAULT_ITEM_LIMIT));
    }, [pokemons]);

    return (
        <Space className={className} direction='vertical'>
            <Affix offsetTop={12}>
                <div className='search-box'>
                    <Input.Search
                        placeholder='搜尋寶可夢'
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </Affix>

            <InfiniteScroll
                dataLength={displayPokemons.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={null}
            >
                <Row className='pokemons' justify='space-between' gutter={[8, 8]}>
                    {displayPokemons.map((pokemon, i) => (
                        <Col key={i} className={'pokemon-item'} flex='33%'>
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
                    ))}
                </Row>
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
    padding: 0 12px;
}

.pokemons {
    padding: 12px 12px;
    
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
