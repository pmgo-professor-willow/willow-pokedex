// Node modules.
import _ from 'lodash';
// Local modules.
import { getGameMaster } from './game-master';
import { filterResources } from './resources';
import type { Resource } from './resources';

const getMoveDict = (): Resource => {
    return filterResources(/move_name_(\d+)/);
};

interface BaseMoveRaw {
    movementId: string;
    animationId: number;
    pokemonType: string;
    power: number;
    staminaLossScalar: number;
    trainerLevelMin: number;
    trainerLevelMax: number;
    vfxName: string;
    durationMs: number;
    damageWindowStartMs: number;
    damageWindowEndMs: number;
    energyDelta: number;
    // Quick Move
    accuracyChance?: number;
    // Cinematic Move
    criticalChance?: number;
}

interface BaseMove {
    id: string;
    name: string;
    uniqueId: string;
    type: string;
    power: number;
    staminaLossScalar: number;
    durationMs: number;
    energyDelta: number;
    accuracyChance?: number;
    criticalChance?: number;
}

const getBaseMoves = (moveDict: Resource): BaseMove[] => {
    const moves = getGameMaster().reduce<BaseMove[]>((prev, template) => {
        const matches = template.templateId.match(/^V(\d+)_MOVE_(\w+)$/);

        if (matches) {
            const { 1: id, 2: moveNameRaw } = matches;
            const moveRaw = template.data.moveSettings as BaseMoveRaw;

            prev.push({
                id,
                name: moveDict[id],
                uniqueId: moveRaw.movementId,
                type: moveRaw.pokemonType,
                power: moveRaw.power,
                accuracyChance: moveRaw.accuracyChance,
                staminaLossScalar: moveRaw.staminaLossScalar,
                durationMs: moveRaw.durationMs,
                energyDelta: moveRaw.energyDelta,
            });
        }

        return prev;
    }, []);

    return moves;
};

const mapBaseMoves = (moveDict: Resource, moveUniqueIds: string[] = []) => {
    const allMoves = getBaseMoves(moveDict);
    return moveUniqueIds.map((moveUniqueId) => allMoves.find((move) => move.uniqueId === moveUniqueId)!);
};

interface CombatMoveBuff {
    attackerAttackStatStageChange?: number;
    attackerDefenseStatStageChange?: number;
    targetAttackStatStageChange?: number;
    targetDefenseStatStageChange?: number;
    buffActivationChance: number;
}

interface CombatMoveRaw {
    uniqueId: string;
    pokemonType: string;
    power: number;
    energyDelta: number;
    vfxName: string;
    durationTurns?: number;
    buffs?: CombatMoveBuff;
}

interface CombatMove {
    id: string;
    name: string;
    uniqueId: string;
    type: string;
    power: number;
    energyDelta: number;
    durationTurns?: number;
    buffs?: CombatMoveBuff;
}

const getCombatMoves = (moveDict: Resource): CombatMove[] => {
    const moves = getGameMaster().reduce<CombatMove[]>((prev, template) => {
        const matches = template.templateId.match(/^COMBAT_V(\d+)_MOVE_(\w+)$/);

        if (matches) {
            const { 1: id, 2: moveNameRaw } = matches;
            const combatMoveRaw = template.data.combatMove as CombatMoveRaw;
            prev.push({
                id,
                name: moveDict[id],
                uniqueId: combatMoveRaw.uniqueId,
                type: combatMoveRaw.pokemonType,
                power: combatMoveRaw.power,
                energyDelta: combatMoveRaw.energyDelta,
                durationTurns: combatMoveRaw.durationTurns,
                buffs: combatMoveRaw.buffs,
            });
        }

        return prev;
    }, []);

    return moves;
};

const mapCombatMoves = (moveDict: Resource, moveUniqueIds: string[] = []) => {
    const allCombatMoves = getCombatMoves(moveDict);
    return moveUniqueIds.map((moveUniqueId) => allCombatMoves.find((move) => move.uniqueId === moveUniqueId)!);
};

const mapMoves = (moveDict: Resource, moveUniqueIds: string[] = []) => {
    const baseMoves = mapBaseMoves(moveDict, moveUniqueIds);
    const combatMoves = mapCombatMoves(moveDict, moveUniqueIds);

    const moves = baseMoves.map((baseMove) => {
        const sameFields = ['id', 'name', 'uniqueId', 'type'];
        const combatMove = combatMoves.find((move) => move.uniqueId === baseMove.uniqueId);

        return {
            ..._.pick(baseMove, sameFields),
            base: _.omit(baseMove, sameFields),
            combat: _.omit(combatMove, sameFields),
        };
    });

    return moves;
};

export {
    getMoveDict,
    mapMoves,
};
