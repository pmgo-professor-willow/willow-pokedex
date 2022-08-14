// Local modules.
import { IPokemon } from './pokemon';

export interface IGeneration {
    no: number;
    displayName: string;
    pokemons: IPokemon[];
}
