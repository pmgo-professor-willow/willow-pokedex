// Node modules.
import React from 'react';
// Local modules.
import type { IPokemon } from '../models/pokemon';

export const PokemonContext = React.createContext([] as IPokemon[]);
