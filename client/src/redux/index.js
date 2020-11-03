import { combineReducers } from 'redux';
import playerStats from './playerStats/reducers';

const appReducer = combineReducers({
  playerStats
})

export default appReducer
