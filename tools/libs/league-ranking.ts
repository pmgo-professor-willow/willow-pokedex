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

const leagueRanking: LeagueRanking = {
    great: require(`${appRoot.path}/rawdata/rankings-1500.json`),
    ultra: require(`${appRoot.path}/rawdata/rankings-2500.json`),
    master: require(`${appRoot.path}/rawdata/rankings-10000.json`),
};

const getRanking = (pokemonId: string, league: League, pokemonForm?: string) => {
    const ranking = leagueRanking[league].find((o) => {
        // stunfisk          => [stunfisk]
        // stunfisk_galarian => [stunfisk, galarian]
        const [name, form] = o.id.split('_');
        const samePokemon = pokemonId.toLowerCase() === name.toLowerCase();
        let sameForm = false;

        if (pokemonForm?.toLowerCase() === 'shadow' && form?.toLowerCase() === 'shadow') {
            sameForm = true;
        } else if (pokemonForm?.toLowerCase() !== 'shadow' && form === undefined) {
            sameForm = true;
        }

        return samePokemon && sameForm;
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
    leagueRanking,
    getRanking,
};
