class GamesController < ApplicationController
  def index
  end

  def start
    @world = World.create(size: 3)
  end
end
