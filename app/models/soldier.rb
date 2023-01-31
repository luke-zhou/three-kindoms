class Soldier < ApplicationRecord
    belongs_to :kindom
    belongs_to :field

    after_commit -> { broadcast_replace_to 'status', partial: 'worlds/status', target: 'status', locals:{ world: kindom.world}  }

    def move
        # <0.25 stay, >=0.25 move one step
        if rand >= 0.25
            self.field = self.field.next_fields.sample
            save!
        end
    end
end
