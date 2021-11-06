// Node modules.
import { omit } from 'lodash';
// Local modules.
import type { IPokemon, IEvolution } from '../models/pokemon';

type EvolutionRequirement = Omit<IEvolution, 'uniqueId' | 'form'> | null;

export interface IEvolutionNode {
    pokemon: IPokemon;
    requirement: EvolutionRequirement;
    branches: IEvolutionNode[] | null;
}

function getRootPokemon(familyPokemons: IPokemon[], target: IPokemon): IPokemon {
    const previousPokemon = familyPokemons.find((p) => !!p.evolutions.find((e) =>
        e.uniqueId === target.uniqueId && e.form === target.form
    ));

    if (previousPokemon) {
        return getRootPokemon(familyPokemons, previousPokemon);
    } else {
        return target;
    }
}

function getNextPokemon(familyPokemons: IPokemon[], evo: IEvolution): IPokemon {
    return familyPokemons.find((p) =>
        p.uniqueId === evo.uniqueId && p.form === evo.form
    )!;
}

function getEvolutionNode(familyPokemons: IPokemon[], target: IPokemon, requirement: EvolutionRequirement): IEvolutionNode {
    const nextPokemons = target?.evolutions?.length
        ? target.evolutions.map((e) => {
            const nextPokemon = getNextPokemon(familyPokemons, e);
            const nextRequirement: EvolutionRequirement = omit(e, ['uniqueId', 'form']);
            return getEvolutionNode(familyPokemons, nextPokemon, nextRequirement);
        })
        : null;

    return {
        pokemon: target,
        requirement,
        branches: nextPokemons,
    };
}

function genEvolutionTree(allPokemons: IPokemon[], target?: IPokemon): IEvolutionNode | null {
    if (target) {
        const familyPokemons = allPokemons.filter((p) => p.familyId === target.familyId);
        const rootPokemon = getRootPokemon(familyPokemons, target);
        console.log(familyPokemons);
        const root = getEvolutionNode(familyPokemons, rootPokemon, null);

        return root;
    }

    return null;
}

export {
    genEvolutionTree,
};
