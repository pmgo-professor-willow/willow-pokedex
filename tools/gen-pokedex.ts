// Node modules.
import _ from 'lodash';
import { mkdirp, writeFile } from 'fs-extra';
// Local modules.
import { getPokemons } from './libs/pokemons';
import { downloadGameMaster, downloadI18n } from './download-rawdata';
import { downloadRankings } from './download-pvpoke';

const main = async () => {
    // Download game master data
    await downloadGameMaster();
    await downloadI18n();
    // Download pvpoke data.
    await downloadRankings('1500'); // Great League
    await downloadRankings('2500'); // Ultra League
    await downloadRankings('10000'); // Master League

    const outputPath = './public/data';
    await mkdirp(outputPath);

    try {
        const pokemons = getPokemons();
        await writeFile(`${outputPath}/pokemons.json`, JSON.stringify(pokemons, null, 2));
        await writeFile(`${outputPath}/pokemons.min.json`, JSON.stringify(pokemons));
    } catch (e) {
        console.error(e);
    }
};

main();
