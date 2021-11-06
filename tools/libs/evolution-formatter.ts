interface Evolution {
    evolution: string;
    form?: string;
    candyCost: number;
    priority?: number;
    // Evolution requirement
    evolutionItemRequirement?: string;
    genderRequirement?: 'FEMALE' | 'MALE';
    // Mega evolution
    temporaryEvolution?: string;
    temporaryEvolutionEnergyCost?: number;
    temporaryEvolutionEnergyCostSubsequent?: number;
}

export const formatEvolutions = (basePokemonId: string, evolutions: Evolution[] = []) => {
    return evolutions.map((e) => {
        // Normal evolution || Mega evolution.
        const uniqueId = e.evolution || basePokemonId;

        // TYRANITAR => NORMAL
        // TYRANITAR_NORMAL => NORMAL
        // TYRANITAR_SHADOW => SHADOW
        // MR_RIME => NORMAL (speical case)
        // TOXTRICITY_LOW_KEY => LOW_KEY (speical case)
        let form = e.form ? e.form.replace(`${uniqueId}_`, '') : 'NORMAL';
        // TYRANITAR_MEGA => MEGA
        if (e.temporaryEvolution) {
            form = e.temporaryEvolution?.match(/^TEMP_EVOLUTION_(\w+)$/)![1];
        }

        return {
            uniqueId,
            form,
            candyCost: e.candyCost,
            energyCost: e.temporaryEvolutionEnergyCost,
            item: e.evolutionItemRequirement,
            gender: e.genderRequirement,
        };
    });
};
