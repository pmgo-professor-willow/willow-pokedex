// Node modules.
import { compact } from 'lodash';
// Local modules.
import { gameMaster } from './game-master';
import { filterResources } from './resources';
import { mapMoves } from './moves';
import { calculateCP } from './cp-calculator';

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
const pokemonCategoryDict = filterResources(/pokemon_category_(\w+)/);
const pokemonDescriptionDict = filterResources(/pokemon_desc_(\w+)/);

const getPokemons = (): Pokemon[] => {
    const pokemons = gameMaster.reduce<any>((prev, template) => {
        const matches = template.templateId.match(/^V(\d+)_POKEMON_(\w+)$/);

        if (matches) {
            const { 1: noIndex, 2: pokemonNameIndex } = matches;
            const pokemon = template.data.pokemonSettings as Pokemon;

            if (pokemon) {
                const maxStatuses: [atk: number, dev: number, hp: number] = [
                    pokemon.stats.baseAttack + 15,
                    pokemon.stats.baseDefense + 15,
                    pokemon.stats.baseStamina + 15,
                ];

                // undefined -> 'NORMAL'
                // 'xxx_NORMAL' -> remove
                // 'xxx_GALARIAN' -> 'GALARIAN'
                const form = pokemon.form
                    ? pokemon.form.replace(`${pokemon.pokemonId}_`, '')
                    : 'NORMAL';

                if (pokemon.form?.includes('_NORMAL')) {
                    return prev;
                }

                prev.push({
                    uniqueId: pokemon.pokemonId,
                    no: parseInt(noIndex),
                    name: pokemonNameDict[noIndex],
                    types: compact([pokemon.type, pokemon.type2]),
                    category: pokemonCategoryDict[noIndex],
                    description: pokemonDescriptionDict[noIndex],
                    form,
                    stats: pokemon.stats,
                    quickMoves: mapMoves(pokemon.quickMoves),
                    cinematicMoves: mapMoves(compact([
                        ...pokemon.cinematicMoves || [],
                        form === 'PURIFIED' ? 'RETURN' : null,
                        form === 'SHADOW' ? 'FRUSTRATION' : null,
                    ])),
                    eliteQuickMoves: mapMoves(pokemon.eliteQuickMove),
                    eliteCinematicMoves: mapMoves(pokemon.eliteCinematicMove),
                    cpTable: {
                        15: calculateCP(15.0, ...maxStatuses),
                        20: calculateCP(20.0, ...maxStatuses),
                        25: calculateCP(25.0, ...maxStatuses),
                        30: calculateCP(30.0, ...maxStatuses),
                        35: calculateCP(35.0, ...maxStatuses),
                        40: calculateCP(40.0, ...maxStatuses),
                        50: calculateCP(50.0, ...maxStatuses),
                    },
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
