// Node modules.
import { compact } from 'lodash';
// Local modules.
import { gameMaster } from './game-master';
import { filterResources } from './resources';
import { mapMoves } from './moves';

interface Pokemon {
    pokemonId: string;
    type: string;
    type2: string;
    stats: {
        baseStamina: number;
        baseAttack: number;
        baseDefense: number;
    };
    quickMoves?: string[];
    cinematicMoves?: string[];
    eliteQuickMove?: string[];
    eliteCinematicMove?: string[];
    familyId: string;
    form?: string;
    thirdMove: {
        stardustToUnlock: number;
        candyToUnlock: number;
    };
}

const pokemonNameDict = filterResources(/pokemon_name_(\w+)/);

const getPokemons = (): Pokemon[] => {
    const pokemons = gameMaster.reduce<any>((prev, template) => {
        const matches = template.templateId.match(/^V(\d+)_POKEMON_(\w+)$/);

        if (matches) {
            const { 1: noIndex, 2: pokemonNameIndex } = matches;
            const pokemon = template.data.pokemonSettings as Pokemon;

            if (pokemon) {
                prev.push({
                    uniqueId: pokemon.pokemonId,
                    no: parseInt(noIndex),
                    name: pokemonNameDict[noIndex],
                    types: compact([pokemon.type, pokemon.type2]),
                    form: pokemon.form,
                    stats: pokemon.stats,
                    quickMoves: mapMoves(pokemon.quickMoves),
                    cinematicMoves: mapMoves(pokemon.cinematicMoves),
                    eliteQuickMoves: mapMoves(pokemon.eliteQuickMove),
                    eliteCinematicMoves: mapMoves(pokemon.eliteCinematicMove),
                });
            }
        }

        return prev;
    }, []);

    return pokemons;
};

export {
    getPokemons,
};
