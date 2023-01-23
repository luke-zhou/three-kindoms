class Kindom < ApplicationRecord
    belongs_to :world
    has_one :home_town
    has_many :battle_fields
    has_many :soldiers, dependent: :destroy

    def spawn
        Soldier.create(field: home_town, kindom: self) if succeed_to_spawn?
    end

    def succeed_to_spawn?
        rand > battle_fields.size * 1.0 / world.battle_fields.size
    end
end
