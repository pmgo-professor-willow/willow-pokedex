
const formTable: { [idx: string]: string } = {
    // 形態變化 - 飄浮泡泡
    '351_NORMAL': '飄浮泡泡的樣子',
    '351_SUNNY': '太陽的樣子',
    '351_RAINY': '雨水的樣子',
    '351_SNOWY': '雪雲的樣子',

    // 形態變化 - 代歐奇希斯
    '386_NORMAL': '普通形態',
    '386_ATTACK': '攻擊形態',
    '386_DEFENSE': '防禦形態',
    '386_SPEED': '速度形態',

    // 形態變化 - 結草兒
    '412_NORMAL': '草木蓑衣',
    '412_PLANT': '草木蓑衣',
    '412_SANDY': '砂土蓑衣',
    '412_TRASH': '垃圾蓑衣',

    // 形態變化 - 結草貴婦
    '413_NORMAL': '草木蓑衣',
    '413_PLANT': '草木蓑衣',
    '413_SANDY': '砂土蓑衣',
    '413_TRASH': '垃圾蓑衣',

    // 形態變化 - 櫻花兒
    '421_NORMAL': '陰天形態',
    '421_OVERCAST': '陰天形態',
    '421_SUNNY': '晴天形態',

    // 形態變化 - 無殼海兔
    '422_NORMAL': '西海',
    '422_EAST_SEA': '東海',
    '422_WEST_SEA': '西海',

    // 形態變化 - 海兔獸
    '423_NORMAL': '西海',
    '423_EAST_SEA': '東海',
    '423_WEST_SEA': '西海',

    // 形態變化 - 洛托姆
    '479_NORMAL': '洛托姆的樣子',
    '479_HEAT': '加熱洛托姆',
    '479_WASH': '清洗洛托姆',
    '479_FROST': '結冰洛托姆',
    '479_FAN': '旋轉洛托姆',
    '479_MOW': '切割洛托姆',

    // 形態變化 - 騎拉帝納
    '487_NORMAL': '別種形態',
    '487_ALTERED': '別種形態',
    '487_ORIGIN': '起源形態',

    // 形態變化 - 謝米
    '492_NORMAL': '陸上形態',
    '492_LAND': '陸上形態',
    '492_SKY': '天空形態',

    // 形態變化 - 阿爾宙斯
    '493_NORMAL': '一般',
    '493_FIGHTING': '格鬥',
    '493_FLYING': '飛行',
    '493_POISON': '毒',
    '493_GROUND': '地面',
    '493_ROCK': '岩石',
    '493_BUG': '蟲',
    '493_GHOST': '幽靈',
    '493_STEEL': '鋼',
    '493_FIRE': '火',
    '493_WATER': '水',
    '493_GRASS': '草',
    '493_ELECTRIC': '電',
    '493_PSYCHIC': '超能力',
    '493_ICE': '冰',
    '493_DRAGON': '龍',
    '493_DARK': '惡',
    '493_FAIRY': '妖精',

    // 形態變化 - 野蠻鱸魚
    '550_NORMAL': '紅條紋的樣子',
    '550_RED_STRIPED': '紅條紋的樣子',
    '550_BLUE_STRIPED': '藍條紋的樣子',

    // 形態變化 - 達摩狒狒
    '555_NORMAL': '平常的樣子',
    '555_STANDARD': '平常的樣子',
    '555_ZEN': '達摩模式',

    // 形態變化 - 四季鹿
    '585_NORMAL': '春天的樣子',
    '585_SPRING': '春天的樣子',
    '585_SUMMER': '夏天的樣子',
    '585_AUTUMN': '秋天的樣子',
    '585_WINTER': '冬天的樣子',

    // 形態變化 - 萌芽鹿
    '586_NORMAL': '春天的樣子',
    '586_SPRING': '春天的樣子',
    '586_SUMMER': '夏天的樣子',
    '586_AUTUMN': '秋天的樣子',
    '586_WINTER': '冬天的樣子',

    // 形態變化 - 龍捲雲
    '641_NORMAL': '化身形態',
    '641_INCARNATE': '化身形態',
    '641_THERIAN': '靈獸形態',

    // 形態變化 - 雷電雲
    '642_NORMAL': '化身形態',
    '642_INCARNATE': '化身形態',
    '642_THERIAN': '靈獸形態',

    // 形態變化 - 土地雲
    '645_NORMAL': '化身形態',
    '645_INCARNATE': '化身形態',
    '645_THERIAN': '靈獸形態',

    // 形態變化 - 酋雷姆
    '646_NORMAL': '酋雷姆的樣子',
    '646_BLACK': '闇黑酋雷姆',
    '646_WHITE': '焰白酋雷姆',

    // 形態變化 - 凱路迪歐
    '647_NORMAL': '平常的樣子',
    '647_ORDINARY': '平常的樣子',
    '647_RESOLUTE': '覺悟的樣子',

    // 形態變化 - 美洛耶塔
    '648_NORMAL': '歌聲形態',
    '648_ARIA': '歌聲形態',
    '648_PIROUETTE': '舞步形態',

    // 形態變化 - 蓋諾賽克特
    '649_NORMAL': '蓋諾賽克特的樣子',
    '649_SHOCK': '閃電卡帶',
    '649_BURN': '火焰卡帶',
    '649_CHILL': '冰凍卡帶',
    '649_DOUSE': '水流卡帶',

    // 形態變化 - 彩粉蝶
    // 形態變化 - 花蓓蓓
    // 形態變化 - 花葉蒂
    // 形態變化 - 花潔夫人
    // 形態變化 - 多麗米亞
    // 形態變化 - 堅盾劍怪
    // 形態變化 - 南瓜精
    // 形態變化 - 南瓜怪人
    // 形態變化 - 基格爾德
    // 形態變化 - 胡帕
    // 形態變化 - 花舞鳥
    // 形態變化 - 鬃岩狼人
    // 形態變化 - 弱丁魚
    // 形態變化 - 銀伴戰獸
    // 形態變化 - 小隕星
    // 形態變化 - 奈克洛茲瑪
    // 形態變化 - 顫弦蠑螈
    // 形態變化 - 冰砌鵝
    // 形態變化 - 莫魯貝可
    // 形態變化 - 蒼響
    // 形態變化 - 藏瑪然特
    // 形態變化 - 無極汰那
    // 形態變化 - 武道熊師
    // 形態變化 - 蕾冠王

    // 地區形態 - 阿羅拉
    '19_ALOLA': '阿羅拉', // 小拉達
    '20_ALOLA': '阿羅拉', // 拉達
    '26_ALOLA': '阿羅拉', // 雷丘
    '27_ALOLA': '阿羅拉', // 穿山鼠
    '28_ALOLA': '阿羅拉', // 穿山王
    '37_ALOLA': '阿羅拉', // 六尾
    '38_ALOLA': '阿羅拉', // 九尾
    '50_ALOLA': '阿羅拉', // 地鼠
    '51_ALOLA': '阿羅拉', // 三地鼠
    '52_ALOLA': '阿羅拉', // 喵喵
    '53_ALOLA': '阿羅拉', // 貓老大
    '74_ALOLA': '阿羅拉', // 小拳石
    '75_ALOLA': '阿羅拉', // 隆隆石
    '76_ALOLA': '阿羅拉', // 隆隆岩
    '88_ALOLA': '阿羅拉', // 臭泥
    '89_ALOLA': '阿羅拉', // 臭臭泥
    '103_ALOLA': '阿羅拉', // 椰蛋樹
    '105_ALOLA': '阿羅拉', // 嘎啦嘎啦

    // 地區形態 - 伽勒爾
    '52_GALARIAN': '伽勒爾', // 喵喵
    '77_GALARIAN': '伽勒爾', // 小火馬
    '78_GALARIAN': '伽勒爾', // 烈焰馬
    '79_GALARIAN': '伽勒爾', // 呆呆獸
    '80_GALARIAN': '伽勒爾', // 呆殼獸
    '83_GALARIAN': '伽勒爾', // 大蔥鴨
    '110_GALARIAN': '伽勒爾', // 雙彈瓦斯
    '122_GALARIAN': '伽勒爾', // 魔牆人偶
    '144_GALARIAN': '伽勒爾', // 急凍鳥
    '145_GALARIAN': '伽勒爾', // 閃電鳥
    '146_GALARIAN': '伽勒爾', // 火焰鳥
    '199_GALARIAN': '伽勒爾', // 呆呆王
    '222_GALARIAN': '伽勒爾', // 太陽珊瑚
    '263_GALARIAN': '伽勒爾', // 蛇紋熊
    '264_GALARIAN': '伽勒爾', // 直衝熊
    '554_GALARIAN': '伽勒爾', // 火紅不倒翁
    '555_GALARIAN_STANDARD': '伽勒爾', // 達摩狒狒
    '555_GALARIAN_ZEN': '伽勒爾 達摩模式', // 達摩狒狒 達摩模式
    '562_GALARIAN': '伽勒爾', // 哭哭面具
    '618_GALARIAN': '伽勒爾', // 泥巴魚
    '862_NORMAL': '伽勒爾', // 堵攔熊
    '863_NORMAL': '伽勒爾', // 喵頭目
    '865_NORMAL': '伽勒爾', // 蔥遊兵
    '866_NORMAL': '伽勒爾', // 踏冰人偶
    '867_NORMAL': '伽勒爾', // 死神板

    // 特殊外觀 - 皮卡丘
    '25_VS_2019': '面罩摔角手皮卡丘', // 摔角皮卡丘
    '25_COPY_2019': '複製皮卡丘', // 複製皮卡丘
    '25_FALL_2019': '萬聖節皮卡丘', // 萬聖節皮卡丘
    '25_COSTUME_2020': '飛翔皮卡丘', // 飛翔皮卡丘
    '25_ADVENTURE_HAT_2020': '探險家皮卡丘', // 探險家皮卡丘
    '25_WINTER_2020': '冬季皮卡丘', // 冬季皮卡丘

    // 特殊外觀 - 電影超夢的逆襲
    '3_COPY_2019': '複製妙蛙花', // 複製妙蛙花
    '6_COPY_2019': '複製噴火龍', // 複製噴火龍
    '9_COPY_2019': '複製水箭龜', // 複製水箭龜
    '150_A': '裝甲超夢', // 裝甲超夢

    // 特殊外觀 - 2019萬聖節
    '1_FALL_2019': '2019 萬聖節', // 妙蛙種子
    '4_FALL_2019': '2019 萬聖節', // 小火龍
    '7_FALL_2019': '2019 萬聖節', // 傑尼龜

    // 特殊外觀 - 2020萬聖節
    '302_COSTUME_2020': '2020 萬聖節', // 勾魂眼

    // 特殊外觀 - 2020聖誕節
    '225_WINTER_2020': '2020 聖誕節', // 信使鳥
    '613_WINTER_2020': '2020 聖誕節', // 噴嚏熊

    // 特殊外觀 - 2020跨年
    '79_2020': '2020 跨年', // 呆呆獸
    '80_2020': '2020 跨年', // 呆殼獸
};

function translateForm(no: number, form?: string) {
    const translatedForm = formTable[`${no}_${form}`];

    if (translatedForm) {
        return translatedForm;
    }

    switch (form) {
        case 'NORMAL':
            return '平常的樣子';
        case 'SHADOW':
            return '暗影';
        case 'PURIFIED':
            return '淨化';
        default:
            return form;
    }
}

export {
    translateForm,
}
