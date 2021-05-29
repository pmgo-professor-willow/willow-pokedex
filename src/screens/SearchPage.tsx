// Node modules.
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Space, Affix, Input, Row, Col, Typography } from 'antd';
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
        <Space direction='vertical'>
            <Affix offsetTop={12}>
                <Input.Search
                    placeholder='搜尋寶可夢'
                    onSearch={onSearch}
                />
            </Affix>

            <Row justify='space-between' gutter={[8, 8]}>
                {displayPokemons.map((pokemon, i) => (
                    <Col key={i} flex='33%' style={{ textAlign: 'center' }}>
                        <Link to={`/pokemons/${pokemon.no}`}>
                            <div style={{ background: '#FFF', borderRadius: '5px' }}>
                                {/* Image */}
                                <LazyLoad height={100} offset={300}>
                                    <Pokemon.Image pokemonNo={pokemon.no} size={100} />
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

export default SearchPage;
