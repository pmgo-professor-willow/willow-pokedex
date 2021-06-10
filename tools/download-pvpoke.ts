import { mkdirp, writeFile } from 'fs-extra';
import fetch from 'node-fetch';

interface Rank {
    speciesId: number;
    speciesName: number;
    moveset: string[];
    moves: {
        chargedMoves: {
            moveId: string;
            uses: number;
        }[];
        fastMoves: {
            moveId: string;
            uses: number;
        }[];
    };
    rating: number;
    score: number;
    scores: number[];
    counters: any[];
    matchups: any[];
}

export const downloadRankings = async (ranking: '1500' | '2500' | '10000') => {
    const url = `https://pvpoke.com/data/rankings/all/overall/rankings-${ranking}.json`;
    const res = await fetch(url);
    const ranks: Rank[] = await res.json();

    const rankings = ranks.map((rank, i) => ({
        ranking: i + 1,
        id: rank.speciesId,
        fastMoves: [
            rank.moveset[0],
        ],
        chargedMoves: [
            rank.moveset[1],
            rank.moveset[2],
        ],
    }));

    await mkdirp('./rawdata');
    await writeFile(`./rawdata/rankings-${ranking}.json`, JSON.stringify(rankings, null, 2));
};
