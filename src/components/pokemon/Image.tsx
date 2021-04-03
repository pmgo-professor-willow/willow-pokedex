// Node modules.
import React from 'react';
import { Image } from 'antd';

interface PokemonImageProps {
    pokemonNo: number;
    pokemonForm?: string;
    size?: number;
}

const PokemonImage: React.FC<PokemonImageProps> = (props) => {
    const {
        pokemonNo,
        pokemonForm = '00',
        size = 200,
    } = props;

    const urlBase = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256';
    const no = String(pokemonNo).padStart(3, '0');
    const imageUrl = `${urlBase}/pokemon_icon_${no}_${pokemonForm}.png`;

    return (
        <Image preview={false} width={size} height={size}
            src={imageUrl}
        />
    );
};

export default PokemonImage;
