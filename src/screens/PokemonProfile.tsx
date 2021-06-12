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
import type { IPokemon, IPokemonStatus } from '../models/pokemon';
import * as Pokemon from '../components/pokemon';

type League = 'greatLeague' | 'ultraLeague' | 'masterLeague';

const ProfileTabs = styled(Tabs)`
.ant-tabs-content {
    margin-top: -16px;
}
.ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    border-radius: 5px;
    padding: 16px;
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
    const [leagueRanking, setLeagueRanking] = useState<IPokemon[League]>();
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
            setLeagueRanking(
                displayPokemon.greatLeague ||
                displayPokemon.ultraLeague ||
                displayPokemon.masterLeague
            );
        }
    }, [displayPokemon]);

    if (!displayPokemon) {
        return null;
    }

    if (pokemonForm !== selectedForm) {
        return <Redirect to={`/willow-pokedex/pokemons/${pokemonNo}/${selectedForm}`} />;
    }

    return (
        <PageHeader className={className}
            title={displayPokemon.name}
            extra={[
                <Select key='1' className='pokemon-forms-select'
                    value={selectedForm}
                    onChange={onChangeForm}
                >
                    {isomorphicPokemons.map(({ form }, i) => (
                        <Select.Option key={i} value={String(form).toLowerCase()}>{form}</Select.Option>
                    ))}
                </Select>,
                <Button key='2'
                    type={shiny ? 'primary' : 'dashed'}
                    onClick={() => setShiny(!shiny)}
                >
                    {'異色✨'}
                </Button>,
            ]}
        >
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
                    
                    <Divider plain orientation='left'>
                        <Row wrap={false} gutter={5} align='middle' justify='center'>
                            <Col flex='none'>
                                <Image preview={false} height={30} width={47}
                                    src={'/willow-pokedex/assets/pokemon_desc.png'}
                                />
                            </Col>
                            <Col flex='none'>
                                <Typography.Title className='divider-title' level={5}>
                                    {'關於'}
                                </Typography.Title>
                            </Col>
                        </Row>
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

                    <Divider plain orientation='left'>
                        <Row wrap={false} gutter={5} align='middle' justify='center'>
                            <Col flex='none'>
                                <Image preview={false} height={30} width={30}
                                    src={'/willow-pokedex/assets/pokemon_cp.png'}
                                />
                            </Col>
                            <Col flex='none'>
                                <Typography.Title className='divider-title' level={5}>
                                    {'最大 CP'}
                                </Typography.Title>
                            </Col>
                        </Row>
                    </Divider>

                    <Pokemon.CombatPower cpTable={displayPokemon.cpTable} />
                </ProfileTabs.TabPane>

                <ProfileTabs.TabPane tab={'道館與團體戰'} key='pve'>
                    <Pokemon.MoveTable
                        pokemon={displayPokemon}
                        mode={'pve'}
                        leagueRanking={leagueRanking}
                    />
                </ProfileTabs.TabPane>

                <ProfileTabs.TabPane tab={'訓練家對戰'} key='pvp'>
                    <Pokemon.CombatRanking pokemon={displayPokemon} />

                    <Divider />
                    
                    <Pokemon.MoveTable
                        pokemon={displayPokemon}
                        mode={'pvp'}
                        leagueRanking={leagueRanking}
                    />
                </ProfileTabs.TabPane>
            </ProfileTabs>
        </PageHeader>
    );
};

const styledPokemonProfile = styled(PokemonProfile)`
.pokemon-avatar {
    text-align: center;
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
`;

export default styledPokemonProfile;
