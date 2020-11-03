import {
  FETCH_PLAYER_STATS_REQUEST,
  FETCH_PLAYER_STATS_SUCCESS,
  FETCH_PLAYER_STATS_FAILURE,
  DOWLOAD_PLAYER_STATS_REQUEST,
  DOWLOAD_PLAYER_STATS_SUCCESS,
  DOWLOAD_PLAYER_STATS_FAILURE
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: ''
}

const playerStats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYER_STATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PLAYER_STATS_SUCCESS:
      return {
        loading: false,
        data: action.playerStats,
        error: ''
      }
    case FETCH_PLAYER_STATS_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.error
      }
    case DOWLOAD_PLAYER_STATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DOWLOAD_PLAYER_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      }
    case DOWLOAD_PLAYER_STATS_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.error
      }
    default:
      return state
  }
}

export default playerStats
