// Node modules.
import appRoot from 'app-root-path';

type League = 'great' | 'ultra' | 'master';

interface Ranking {
    ranking: number;
    id: string;
    fastMoves: string[];
    chargedMoves: string[];
}

type LeagueRanking = {
    [league in League]: Ranking[];
};

const getLeagueRanking= (): LeagueRanking => ({
    great: require(`${appRoot.path}/rawdata/rankings-1500.json`),
    ultra: require(`${appRoot.path}/rawdata/rankings-2500.json`),
    master: require(`${appRoot.path}/rawdata/rankings-10000.json`),
});

const getRanking = (pokemonId: string, league: League, pokemonForm?: string) => {
    const ranking = getLeagueRanking()[league].find((o) => {
        // stunfisk          => [stunfisk]
        // stunfisk_galarian => [stunfisk, galarian]
        const [name, form] = o.id.split('_');
        const n1 = pokemonId.toLowerCase();
        const n2 = name.toLowerCase();
        const samePokemon = n1 === n2;

        if (!samePokemon) {
            return false;
        }

        const f1 = pokemonForm ? pokemonForm.toLowerCase() : undefined;
        const f2 = form ? form.toLowerCase() : undefined;
        let sameForm = false;

        if (f1 === f2) {
            sameForm = true;
        } else if (!['shadow', 'mega', 'mega_x', 'mega_y'].includes(String(f1)) && f2 === undefined) {
            sameForm = true;
        }

        return sameForm;
    });

    if (ranking) {
        return {
            ranking: ranking.ranking,
            quickMoveIds: ranking.fastMoves,
            cinematicMoveIds: ranking.chargedMoves,
        };
    }

    return null;
};

export {
    getLeagueRanking,
    getRanking,
};
