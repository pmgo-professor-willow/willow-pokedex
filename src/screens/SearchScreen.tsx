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

        const filteredPokemons = allPokemons.filter((p) => p.name.includes(value));
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
                <div>
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
                <Row justify='space-between' gutter={[8, 8]}>
                    {displayPokemons.map((pokemon, i) => (
                        <Col key={i} className='pokemon-item' flex='33%'>
                            <Link to={`/pokemons/${pokemon.no}/${pokemon.form?.toLowerCase()}`}>
                                <div className='pokemon-container'>
                                    {/* Image */}
                                    <LazyLoad height={100} offset={1000}>
                                        <Pokemon.Image
                                            pokemonNo={pokemon.no}
                                            pokemonForm={pokemon.form}
                                            size={100}
                                        />
                                    </LazyLoad>

                                    {/* Name */}
                                    <Typography.Text >
                                        {pokemon.name}
                                    </Typography.Text>
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
    padding: 12px 12px;

    /* Fix the infinite-scroll layout issue */
    .infinite-scroll-component > .ant-row {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
}

.pokemon-item {
    text-align: center;

    .pokemon-container {
        background: #FFF;
        border-radius: 5px;
    }
}
`;

export default styledSearchScreen;
