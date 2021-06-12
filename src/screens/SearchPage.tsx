// Node modules.
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Space, Affix, Input, Row, Col, Typography } from 'antd';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
// Local modules.
import { IPokemon } from '../models/pokemon';
import * as Pokemon from '../components/pokemon';

interface SearchPageProps {
    className?: string;
    pokemons: IPokemon[];
}

const SearchPage: React.FC<SearchPageProps> = (props) => {
    const { className } = props;
    const { pokemons } = props;

    const [displayPokemons, setDisplayPokemons] = useState<IPokemon[]>(pokemons);

    const onSearch = useCallback((value: string) => {
        const filteredPokemons = pokemons
            .filter((pokemon) => pokemon.form === 'NORMAL')
            .filter((pokemon) => pokemon.name.includes(value));
        setDisplayPokemons(filteredPokemons);
    }, [pokemons]);

    useEffect(() => {
        const filteredPokemons = pokemons
            .filter((pokemon) => pokemon.form === 'NORMAL');
        setDisplayPokemons(filteredPokemons);
    }, [pokemons]);

    return (
        <Space direction='vertical'>
            <Affix offsetTop={12}>
                <div>
                    <Input.Search
                        placeholder='搜尋寶可夢'
                        onSearch={onSearch}
                    />
                </div>
            </Affix>

            <Row className={className} justify='space-between' gutter={[8, 8]}>
                {displayPokemons.map((pokemon, i) => (
                    <Col key={i} className='pokemon-item' flex='33%'>
                        <Link to={`/willow-pokedex/pokemons/${pokemon.no}/normal`}>
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
        </Space>
    );
};

const styledSearchPage = styled(SearchPage)`
& {
    padding: 12px 12px;
}

.pokemon-item {
    text-align: center;

    .pokemon-container {
        background: #FFF;
        border-radius: 5px;
    }
}
`;

export default styledSearchPage;
