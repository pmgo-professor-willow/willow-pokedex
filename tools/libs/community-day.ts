// Node modules.
import appRoot from 'app-root-path';

const getCommunityDays = (): CommunityDay[] => {
    return require(`${appRoot.path}/rawdata/community-days.json`);
};

interface CommunityDay {
    featuredPokemon: string;
    eligiblePokemon: string;
    moves: string[];
    date: string;
}

export {
    getCommunityDays,
};
