// Node modules.
import appRoot from 'app-root-path';

const getGameMaster = (): GameMaster => {
    return require(`${appRoot.path}/rawdata/game-master.json`);
};

interface Template {
    templateId: string;
    data: {
        templateId: string;
        [prop: string]: unknown;
    }
}

type GameMaster = Template[];

export {
    getGameMaster,
};
