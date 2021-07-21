// Local modules.
import type { IPokemon, IEvolution } from '../models/pokemon';

export interface IEvolutionNode {
    pokemon: IPokemon;
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

function getEvolutionNode(familyPokemons: IPokemon[], target: IPokemon): IEvolutionNode {
    // TODO: 'target?' is related with MEGA evolution.
    const nextPokemons = target?.evolutions.length
        ? target.evolutions.map((e) => {
            const nextPokemon = getNextPokemon(familyPokemons, e);
            return getEvolutionNode(familyPokemons, nextPokemon);
        })
        : null;

    return {
        pokemon: target,
        branches: nextPokemons,
    };
}

function genEvolutionTree(allPokemons: IPokemon[], target?: IPokemon): IEvolutionNode | null {
    if (target) {
        const familyPokemons = allPokemons.filter((p) => p.familyId === target.familyId);
        const rootPokemon = getRootPokemon(familyPokemons, target);
        const root = getEvolutionNode(familyPokemons, rootPokemon);

        return root;
    }

    return null;
}

export {
    genEvolutionTree,
};
