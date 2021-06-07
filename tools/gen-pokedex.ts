// Node modules.
import _ from 'lodash';
import { mkdirp, writeFile } from 'fs-extra';
// Local modules.
import { getPokemons } from './libs/pokemons';
import { downloadGameMaster, downloadI18n } from './download-rawdata';

const main = async () => {
    // Download data first.
    await downloadGameMaster();
    await downloadI18n();

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
