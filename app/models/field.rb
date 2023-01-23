class Field < ApplicationRecord
    belongs_to :kindom, optional: true
    belongs_to :world
    has_many :soldiers

    after_initialize :init
    
    def init
        self.s = 0 - q - r
    end
end
