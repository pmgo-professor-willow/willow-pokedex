export type PokemonType =
    'POKEMON_TYPE_BUG'
    | 'POKEMON_TYPE_DARK'
    | 'POKEMON_TYPE_DRAGON'
    | 'POKEMON_TYPE_ELECTRIC'
    | 'POKEMON_TYPE_FAIRY'
    | 'POKEMON_TYPE_FIGHTING'
    | 'POKEMON_TYPE_FIRE'
    | 'POKEMON_TYPE_FLYING'
    | 'POKEMON_TYPE_GHOST'
    | 'POKEMON_TYPE_GRASS'
    | 'POKEMON_TYPE_GROUND'
    | 'POKEMON_TYPE_ICE'
    | 'POKEMON_TYPE_NORMAL'
    | 'POKEMON_TYPE_POISON'
    | 'POKEMON_TYPE_PSYCHIC'
    | 'POKEMON_TYPE_ROCK'
    | 'POKEMON_TYPE_STEEL'
    | 'POKEMON_TYPE_WATER';

export interface IMove {
    id: string;
    name: string;
    uniqueId: string;
    type: PokemonType;
    base: {
        power: number;
        staminaLossScalar: number;
        durationMs: number;
        energyDelta: number;
        accuracyChance?: number;
        criticalChance?: number;
    };
    combat: {
        power: number;
        energyDelta: number;
        durationTurns?: number;
        buffs?: {
            attackerAttackStatStageChange?: number;
            attackerDefenseStatStageChange?: number;
            targetAttackStatStageChange?: number;
            targetDefenseStatStageChange?: number;
            buffActivationChance: number;
        };
    };
    isCommunityMove?: boolean;
}

export interface IPokemonStatus {
    baseStamina: number;
    baseAttack: number;
    baseDefense: number;
}

export type League = 'greatLeague' | 'ultraLeague' | 'masterLeague';

export interface IEvolution {
    uniqueId: string;
    form: string;
    candyCost?: number;
    energyCost?: number;
    item?: string;
    gender?: 'FEMALE' | 'MALE';
}

export interface ILeagueRanking {
    ranking: number;
    quickMoveIds: string[];
    cinematicMoveIds: string[];
}

export interface IPokemon {
    no: number;
    uniqueId: string;
    name: string;
    types: PokemonType[];
    category: string;
    description: string;
    form?: string;
    // Stats and moves.
    stats: IPokemonStatus;
    quickMoves: IMove[];
    cinematicMoves: IMove[];
    eliteQuickMoves: IMove[];
    eliteCinematicMoves: IMove[];
    thirdMove: {
        stardustToUnlock: number;
        candyToUnlock: number;
    };
    // Evolutions.
    familyId: string;
    evolutions: IEvolution[];
    // Extra.
    cpTable: {
        [level: string]: number;
    };
    greatLeague?: ILeagueRanking;
    ultraLeague?: ILeagueRanking;
    masterLeague?: ILeagueRanking;
}
