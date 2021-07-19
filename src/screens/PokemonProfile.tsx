// Node modules.
import { maxBy } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import {
    PageHeader,
    Row,
    Col,
    Tabs,
    Typography,
    Divider,
    Image,
    Select,
    Button,
} from 'antd';
import styled from 'styled-components';
// Local modules.
import type { IPokemon, IPokemonStatus, League } from '../models/pokemon';
import * as Pokemon from '../components/pokemon';
import { translateForm } from '../utils/translate-form';

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

interface PokemonProfileProps {
    className?: string;
    pokemons: IPokemon[];
}

const PokemonProfile: React.FC<PokemonProfileProps> = (props) => {
    const { className } = props;
    const { pokemons } = props;

    const { pokemonNo, pokemonForm } = useParams<{ pokemonNo: string, pokemonForm: string }>();

    const [isomorphicPokemons, setIsomorphicPokemons] = useState<IPokemon[]>([]);
    const [displayPokemon, setDisplayPokemon] = useState<IPokemon | undefined>();
    const [selectedForm, setSelectedForm] = useState(pokemonForm);
    const [shiny, setShiny] = useState(false);
    const [league, setLeague] = useState<League>();
    const [maximum, setMaximum] = useState<IPokemonStatus>(displayPokemon?.stats!);

    const onChangeForm = useCallback((form: string) => {
        setSelectedForm(form);
    }, []);

    useEffect(() => {
        const newIsomorphicPokemons = pokemons.filter((p) => p.no === parseInt(pokemonNo));
        const newDisplayPokemon = newIsomorphicPokemons.find((p) => p.form?.toLowerCase() === pokemonForm);
        setIsomorphicPokemons(newIsomorphicPokemons);
        setDisplayPokemon(newDisplayPokemon);
    }, [pokemons, pokemonNo, pokemonForm]);

    useEffect(() => {
        setMaximum({
            baseStamina: maxBy(pokemons, (pokemon) => pokemon.stats.baseStamina)?.stats.baseAttack!,
            baseAttack: maxBy(pokemons, (pokemon) => pokemon.stats.baseAttack)?.stats.baseAttack!,
            baseDefense: maxBy(pokemons, (pokemon) => pokemon.stats.baseDefense)?.stats.baseDefense!,
        });
    }, [pokemons]);

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

    if (pokemonForm !== selectedForm) {
        return <Redirect to={`/willow-pokedex/pokemons/${pokemonNo}/${selectedForm}`} />;
    }

    return (
        <PageHeader className={[className, displayPokemon?.types[0]].join(' ')}
            title={displayPokemon.name}
            subTitle={`#${displayPokemon.no}`}
            onBack={() => window.history.back()}
            extra={[
                <Select key='1' className='pokemon-forms-select'
                    value={selectedForm}
                    onChange={onChangeForm}
                >
                    {isomorphicPokemons.map(({ form }, i) => (
                        <Select.Option key={i}
                            value={String(form).toLowerCase()}
                        >
                            {translateForm(displayPokemon.no, form)}
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
                    <Pokemon.Image
                        pokemonNo={displayPokemon.no}
                        pokemonForm={displayPokemon.form}
                        shiny={shiny}
                        size={125}
                    />
                </Col>
            </Row>

            <ProfileTabs type='card' centered>
                <ProfileTabs.TabPane tab={'基本數據'} key='meta'>
                    <Row align='middle'>
                        <Col className='pokemon-meta' flex={3}>
                            {/* Types */}
                            <Row justify={'center'} align={'middle'}>
                                <Col className='pokemon-types' span={12}>
                                    <Row>
                                        {displayPokemon.types.map((type, i) => (
                                            <Col key={i} flex={1}>
                                                <Pokemon.TypeIcon pokemonType={type} size={35} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>

                            {/* Stats */}
                            <Row justify={'center'} align={'middle'}>
                                <Col className='pokemon-stat' span={24}>
                                    <Pokemon.Stat
                                        type='attack'
                                        value={displayPokemon.stats.baseAttack}
                                        percent={displayPokemon.stats.baseAttack / maximum.baseAttack * 100}
                                    />
                                </Col>

                                <Col className='pokemon-stat' span={24}>
                                    <Pokemon.Stat
                                        type='defense'
                                        value={displayPokemon.stats.baseDefense}
                                        percent={displayPokemon.stats.baseDefense / maximum.baseDefense * 100}
                                    />
                                </Col>

                                <Col className='pokemon-stat' span={24}>
                                    <Pokemon.Stat
                                        type='stamina'
                                        value={displayPokemon.stats.baseStamina}
                                        percent={displayPokemon.stats.baseStamina / maximum.baseDefense * 100}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Divider plain orientation='center'>
                        <Image preview={false} height={30} width={47}
                            src={'/willow-pokedex/assets/pokemon_desc.png'}
                        />
                        <Typography.Title className='divider-title' level={5}>
                            {'關於'}
                        </Typography.Title>
                    </Divider>

                    <Row align='middle'>
                        <Col className='' flex={1}>
                            <Typography.Title level={5}>
                                {displayPokemon.category}
                            </Typography.Title>

                            <Typography.Paragraph>
                                {displayPokemon.description}
                            </Typography.Paragraph>
                        </Col>
                    </Row>

                    <Divider plain orientation='center'>
                        <Image preview={false} height={30} width={30}
                            src={'/willow-pokedex/assets/pokemon_cp.png'}
                        />
                        <Typography.Title className='divider-title' level={5}>
                            {'最大 CP'}
                        </Typography.Title>
                    </Divider>

                    <Pokemon.CombatPower cpTable={displayPokemon.cpTable} />
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

const styledPokemonProfile = styled(PokemonProfile)`
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

.pokemon-avatar {
    text-align: center;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
}

.pokemon-meta {
    text-align: center;
}

.pokemon-stat {
    text-align: center;
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
    }
}
`;

export default styledPokemonProfile;
