// Node modules.
import React from 'react';
import { Image } from 'antd';
// Local modules.
import type { PokemonType } from '../../models/pokemon';

interface PokemonTypeIconProps {
    pokemonType: PokemonType;
    size?: number;
}

const PokemonTypeIcon: React.FC<PokemonTypeIconProps> = (props) => {
    const {
        pokemonType,
        size = 50,
    } = props;

    const urlBase = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Types/';
    const typeText = pokemonType.replace(/POKEMON_TYPE_/, '');
    const imageUrl = `${urlBase}/POKEMON_TYPE_${typeText}.png`;

    return (
        <Image preview={false} width={size} height={size}
            src={imageUrl}
        />
    );
};

export default PokemonTypeIcon;
