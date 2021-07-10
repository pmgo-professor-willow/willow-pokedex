const ignoredPokemonList: string[] = [
    '412_NORMAL', // 結草兒 (草木蓑衣)
    '413_NORMAL', // 結草貴婦 (草木蓑衣)
    '421_NORMAL', // 櫻花兒 (陰天形態)
    '422_NORMAL', // 無殼海兔 (西海)
    '423_NORMAL', // 海兔獸 (西海)
    '487_NORMAL', // 騎拉帝納 (別種形態)
    '492_NORMAL', // 謝米 (陸上形態)
    '550_NORMAL', // 野蠻鱸魚 (紅條紋的樣子)
    '555_NORMAL', // 達摩狒狒 (平常的樣子)
    '585_NORMAL', // 四季鹿 (春天的樣子)
    '586_NORMAL', // 萌芽鹿 (春天的樣子)
    '641_NORMAL', // 龍捲雲 (化身形態)
    '642_NORMAL', // 雷電雲 (化身形態)
    '645_NORMAL', // 土地雲 (化身形態)
    '647_NORMAL', // 凱路迪歐 (平常的樣子)
    '648_NORMAL', // 美洛耶塔 (歌聲形態)
];

function isIgnored(no: number, form?: string) {
    const ignored = ignoredPokemonList.includes(`${no}_${form}`);
    return ignored;
}

export {
    isIgnored,
}
