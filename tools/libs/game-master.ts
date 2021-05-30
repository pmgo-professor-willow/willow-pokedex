// Node modules.
import appRoot from 'app-root-path';

const gameMaster: GameMaster = require(`${appRoot.path}/rawdata/game-master.json`);

interface Template {
    templateId: string;
    data: {
        templateId: string;
        [prop: string]: unknown;
    }
}

type GameMaster = Template[];

export {
    gameMaster,
};
