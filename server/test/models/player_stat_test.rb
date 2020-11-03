require 'test_helper'

class PlayerStatTest < ActiveSupport::TestCase
  test "should import a json file and save it to the database" do
    file_path = File.join(Rails.root, '/test/fixtures/rushing-test.json')
    PlayerStat.populate_database_from_json(file_path)

    first_player_stat = PlayerStat.first

    assert_equal("Joe Banyard", first_player_stat.player_name)
    assert_equal("JAX", first_player_stat.player_team)
    assert_equal("RB", first_player_stat.player_position)
    assert_equal(2, first_player_stat.rushing_attempts)
    assert_equal(2, first_player_stat.rushing_attempts_per_game_avg)
    assert_equal(7, first_player_stat.total_rushing_yards)
    assert_equal(3.5, first_player_stat.rushing_average_yards_per_attempt)
    assert_equal(7, first_player_stat.rushing_yards_per_game)
    assert_equal(0, first_player_stat.total_rushing_touchdowns)
    assert_equal(7, first_player_stat.longest_rush)
    assert_equal(false, first_player_stat.longest_rush_with_touchdown)
    assert_equal(0, first_player_stat.rushing_first_downs)
    assert_equal(0, first_player_stat.rushing_first_down_percentage)
    assert_equal(0, first_player_stat.rushing_twenty_plus_yards)
    assert_equal(0, first_player_stat.rushing_forty_plus_yards)
    assert_equal(0, first_player_stat.rushing_fumbles)

    assert_equal(3, PlayerStat.count)
  end

  test "should generate the player stat objects as csv" do
    create(:player_stat)
    csv = PlayerStat.generate_csv(PlayerStat.all)
    split_csv = csv.split("\n")
    headers = split_csv.first
    data = split_csv.last

    assert_equal("Player,Team,Pos,Att,Att/G,Yds,Avg,Yds/G,TD,Lng,Lng TD,1st,1st%,20+,40+,FUM", headers)
    assert_equal("Russell Wilson,SEA,QB,72,4.5,259,3.6,16.2,1,18,false,16,22.2,0,0,2", data)
  end
end
