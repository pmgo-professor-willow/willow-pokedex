// Node modules.
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {
    PageHeader,
    Row,
    Col,
    Tabs,
    Select,
    Button,
} from 'antd';
import styled from 'styled-components';
// Local modules.
import type { IPokemon, League } from '../models/pokemon';
import * as Pokemon from '../components/pokemon';
import { PokemonContext } from '../contexts/pokemon';
import { translateForm } from '../utils/translate-form';
import type { IEvolutionNode } from '../utils/generate-evolution-tree';
import { genEvolutionTree } from '../utils/generate-evolution-tree';

const ProfileTabs = styled(Tabs)`
.ant-tabs-nav {
    &::before {
        border-bottom: none;
    }

    .ant-tabs-nav-list .ant-tabs-tab:not(.ant-tabs-tab-active) .ant-tabs-tab-btn {
        color: #ECECEC;
        text-shadow: #000000 0.1em 0.1em 0.2em;
    }
}
.ant-tabs-content {
    margin-top: -16px;
}
.ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    border-radius: 2px;
    padding: 16px;
    z-index: 1;
}
.ant-tabs-tab {
    background: transparent !important;
    border-color: transparent !important;
}
.ant-tabs-tab-active {
    background: #fff !important;
    border-color: #fff !important;
}
`;

interface PokemonProfileScreenProps {
    className?: string;
    pokemons: IPokemon[];
}

const PokemonProfileScreen: React.FC<PokemonProfileScreenProps> = (props) => {
    const { className } = props;

    const pokemons = useContext(PokemonContext);

    const { pokemonNo, pokemonForm } = useParams<{ pokemonNo: string, pokemonForm: string }>();

    const [redirect, setRedirect] = useState<boolean>(false);
    const [isomorphicPokemons, setIsomorphicPokemons] = useState<IPokemon[]>([]);
    const [displayPokemon, setDisplayPokemon] = useState<IPokemon | undefined>();
    const [evolutionTree, setEvolutionTree] = useState<IEvolutionNode | null>(null);
    const [shiny, setShiny] = useState(false);
    const [league, setLeague] = useState<League>();

    useEffect(() => {
        const newIsomorphicPokemons = pokemons.filter((p) => p.no === parseInt(pokemonNo));
        const newDisplayPokemon = newIsomorphicPokemons.find((p) => p.form?.toLowerCase() === pokemonForm);
        const newEvolutionTree = genEvolutionTree(pokemons, newDisplayPokemon);
        setIsomorphicPokemons(newIsomorphicPokemons);
        setDisplayPokemon(newDisplayPokemon);
        setEvolutionTree(newEvolutionTree);
    }, [pokemons, pokemonNo, pokemonForm]);

    useEffect(() => {
        if (displayPokemon) {
            if (displayPokemon.greatLeague) {
                setLeague('greatLeague');
            } else if (displayPokemon.ultraLeague) {
                setLeague('ultraLeague');
            } else if (displayPokemon.masterLeague) {
                setLeague('masterLeague');
            }
        }
    }, [displayPokemon]);

    if (!displayPokemon) {
        return null;
    }

    if (redirect) {
        return <Redirect to={'/pokemons'} />
    }

    return (
        <PageHeader className={[className, displayPokemon?.types[0]].join(' ')}
            title={displayPokemon.name}
            subTitle={`#${displayPokemon.no}`}
            onBack={() => setRedirect(true)}
            extra={[
                <Select key='1' className='pokemon-forms-select'
                    value={pokemonForm}
                >
                    {isomorphicPokemons.map(({ form }, i) => (
                        <Select.Option key={i}
                            value={String(form).toLowerCase()}
                        >
                            <Link to={`/pokemons/${pokemonNo}/${String(form).toLowerCase()}`}>
                                <div className='pokemon-forms-option'>
                                    {translateForm(displayPokemon.no, form)}
                                </div>
                            </Link>
                        </Select.Option>
                    ))}
                </Select>,
                <Button key='2' shape='circle'
                    type={shiny ? 'primary' : 'dashed'}
                    onClick={() => setShiny(!shiny)}
                >
                    {'✨'}
                </Button>,
            ]}
        >
            {/* Avatar */}
            <Row justify={'center'} align={'middle'}>
                <Col className='pokemon-avatar' flex={0}>
                    {/* Image */}
                    <Pokemon.AddressedImage
                        pokemonNo={displayPokemon.no}
                        pokemonForm={displayPokemon.form}
                        shiny={shiny}
                        size={125}
                    />
                </Col>
            </Row>

            <ProfileTabs type='card' centered>
                <ProfileTabs.TabPane tab={'基本數據'} key='meta'>
                    <Pokemon.Types
                        pokemon={displayPokemon}
                    />

                    <Pokemon.About
                        pokemon={displayPokemon}
                    />

                    <Pokemon.EvolutionTree
                        evolutionTree={evolutionTree}
                    />

                    <Pokemon.Stats
                        allPokemons={pokemons}
                        pokemon={displayPokemon}
                    />

                    <Pokemon.CombatPower
                        cpTable={displayPokemon.cpTable}
                    />
                </ProfileTabs.TabPane>

                <ProfileTabs.TabPane tab={'道館與團體戰'} key='pve'>
                    <Pokemon.MoveTable
                        pokemon={displayPokemon}
                        mode={'pve'}
                        leagueRanking={league && displayPokemon[league]}
                    />
                </ProfileTabs.TabPane>

                <ProfileTabs.TabPane tab={'訓練家對戰'} key='pvp'>
                    <Pokemon.CombatRanking
                        pokemon={displayPokemon}
                        league={league}
                        setLeague={setLeague}
                    />

                    <Pokemon.MoveTable
                        pokemon={displayPokemon}
                        mode={'pvp'}
                        leagueRanking={league && displayPokemon[league]}
                    />
                </ProfileTabs.TabPane>
            </ProfileTabs>
        </PageHeader>
    );
};

const styledPokemonProfileScreen = styled(PokemonProfileScreen)`
& {
    @keyframes background-image-gradient {
        from {
            opacity: 0;
        }
    }

    @keyframes background-gradient {
        from {
            background-color: #ECECEC;
        }
    }

    &::before {
        content: '';
        background-repeat: no-repeat;
        background-size: 100%;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 1;
        animation: background-image-gradient 5s 1;
    }
    
    min-height: 100vh;
    animation: background-gradient 1s 1;

    &.POKEMON_TYPE_NORMAL {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/normal.png");
        }

        background-color: #D5C398;
    }

    &.POKEMON_TYPE_FIRE {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/fire.png");
        }

        background-color: #5C2A3D;
    }

    &.POKEMON_TYPE_WATER {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/water.png");
        }

        background-color: #0085A1;
    }

    &.POKEMON_TYPE_GRASS {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/grass.png");
        }

        background-color: #AED059;
    }

    &.POKEMON_TYPE_ELECTRIC {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/electric.png");
        }

        background-color: #123A63;
    }

    &.POKEMON_TYPE_ICE {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/ice.png");
        }

        background-color: #416987;
    }

    &.POKEMON_TYPE_FIGHTING {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/fighting.png");
        }

        background-color: #836F52;
    }

    &.POKEMON_TYPE_POISON {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/poison.png");
        }

        background-color: #04102D;
    } 

    &.POKEMON_TYPE_GROUND {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/ground.png");
        }

        background-color: #BE9973;
    }

    &.POKEMON_TYPE_FLYING {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/flying.png");
        }

        background-color: #6CA1EB;
    }

    &.POKEMON_TYPE_PSYCHIC {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/psychic.png");
        }

        background-color: #232CB5;
    }

    &.POKEMON_TYPE_BUG {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/bug.png");
        }

        background-color: #C0A910;
    }

    &.POKEMON_TYPE_ROCK {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/rock.png");
        }

        background-color: #76808E;
    }

    &.POKEMON_TYPE_GHOST {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/ghost.png");
        }

        background-color: #191256;
    }

    &.POKEMON_TYPE_DARK {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/dark.png");
        }

        background-color: #04102D;
    }

    &.POKEMON_TYPE_DRAGON {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/dragon.png");
        }

        background-color: #436B40;
    }

    &.POKEMON_TYPE_STEEL {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/steel.png");
        }

        background-color: #1C2936;
    }

    &.POKEMON_TYPE_FAIRY {
        &::before {
            background-image: url("/willow-pokedex/type-backgrounds/fairy.png");
        }

        background-color: #8D70E0;
    }
    
    &.ant-page-header {
        padding: 16px 16px;
    }
}

.pokemon-forms-select {
    min-width: 100px;
}

.pokemon-forms-option {
    width: 100%;
}

.pokemon-avatar {
    text-align: center;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
}

.divider-title {
    margin: 0;
}

/* Overwrite antd components */
.ant-page-header-heading .ant-page-header-heading-left {
    z-index: 1;

    .ant-page-header-back .ant-page-header-back-button {
        color: #ECECEC;
        text-shadow: #000000 0.1em 0.1em 0.2em;
    }

    .ant-page-header-heading-title, .ant-page-header-heading-sub-title {
        color: #ECECEC;
        text-shadow: #000000 0.1em 0.1em 0.2em;
        padding-right: .5em;
        margin-right: 0;
    }
}
`;

export default styledPokemonProfileScreen;
