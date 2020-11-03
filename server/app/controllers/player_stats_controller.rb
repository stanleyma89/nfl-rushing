class PlayerStatsController < ApplicationController

  def index
    if filter
      find_player(params[:filter][:player_name])
    else
      @players = PlayerStat.all
    end

    if page
      @players = PlayerStat.page(page_number).per(per_page)
    end

    if column && order && !download
      @players = PlayerStat.order("#{column} #{order}").page(page_number).per(per_page)
    end

    if download
      @players = PlayerStat.all

      if column && order
        @players = PlayerStat.order("#{column} #{order}")
      end

      if filter
        find_player(params[:filter][:player_name])
      end

      csv_file = PlayerStat.generate_csv(@players)

      send_data csv_file, filename: "data.csv", type: 'text/csv', disposition: 'attachment'
    else
      render json: @players
    end

  end

  private

  def filter
    @filter ||= params[:filter] || nil
  end

  def find_player(search_term)
    @players = PlayerStat.where('player_name ILIKE ?', "%#{search_term}%")
  end

  def page
    @page ||= params[:page] || nil
  end

  def download
    @download ||= params[:download] || nil
  end

  def page_number
    @page_number ||= params[:page][:number] || 1
  end

  def per_page
    @per_page ||= params[:page][:size] || 30
  end

  def order
    @order ||= params[:order] || nil
  end

  def column
    @column ||= params[:sort] || nil
  end
end
