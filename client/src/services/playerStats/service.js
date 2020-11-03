import { apiClient, downloadApiClient } from '../../helpers/apiClient';

export const fetchPlayerStats = (search, sort, order, number = 1, size = 30, url = null) => {
  if (search) {
    return apiClient.get(`/player_stats?filter[player_name]=${search}`);
  }

  if (sort && order) {
    return apiClient.get(`/player_stats?sort=${sort}&order=${order}&page[number]=${number}&page[size]=${size}`);
  }

  if (url) {
    return apiClient.get(`/${url}`);
  }

  return apiClient.get(`/player_stats?page[number]=${number}&page[size]=${size}`);
}

export const downloadStats = (download, sortBy = null, order = null, search = null) => {
  if (search) {
    return downloadApiClient.get(`/player_stats?download=${download}&filter[player_name]=${search}`);
  }
  if (sortBy && order) {
    return downloadApiClient.get(`/player_stats?download=${download}&sort=${sortBy}&order=${order}`);
  }

  return downloadApiClient.get(`/player_stats?download=${download}`);
}
