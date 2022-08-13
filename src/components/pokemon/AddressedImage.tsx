// Node modules.
import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import styled from 'styled-components';
// Local modules.
import LegacyImage from './Image';

interface PokemonAddressedImageProps {
    className?: string;
    pokemonNo: number;
    pokemonForm?: string;
    collection?: string;
    secondGender?: boolean;
    shiny?: boolean;
    size?: number;
}

const getImageUrl = (pokemonNo: number, pokemonForm?: string, collection?: string, secondGender?: boolean, shiny?: boolean): string => {
    const urlBase = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/Addressable%20Assets';
    const imageText = [
        // Part 1: No
        `pm${pokemonNo}`,
        // Part 2: Form
        pokemonForm !== 'NORMAL' && `f${pokemonForm}`,
        // Part 3: Collection
        collection && `c${collection}`,
        // Part 4: Gender
        secondGender && 'g2',
        // Part 5: Shiny
        shiny && 's',
    ].filter(Boolean).join('.');

    const imageUrl = `${urlBase}/${imageText}.icon.png`;

    return imageUrl;
};

const unknownImageUrl = '/willow-pokedex/assets/unknown-pokemon.png';

const PokemonAddressedImage: React.FC<PokemonAddressedImageProps> = (props) => {
    const { className } = props;

    const {
        pokemonNo,
        pokemonForm = 'NORMAL',
        collection,
        secondGender,
        shiny,
        size,
    } = props;

    const [imageUrl, setImageUrl] = useState(unknownImageUrl);
    const [addressable, setAddressable] = useState(true);

    useEffect(() => {
        const url = getImageUrl(pokemonNo, pokemonForm, collection, secondGender, shiny);
        setImageUrl(url);
        setAddressable(true);
    }, [pokemonNo, pokemonForm, collection, secondGender, shiny]);

    return (addressable
        ? <Image className={className} preview={false} width={size} height={size}
            src={imageUrl}
            onError={() => setAddressable(false)}
        />
        : <LegacyImage className={className}
            pokemonNo={pokemonNo}
            pokemonForm={pokemonForm}
            shiny={shiny}
            size={size}
        />
    );
};

const styledPokemonAddressedImage = styled(PokemonAddressedImage)`
& {
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
}
`;

export default styledPokemonAddressedImage;
