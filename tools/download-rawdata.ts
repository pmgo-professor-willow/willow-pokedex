import { mkdirp, writeFile } from 'fs-extra';
import fetch from 'node-fetch';

export const downloadGameMaster = async () => {
    const url = 'https://raw.githubusercontent.com/PokeMiners/game_masters/master/latest/latest.json';
    const res = await fetch(url);
    const json = await res.json();

    await mkdirp('./rawdata');
    await writeFile('./rawdata/game-master.json', JSON.stringify(json, null, 2));
};

export const downloadI18n = async (locale = 'ChineseTraditional') => {
    const url = `https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Texts/Latest%20APK/${locale}.txt`;
    const res = await fetch(url);
    const text = await res.text();

    await mkdirp('./rawdata');
    await writeFile('./rawdata/resources.txt', text);
};
