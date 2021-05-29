// Node modules.
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Affix, Input, Row, Col, Typography } from 'antd';
import LazyLoad from 'react-lazyload';
// Local modules.
import { IPokemon } from '../models/pokemon';
import * as Pokemon from '../components/pokemon';

interface SearchPageProps {
    pokemons: IPokemon[];
}

const SearchPage: React.FC<SearchPageProps> = (props) => {
    const { pokemons } = props;

    const [displayPokemons, setDisplayPokemons] = useState<IPokemon[]>(pokemons);

    const onSearch = useCallback((value: string) => {
        const filteredPokemons = pokemons
            .filter((pokemon) => !pokemon.form)
            .filter((pokemon) => pokemon.name.includes(value));
        setDisplayPokemons(filteredPokemons);
    }, [pokemons]);

    useEffect(() => {
        const filteredPokemons = pokemons
            .filter((pokemon) => !pokemon.form);
        setDisplayPokemons(filteredPokemons);
    }, [pokemons]);

    return (
        <React.Fragment>
            <Affix offsetTop={12}>
                <Input.Search
                    placeholder='搜尋寶可夢'
                    onSearch={onSearch}
                />
            </Affix>

            <Row justify='space-between'>
                {displayPokemons.map((pokemon, i) => (
                    <Col key={i} span={8} flex='100px' style={{ textAlign: 'center' }}>
                        <Link to={`/pokemons/${pokemon.no}`}>
                            <LazyLoad height={100} offset={300}>
                                <Pokemon.Image pokemonNo={pokemon.no} size={100} />
                            </LazyLoad>

                            {/* Name */}
                            <Typography.Title level={4}>
                                {pokemon.name}
                            </Typography.Title>
                        </Link>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};

export default SearchPage;
