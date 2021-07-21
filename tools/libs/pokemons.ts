// Node modules.
import { compact } from 'lodash';
// Local modules.
import { getGameMaster } from './game-master';
import { getRanking } from './league-ranking';
import { filterResources } from './resources';
import { getMoveDict, mapMoves } from './moves';
import { calculateCP } from './cp-calculator';
import { formatEvolutions } from './evolution-formatter';
import { isIgnored } from './ignored-pokemon';

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
    evolutionBranch?: {
        evolution: string;
        form?: string;
        candyCost: number;
        priority?: number;
        // Evolution requirement
        evolutionItemRequirement?: string;
        lureItemRequirement?: string;
        kmBuddyDistanceRequirement?: number;
        mustBeBuddy?: boolean;
        onlyDaytime?: boolean;
        questDisplay?: {
            questRequirementTemplateId: string;
        }[];
        // Mega evolution
        temporaryEvolution?: string;
        temporaryEvolutionEnergyCost?: number;
        temporaryEvolutionEnergyCostSubsequent?: number;
    }[];
}

const getPokemons = (): Pokemon[] => {
    const pokemonNameDict = filterResources(/pokemon_name_(\w+)/);
    const pokemonCategoryDict = filterResources(/pokemon_category_(\w+)/);
    const pokemonDescriptionDict = filterResources(/pokemon_desc_(\w+)/);

    const moveDict = getMoveDict();

    const pokemons = getGameMaster().reduce<any>((prev, template) => {
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

                const pokemonInstance = {
                    uniqueId: pokemon.pokemonId,
                    no: parseInt(noIndex),
                    name: pokemonNameDict[noIndex],
                    types: compact([pokemon.type, pokemon.type2]),
                    category: pokemonCategoryDict[noIndex],
                    description: pokemonDescriptionDict[noIndex],
                    form,
                    // Evolutions.
                    familyId: pokemon.familyId,
                    evolutions: formatEvolutions(pokemon.evolutionBranch),
                    // Stats and moves.
                    stats: pokemon.stats,
                    quickMoves: mapMoves(moveDict, pokemon.quickMoves),
                    cinematicMoves: mapMoves(moveDict, compact([
                        ...pokemon.cinematicMoves || [],
                        form === 'PURIFIED' ? 'RETURN' : null,
                        form === 'SHADOW' ? 'FRUSTRATION' : null,
                    ])),
                    eliteQuickMoves: mapMoves(moveDict, pokemon.eliteQuickMove),
                    eliteCinematicMoves: mapMoves(moveDict, pokemon.eliteCinematicMove),
                    // Extra.
                    cpTable: {
                        15: calculateCP(15.0, ...maxStatuses),
                        20: calculateCP(20.0, ...maxStatuses),
                        25: calculateCP(25.0, ...maxStatuses),
                        30: calculateCP(30.0, ...maxStatuses),
                        35: calculateCP(35.0, ...maxStatuses),
                        40: calculateCP(40.0, ...maxStatuses),
                        50: calculateCP(50.0, ...maxStatuses),
                    },
                    greatLeague: getRanking(pokemon.pokemonId, 'great', form),
                    ultraLeague: getRanking(pokemon.pokemonId, 'ultra', form),
                    masterLeague: getRanking(pokemon.pokemonId, 'master', form),
                };

                if (!isIgnored(pokemonInstance.no, pokemonInstance.form)) {
                    prev.push(pokemonInstance);
                }
            }
        }

        return prev;
    }, []);

    return pokemons;
};

export {
    getPokemons,
};
