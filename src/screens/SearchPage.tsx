// Node modules.
import React from 'react';
import { Input } from 'antd';
// Local modules.
import { IPokemon } from '../models/pokemon';

interface SearchPageProps {
    pokemons: IPokemon[];
}

const SearchPage: React.FC<SearchPageProps> = (props) => {
    // const { pokemons } = props;

    const onSearch = () => null;

    return (
        <React.Fragment>
            <Input.Search
                placeholder="input search text"
                onSearch={onSearch}
            />
        </React.Fragment>
    );
};

export default SearchPage;
