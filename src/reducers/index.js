import { combineReducers } from 'redux';

import companies from './companies';
import stocks from './stocks';

export const reducers = combineReducers({ companies, stocks });
