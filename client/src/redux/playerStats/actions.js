import { fetchPlayerStats, downloadStats } from '../../services/playerStats/service';
import {
  FETCH_PLAYER_STATS_REQUEST,
  FETCH_PLAYER_STATS_SUCCESS,
  FETCH_PLAYER_STATS_FAILURE,
  DOWLOAD_PLAYER_STATS_REQUEST,
  DOWLOAD_PLAYER_STATS_SUCCESS,
  DOWLOAD_PLAYER_STATS_FAILURE
} from './constants';
import fileDownload from 'js-file-download';

const fetchPlayerStatsRequest = () => {
  return {
    type: FETCH_PLAYER_STATS_REQUEST,
  }
}

const fetchPlayerStatsSuccess = (playerStats) => {
  return {
    type: FETCH_PLAYER_STATS_SUCCESS,
    playerStats
  }
}

const fetchPlayerStatsFailure = (error) => {
  return {
    type: FETCH_PLAYER_STATS_FAILURE,
    error
  }
}

const downloadPlayerStatsRequest = () => {
  return {
    type: DOWLOAD_PLAYER_STATS_REQUEST,
  }
}

const downloadPlayerStatsSuccess = () => {
  return {
    type: DOWLOAD_PLAYER_STATS_SUCCESS,
  }
}

const downloadPlayerStatsFailure = (error) => {
  return {
    type: DOWLOAD_PLAYER_STATS_FAILURE,
    error
  }
}

export const getPlayerStats = (search, sort, order, download, number, size, url) => {
  return async (dispatch) => {
    try {
      dispatch(fetchPlayerStatsRequest())
      const response = await fetchPlayerStats(search, sort, order, download, number, size, url);
      dispatch(fetchPlayerStatsSuccess(response.data))
    } catch (error) {
      dispatch(fetchPlayerStatsFailure(error.response.data))
    }
  }
}

export const downloadPlayerStats = (download, sortBy, order, search) => {
  return async (dispatch) => {
    try {
      dispatch(downloadPlayerStatsRequest())
      const response = await downloadStats(download, sortBy, order, search);
      dispatch(downloadPlayerStatsSuccess())
      fileDownload(response.data, 'player-stats.csv');
    } catch (error) {
      dispatch(downloadPlayerStatsFailure(error.response.data))
    }
  }
}
