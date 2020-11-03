require 'test_helper'

class PlayerStatsControllerTest < ActionDispatch::IntegrationTest
  test 'should call the player stats index method and return OK' do
    get player_stats_url
    assert_response :ok
  end

  test 'should return content type csv for download' do
    get player_stats_url, params: { download: 'true' }
    assert_equal("text/csv", response.content_type)
  end

  test 'should return a list of players matches that matches search term' do
    create(:player_stat)
    get player_stats_url, params: { filter: { player_name: 'Russell Wilson'} }
    body = JSON.parse(response.body)

    assert_equal("Russell Wilson", body['data'][0]['attributes']['player-name'])
  end

  test 'should return a paginated response of 30 records' do
    40.times do
      create(:player_stat)
    end

    get player_stats_url, params: { page: { number: '1' }, page: { size: '30' } }
    body = JSON.parse(response.body)

    assert_equal(30, body['data'].count)
  end

  test 'should return response with sorted column by ascending' do
    create(:player_stat, total_rushing_yards: 199)
    create(:player_stat, total_rushing_yards: 230)
    create(:player_stat, total_rushing_yards: 50)

    get player_stats_url, params: { sort: 'total_rushing_yards', order: 'asc', page: { number: '1' }, page: { size: '30' } }
    body = JSON.parse(response.body)

    assert_equal(50, body['data'][0]['attributes']['total-rushing-yards'])
  end
end
