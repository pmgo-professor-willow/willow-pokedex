interface Evolution {
    evolution: string;
    form?: string;
    candyCost: number;
    priority?: number;
    // Mega evolution
    temporaryEvolution?: string;
    temporaryEvolutionEnergyCost?: number;
    temporaryEvolutionEnergyCostSubsequent?: number;
}

export const formatEvolutions = (evolutions: Evolution[] = []) => {
    return evolutions.map((e) => {
        const uniqueId = e.evolution;
        const form = e.form ? e.form.split('_')[1] : 'NORMAL';

        return {
            uniqueId,
            form,
            candyCost: e.candyCost,
        };
    });
};
