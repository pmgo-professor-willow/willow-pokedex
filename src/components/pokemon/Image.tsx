// Node modules.
import React, { useState } from 'react';
import { Image } from 'antd';

const formTextTable: { [idx: string]: string } = {
    // 形態變化 - 飄浮泡泡
    '351_NORMAL': '11', // 飄浮泡泡的樣子
    '351_SUNNY': '12', // 太陽的樣子
    '351_RAINY': '13', // 雨水的樣子
    '351_SNOWY': '14', // 雪雲的樣子

    // 形態變化 - 代歐奇希斯
    '386_NORMAL': '11', // 普通形態
    '386_ATTACK': '12', // 攻擊形態
    '386_DEFENSE': '13', // 防禦形態
    '386_SPEED': '14', // 速度形態

    // 形態變化 - 結草兒
    '412_NORMAL': '11', // 草木蓑衣
    '412_PLANT': '11', // 草木蓑衣
    '412_SANDY': '12', // 砂土蓑衣
    '412_TRASH': '13', // 垃圾蓑衣

    // 形態變化 - 結草貴婦
    '413_NORMAL': '11', // 草木蓑衣
    '413_PLANT': '11', // 草木蓑衣
    '413_SANDY': '12', // 砂土蓑衣
    '413_TRASH': '13', // 垃圾蓑衣

    // 形態變化 - 櫻花兒
    '421_NORMAL': '11', // 陰天形態
    '421_OVERCAST': '11', // 陰天形態
    '421_SUNNY': '12', // 晴天形態

    // 形態變化 - 無殼海兔
    '422_NORMAL': '12', // 西海
    '422_EAST_SEA': '11', // 東海
    '422_WEST_SEA': '12', // 西海

    // 形態變化 - 海兔獸
    '423_NORMAL': '12', // 西海
    '423_EAST_SEA': '11', // 東海
    '423_WEST_SEA': '12', // 西海

    // 形態變化 - 洛托姆
    '479_NORMAL': '11', // 洛托姆的樣子
    '479_HEAT': '12', // 加熱洛托姆
    '479_WASH': '13', // 清洗洛托姆
    '479_FROST': '14', // 結冰洛托姆
    '479_FAN': '15', // 旋轉洛托姆
    '479_MOW': '16', // 切割洛托姆

    // 形態變化 - 騎拉帝納
    '487_NORMAL': '11', // 別種形態
    '487_ALTERED': '11', // 別種形態
    '487_ORIGIN': '12', // 起源形態

    // 形態變化 - 謝米
    '492_NORMAL': '11', // 陸上形態
    '492_LAND': '11', // 陸上形態
    '492_SKY': '12', // 天空形態

    // 形態變化 - 阿爾宙斯
    '493_NORMAL': '00', // 一般
    '493_FIGHTING': '12', // 格鬥
    '493_FLYING': '13', // 飛行
    '493_POISON': '14', // 毒
    '493_GROUND': '15', // 地面
    '493_ROCK': '16', // 岩石
    '493_BUG': '17', // 蟲
    '493_GHOST': '18', // 幽靈
    '493_STEEL': '19', // 鋼
    '493_FIRE': '20', // 火
    '493_WATER': '21', // 水
    '493_GRASS': '22', // 草
    '493_ELECTRIC': '23', // 電
    '493_PSYCHIC': '24', // 超能力
    '493_ICE': '25', // 冰
    '493_DRAGON': '26', // 龍
    '493_DARK': '27', // 惡
    '493_FAIRY': '28', // 妖精

    // 形態變化 - 野蠻鱸魚
    '550_NORMAL': '11', // 紅條紋的樣子
    '550_RED_STRIPED': '11', // 紅條紋的樣子
    '550_BLUE_STRIPED': '12', // 藍條紋的樣子

    // 形態變化 - 達摩狒狒
    '555_NORMAL': '11',
    '555_STANDARD': '11',
    '555_ZEN': '12', // 達摩模式

    // 形態變化 - 四季鹿
    '585_NORMAL': '11', // 春天的樣子
    '585_SPRING': '11', // 春天的樣子
    '585_SUMMER': '12', // 夏天的樣子
    '585_AUTUMN': '13', // 秋天的樣子
    '585_WINTER': '14', // 冬天的樣子

    // 形態變化 - 萌芽鹿
    '586_NORMAL': '11', // 春天的樣子
    '586_SPRING': '11', // 春天的樣子
    '586_SUMMER': '12', // 夏天的樣子
    '586_AUTUMN': '13', // 秋天的樣子
    '586_WINTER': '14', // 冬天的樣子

    // 形態變化 - 龍捲雲
    '641_NORMAL': '11', // 化身形態
    '641_INCARNATE': '11', // 化身形態
    '641_THERIAN': '12', // 靈獸形態

    // 形態變化 - 雷電雲
    '642_NORMAL': '11', // 化身形態
    '642_INCARNATE': '11', // 化身形態
    '642_THERIAN': '12', // 靈獸形態

    // 形態變化 - 土地雲
    '645_NORMAL': '11', // 化身形態
    '645_INCARNATE': '11', // 化身形態
    '645_THERIAN': '12', // 靈獸形態

    // 形態變化 - 酋雷姆
    '646_NORMAL': '11', // 酋雷姆的樣子
    '646_BLACK': '13', // 闇黑酋雷姆
    '646_WHITE': '12', // 焰白酋雷姆

    // 形態變化 - 凱路迪歐
    '647_NORMAL': '11', // 平常的樣子
    '647_ORDINARY': '11', // 平常的樣子
    '647_RESOLUTE': '12', // 覺悟的樣子

    // 形態變化 - 美洛耶塔
    '648_NORMAL': '11', // 歌聲形態
    '648_ARIA': '11', // 歌聲形態
    '648_PIROUETTE': '12', // 舞步形態

    // 形態變化 - 蓋諾賽克特
    '649_NORMAL': '11', // 蓋諾賽克特的樣子
    '649_SHOCK': '13', // 閃電卡帶
    '649_BURN': '14', // 火焰卡帶
    '649_CHILL': '15', // 冰凍卡帶
    '649_DOUSE': '12', // 水流卡帶

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

    // 地區形態 - 伽勒爾
    '19_ALOLA': '61', // 小拉達
    '20_ALOLA': '61', // 拉達
    '26_ALOLA': '61', // 雷丘
    '27_ALOLA': '61', // 穿山鼠
    '28_ALOLA': '61', // 穿山王
    '37_ALOLA': '61', // 六尾
    '38_ALOLA': '61', // 九尾
    '50_ALOLA': '61', // 地鼠
    '51_ALOLA': '61', // 三地鼠
    '52_ALOLA': '61', // 喵喵
    '53_ALOLA': '61', // 貓老大
    '74_ALOLA': '61', // 小拳石
    '75_ALOLA': '61', // 隆隆石
    '76_ALOLA': '61', // 隆隆岩
    '88_ALOLA': '61', // 臭泥
    '89_ALOLA': '61', // 臭臭泥
    '103_ALOLA': '61', // 椰蛋樹
    '105_ALOLA': '61', // 嘎啦嘎啦

    // 地區形態 - 伽勒爾
    '52_GALARIAN': '31', // 喵喵
    '77_GALARIAN': '31', // 小火馬
    '78_GALARIAN': '31', // 烈焰馬
    '79_GALARIAN': '31', // 呆呆獸
    '80_GALARIAN': '31', // 呆殼獸
    '83_GALARIAN': '31', // 大蔥鴨
    '110_GALARIAN': '31', // 雙彈瓦斯
    '122_GALARIAN': '31', // 魔牆人偶
    '144_GALARIAN': '31', // 急凍鳥
    '145_GALARIAN': '31', // 閃電鳥
    '146_GALARIAN': '31', // 火焰鳥
    '199_GALARIAN': '31', // 呆呆王
    '222_GALARIAN': '31', // 太陽珊瑚
    '263_GALARIAN': '31', // 蛇紋熊
    '264_GALARIAN': '31', // 直衝熊
    '554_GALARIAN': '31', // 火紅不倒翁
    '555_GALARIAN_STANDARD': '31', // 達摩狒狒
    '555_GALARIAN_ZEN': '32', // 達摩狒狒 達摩模式
    '562_GALARIAN': '31', // 哭哭面具
    '618_GALARIAN': '31', // 泥巴魚
    '862_NORMAL': '31', // 堵攔熊
    '863_NORMAL': '31', // 喵頭目
    '865_NORMAL': '31', // 蔥遊兵
    '866_NORMAL': '31', // 踏冰人偶
    '867_NORMAL': '31', // 死神板

    // 例外 - 未知圖騰
    '201_NORMAL': '11',
};

interface PokemonImageProps {
    pokemonNo: number;
    pokemonForm?: string;
    shiny?: boolean;
    size?: number;
}

const getFormText = (pokemonNo: number, pokemonForm?: string) => {
    const defaultFormText = '00';

    if (pokemonForm === 'PURIFIED' || pokemonForm === 'SHADOW') {
        return formTextTable[`${pokemonNo}_NORMAL`] || defaultFormText;
    }

    return formTextTable[`${pokemonNo}_${pokemonForm}`] || defaultFormText;
};

const PokemonImage: React.FC<PokemonImageProps> = (props) => {
    const {
        pokemonNo,
        pokemonForm = 'NORMAL',
        shiny,
        size = 200,
    } = props;

    const [loadFail, setLoadFail] = useState(false);

    const urlBase = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256';
    const no = String(pokemonNo).padStart(3, '0');
    const formText = getFormText(pokemonNo, pokemonForm);
    const imageUrl = shiny
        ? `${urlBase}/pokemon_icon_${no}_${formText}_shiny.png`
        : `${urlBase}/pokemon_icon_${no}_${formText}.png`;

    return (
        <Image preview={false} width={size} height={size}
            src={loadFail ? '/willow-pokedex/assets/unknown-pokemon.png' : imageUrl}
            onError={() => setLoadFail(true)}
        />
    );
};

export default PokemonImage;
