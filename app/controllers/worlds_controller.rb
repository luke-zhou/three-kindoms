class WorldsController < ApplicationController
    def create
        world = World.new
        (1..3).each do 
            kindom = Kindom.new
            world.kindoms << kindom
        end
        world.save
    end
end
