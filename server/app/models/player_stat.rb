require 'csv'

class PlayerStat < ApplicationRecord

  def self.populate_database_from_json(file_path)
    json_data = File.read(file_path)
    player_stats = JSON.parse(json_data)
    
    player_stats.each do |player_stat|
      total_rushing_yards = player_stat['Yds'].class == String ? player_stat['Yds'].to_i : player_stat['Yds']
      longest_rush = player_stat['Lng'].to_i
      longest_rush_with_touchdown = player_stat['Lng'].class == String ? player_stat['Lng'].include?('T') : false

      PlayerStat.create(
        player_name: player_stat['Player'],
        player_team: player_stat['Team'],
        player_position: player_stat['Pos'],
        rushing_attempts_per_game_avg: player_stat['Att/G'],
        rushing_attempts: player_stat['Att'],
        total_rushing_yards: total_rushing_yards,
        rushing_average_yards_per_attempt: player_stat['Avg'],
        rushing_yards_per_game: player_stat['Yds/G'],
        total_rushing_touchdowns: player_stat['TD'],
        longest_rush: longest_rush,
        longest_rush_with_touchdown: longest_rush_with_touchdown,
        rushing_first_downs: player_stat['1st'],
        rushing_first_down_percentage: player_stat['1st%'],
        rushing_twenty_plus_yards: player_stat['20+'],
        rushing_forty_plus_yards: player_stat['40+'],
        rushing_fumbles: player_stat['FUM']
      )
    end

  end

  def self.generate_csv(player_stats)
    headers = [
      'Player',
      'Team',
      'Pos',
      'Att',
      'Att/G',
      'Yds',
      'Avg',
      'Yds/G',
      'TD',
      'Lng',
      'Lng TD',
      '1st',
      '1st%',
      '20+',
      '40+',
      'FUM'
    ]

    CSV.generate do |csv|
      csv << headers
      player_stats.each do |player_stat|
        csv <<  [ player_stat.player_name,
                  player_stat.player_team,
                  player_stat.player_position,
                  player_stat.rushing_attempts,
                  player_stat.rushing_attempts_per_game_avg,
                  player_stat.total_rushing_yards,
                  player_stat.rushing_average_yards_per_attempt,
                  player_stat.rushing_yards_per_game,
                  player_stat.total_rushing_touchdowns,
                  player_stat.longest_rush,
                  player_stat.longest_rush_with_touchdown,
                  player_stat.rushing_first_downs,
                  player_stat.rushing_first_down_percentage,
                  player_stat.rushing_twenty_plus_yards,
                  player_stat.rushing_forty_plus_yards,
                  player_stat.rushing_fumbles
        ]
      end
    end
  end

end
