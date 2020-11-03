FactoryBot.define do
  factory :player_stat do
    player_name { "Russell Wilson" }
    player_team { "SEA" }
    player_position { "QB" }
    rushing_attempts { 72 }
    rushing_attempts_per_game_avg { 4.5 }
    total_rushing_yards { 259 }
    rushing_average_yards_per_attempt { 3.6 }
    rushing_yards_per_game { 16.2 }
    total_rushing_touchdowns { 1 }
    longest_rush { 18 }
    longest_rush_with_touchdown { false }
    rushing_first_downs { 16 }
    rushing_first_down_percentage { 22.2 }
    rushing_twenty_plus_yards { 0 }
    rushing_forty_plus_yards { 0 }
    rushing_fumbles { 2 }
  end
end
