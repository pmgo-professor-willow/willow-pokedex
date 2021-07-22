// Node modules.
import React, { useEffect, useState } from 'react';
import { Image } from 'antd';

const imageTextTable: { [idx: string]: string } = {
    // 形態變化 - 飄浮泡泡
    '351_NORMAL': '351_11', // 飄浮泡泡的樣子
    '351_SUNNY': '351_12', // 太陽的樣子
    '351_RAINY': '351_13', // 雨水的樣子
    '351_SNOWY': '351_14', // 雪雲的樣子

    // 形態變化 - 代歐奇希斯
    '386_NORMAL': '386_11', // 普通形態
    '386_ATTACK': '386_12', // 攻擊形態
    '386_DEFENSE': '386_13', // 防禦形態
    '386_SPEED': '386_14', // 速度形態

    // 形態變化 - 結草兒
    '412_NORMAL': '412_11', // 草木蓑衣
    '412_PLANT': '412_11', // 草木蓑衣
    '412_SANDY': '412_12', // 砂土蓑衣
    '412_TRASH': '412_13', // 垃圾蓑衣

    // 形態變化 - 結草貴婦
    '413_NORMAL': '413_11', // 草木蓑衣
    '413_PLANT': '413_11', // 草木蓑衣
    '413_SANDY': '413_12', // 砂土蓑衣
    '413_TRASH': '413_13', // 垃圾蓑衣

    // 形態變化 - 櫻花兒
    '421_NORMAL': '421_11', // 陰天形態
    '421_OVERCAST': '421_11', // 陰天形態
    '421_SUNNY': '421_12', // 晴天形態

    // 形態變化 - 無殼海兔
    '422_NORMAL': '422_12', // 西海
    '422_EAST_SEA': '422_11', // 東海
    '422_WEST_SEA': '422_12', // 西海

    // 形態變化 - 海兔獸
    '423_NORMAL': '423_12', // 西海
    '423_EAST_SEA': '423_11', // 東海
    '423_WEST_SEA': '423_12', // 西海

    // 形態變化 - 洛托姆
    '479_NORMAL': '479_11', // 洛托姆的樣子
    '479_HEAT': '479_12', // 加熱洛托姆
    '479_WASH': '479_13', // 清洗洛托姆
    '479_FROST': '479_14', // 結冰洛托姆
    '479_FAN': '479_15', // 旋轉洛托姆
    '479_MOW': '479_16', // 切割洛托姆

    // 形態變化 - 騎拉帝納
    '487_NORMAL': '487_11', // 別種形態
    '487_ALTERED': '487_11', // 別種形態
    '487_ORIGIN': '487_12', // 起源形態

    // 形態變化 - 謝米
    '492_NORMAL': '492_11', // 陸上形態
    '492_LAND': '492_11', // 陸上形態
    '492_SKY': '492_12', // 天空形態

    // 形態變化 - 阿爾宙斯
    '493_NORMAL': '493_00', // 一般
    '493_FIGHTING': '493_12', // 格鬥
    '493_FLYING': '493_13', // 飛行
    '493_POISON': '493_14', // 毒
    '493_GROUND': '493_15', // 地面
    '493_ROCK': '493_16', // 岩石
    '493_BUG': '493_17', // 蟲
    '493_GHOST': '493_18', // 幽靈
    '493_STEEL': '493_19', // 鋼
    '493_FIRE': '493_20', // 火
    '493_WATER': '493_21', // 水
    '493_GRASS': '493_22', // 草
    '493_ELECTRIC': '493_23', // 電
    '493_PSYCHIC': '493_24', // 超能力
    '493_ICE': '493_25', // 冰
    '493_DRAGON': '493_26', // 龍
    '493_DARK': '493_27', // 惡
    '493_FAIRY': '493_28', // 妖精

    // 形態變化 - 野蠻鱸魚
    '550_NORMAL': '550_11', // 紅條紋的樣子
    '550_RED_STRIPED': '550_11', // 紅條紋的樣子
    '550_BLUE_STRIPED': '550_12', // 藍條紋的樣子

    // 形態變化 - 達摩狒狒
    '555_NORMAL': '555_11',
    '555_STANDARD': '555_11',
    '555_ZEN': '555_12', // 達摩模式

    // 形態變化 - 四季鹿
    '585_NORMAL': '585_11', // 春天的樣子
    '585_SPRING': '585_11', // 春天的樣子
    '585_SUMMER': '585_12', // 夏天的樣子
    '585_AUTUMN': '585_13', // 秋天的樣子
    '585_WINTER': '585_14', // 冬天的樣子

    // 形態變化 - 萌芽鹿
    '586_NORMAL': '586_11', // 春天的樣子
    '586_SPRING': '586_11', // 春天的樣子
    '586_SUMMER': '586_12', // 夏天的樣子
    '586_AUTUMN': '586_13', // 秋天的樣子
    '586_WINTER': '586_14', // 冬天的樣子

    // 形態變化 - 龍捲雲
    '641_NORMAL': '641_11', // 化身形態
    '641_INCARNATE': '641_11', // 化身形態
    '641_THERIAN': '641_12', // 靈獸形態

    // 形態變化 - 雷電雲
    '642_NORMAL': '642_11', // 化身形態
    '642_INCARNATE': '642_11', // 化身形態
    '642_THERIAN': '642_12', // 靈獸形態

    // 形態變化 - 土地雲
    '645_NORMAL': '645_11', // 化身形態
    '645_INCARNATE': '645_11', // 化身形態
    '645_THERIAN': '645_12', // 靈獸形態

    // 形態變化 - 酋雷姆
    '646_NORMAL': '646_11', // 酋雷姆的樣子
    '646_BLACK': '646_13', // 闇黑酋雷姆
    '646_WHITE': '646_12', // 焰白酋雷姆

    // 形態變化 - 凱路迪歐
    '647_NORMAL': '647_11', // 平常的樣子
    '647_ORDINARY': '647_11', // 平常的樣子
    '647_RESOLUTE': '647_12', // 覺悟的樣子

    // 形態變化 - 美洛耶塔
    '648_NORMAL': '648_11', // 歌聲形態
    '648_ARIA': '648_11', // 歌聲形態
    '648_PIROUETTE': '648_12', // 舞步形態

    // 形態變化 - 蓋諾賽克特
    '649_NORMAL': '649_11', // 蓋諾賽克特的樣子
    '649_SHOCK': '649_13', // 閃電卡帶
    '649_BURN': '649_14', // 火焰卡帶
    '649_CHILL': '649_15', // 冰凍卡帶
    '649_DOUSE': '649_12', // 水流卡帶

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
    '19_ALOLA': '019_61', // 小拉達
    '20_ALOLA': '020_61', // 拉達
    '26_ALOLA': '026_61', // 雷丘
    '27_ALOLA': '027_61', // 穿山鼠
    '28_ALOLA': '028_61', // 穿山王
    '37_ALOLA': '037_61', // 六尾
    '38_ALOLA': '038_61', // 九尾
    '50_ALOLA': '050_61', // 地鼠
    '51_ALOLA': '051_61', // 三地鼠
    '52_ALOLA': '052_61', // 喵喵
    '53_ALOLA': '053_61', // 貓老大
    '74_ALOLA': '074_61', // 小拳石
    '75_ALOLA': '075_61', // 隆隆石
    '76_ALOLA': '076_61', // 隆隆岩
    '88_ALOLA': '088_61', // 臭泥
    '89_ALOLA': '089_61', // 臭臭泥
    '103_ALOLA': '103_61', // 椰蛋樹
    '105_ALOLA': '105_61', // 嘎啦嘎啦

    // 地區形態 - 伽勒爾
    '52_GALARIAN': '052_31', // 喵喵
    '77_GALARIAN': '077_31', // 小火馬
    '78_GALARIAN': '078_31', // 烈焰馬
    '79_GALARIAN': '079_31', // 呆呆獸
    '80_GALARIAN': '080_31', // 呆殼獸
    '83_GALARIAN': '083_31', // 大蔥鴨
    '110_GALARIAN': '110_31', // 雙彈瓦斯
    '122_GALARIAN': '122_31', // 魔牆人偶
    '144_GALARIAN': '144_31', // 急凍鳥
    '145_GALARIAN': '145_31', // 閃電鳥
    '146_GALARIAN': '146_31', // 火焰鳥
    '199_GALARIAN': '199_31', // 呆呆王
    '222_GALARIAN': '222_31', // 太陽珊瑚
    '263_GALARIAN': '263_31', // 蛇紋熊
    '264_GALARIAN': '264_31', // 直衝熊
    '554_GALARIAN': '554_31', // 火紅不倒翁
    '555_GALARIAN_STANDARD': '555_31', // 達摩狒狒
    '555_GALARIAN_ZEN': '555_32', // 達摩狒狒 達摩模式
    '562_GALARIAN': '562_31', // 哭哭面具
    '618_GALARIAN': '618_31', // 泥巴魚
    '862_NORMAL': '862_31', // 堵攔熊
    '863_NORMAL': '863_31', // 喵頭目
    '865_NORMAL': '865_31', // 蔥遊兵
    '866_NORMAL': '866_31', // 踏冰人偶
    '867_NORMAL': '867_31', // 死神板

    // 例外 - 未知圖騰
    '201_NORMAL': '201_11',

    // 特殊外觀 - 皮卡丘
    '25_VS_2019': '025_16', // 摔角皮卡丘
    '25_COPY_2019': 'pm0025_00_pgo_copy2019', // 複製皮卡丘
    '25_FALL_2019': 'pm0025_00_pgo_fall2019', // 萬聖節皮卡丘
    '25_COSTUME_2020': 'pm0025_00_pgo_4thanniversary', // 飛翔皮卡丘
    '25_ADVENTURE_HAT_2020': 'pm0025_01_pgo_movie2020', // 探險家皮卡丘
    '25_WINTER_2020': 'pm0025_00_pgo_winter2020', // 冬季皮卡丘
    '25_KARIYUSHI': 'pm0025_01_pikachu_pgo_kariyushi', // 沖繩皮卡丘
    '25_FLYING_5TH_ANNIV': 'pm0025_01_pgo_5thanniversary', // 五週年飛翔皮卡丘
    '25_ROCK_STAR': 'pm0025_01_pgo_rockstar', // 硬搖滾皮卡丘
    '25_POP_STAR': 'pm0025_01_pgo_popstar', // 偶像皮卡丘

    // 特殊外觀 - 電影超夢的逆襲
    '3_COPY_2019': 'pm0003_00_pgo_copy2019', // 複製妙蛙花
    '6_COPY_2019': 'pm0006_00_pgo_copy2019', // 複製噴火龍
    '9_COPY_2019': 'pm0009_00_pgo_copy2019', // 複製水箭龜
    '150_A': 'pm0150_00_pgo_a', // 裝甲超夢

    // 特殊外觀 - 2019萬聖節
    '1_FALL_2019': 'pm0001_00_pgo_fall2019', // 妙蛙種子
    '4_FALL_2019': 'pm0004_00_pgo_fall2019', // 小火龍
    '7_FALL_2019': 'pm0007_00_pgo_fall2019', // 傑尼龜

    // 特殊外觀 - 2020萬聖節
    '94_COSTUME_2020': '094_26', // 耿鬼
    '302_COSTUME_2020': 'pm0302_00_pgo_fall2020', // 勾魂眼

    // 特殊外觀 - 2020聖誕節
    '225_WINTER_2020': 'pm0225_00_pgo_winter2020', // 信使鳥
    '613_WINTER_2020': 'pm0613_00_pgo_winter2020', // 噴嚏熊

    // 特殊外觀 - 2020跨年
    '79_2020': 'pm0079_00_pgo_2020', // 呆呆獸
    '80_2020': 'pm0080_00_pgo_2020', // 呆殼獸
};

interface PokemonImageProps {
    pokemonNo: number;
    pokemonForm?: string;
    shiny?: boolean;
    size?: number;
}

const getImageUrl = (pokemonNo: number, pokemonForm?: string, shiny?: boolean): string => {
    const urlBase = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256';
    const no = String(pokemonNo).padStart(3, '0');
    const defaultImageText = `${no}_00`;

    let imageText = imageTextTable[`${pokemonNo}_NORMAL`];

    if (pokemonForm === 'PURIFIED' || pokemonForm === 'SHADOW') {
        imageText = defaultImageText;
    } else if (pokemonForm === 'MEGA' || pokemonForm === 'MEGA_X') {
        imageText = `${no}_51`;
    } else if (pokemonForm === 'MEGA_Y') {
        imageText = `${no}_52`;
    } else {
        imageText = imageTextTable[`${pokemonNo}_${pokemonForm}`] || defaultImageText;
    }

    const imageUrl = shiny
        ? `${urlBase}/pokemon_icon_${imageText}_shiny.png`
        : `${urlBase}/pokemon_icon_${imageText}.png`;

    return imageUrl;
};

const unknownImageUrl = '/willow-pokedex/assets/unknown-pokemon.png';

const PokemonImage: React.FC<PokemonImageProps> = (props) => {
    const {
        pokemonNo,
        pokemonForm = 'NORMAL',
        shiny,
        size,
    } = props;

    const [imageUrl, setImageUrl] = useState(unknownImageUrl);

    useEffect(() => {
        const url = getImageUrl(pokemonNo, pokemonForm, shiny);
        setImageUrl(url);
    }, [pokemonNo, pokemonForm, shiny])

    return (
        <Image preview={false} width={size} height={size}
            src={imageUrl}
            onError={() => setImageUrl(unknownImageUrl)}
        />
    );
};

export default PokemonImage;
