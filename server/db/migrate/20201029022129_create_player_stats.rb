class CreatePlayerStats < ActiveRecord::Migration[6.0]
  def change
    create_table :player_stats do |t|

      t.string :player_name
      t.string :player_team
      t.string :player_position
      t.float :rushing_attempts_per_game_avg
      t.integer :rushing_attempts
      t.integer :total_rushing_yards
      t.float :rushing_average_yards_per_attempt
      t.float :rushing_yards_per_game
      t.integer :total_rushing_touchdowns
      t.integer :longest_rush
      t.boolean :longest_rush_with_touchdown
      t.integer :rushing_first_downs
      t.float :rushing_first_down_percentage
      t.integer :rushing_twenty_plus_yards
      t.integer :rushing_forty_plus_yards
      t.integer :rushing_fumbles
      
      t.timestamps
    end
  end
end
