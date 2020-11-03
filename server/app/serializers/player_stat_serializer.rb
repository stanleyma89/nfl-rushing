class PlayerStatSerializer < ActiveModel::Serializer
  attributes :id, :player_name, :player_team, :player_position, :rushing_attempts_per_game_avg, :rushing_attempts, :total_rushing_yards, :rushing_average_yards_per_attempt, :rushing_yards_per_game, :total_rushing_touchdowns, :longest_rush, :longest_rush_with_touchdown, :rushing_first_downs, :rushing_first_down_percentage, :rushing_twenty_plus_yards, :rushing_forty_plus_yards, :rushing_fumbles
end
