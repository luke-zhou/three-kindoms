class Field < ApplicationRecord
    belongs_to :kindom, optional: true
    belongs_to :world
    has_many :soldiers

    after_initialize :init

    after_commit -> { broadcast_replace_to 'status', partial: 'worlds/status', target: 'status', locals:{ world: world}  }

    NEXT_FIELD_OFFSET = [
        {q:1, r:0},
        {q:1, r:-1},
        {q:0, r:-1},
        {q:-1, r:0},
        {q:-1, r:1},
        {q:0, r:1}
    ]
    
    def init
        self.s = 0 - q - r
    end

    def next_fields
        NEXT_FIELD_OFFSET
        .map{|offset| world.find_field(q: q+offset[:q], r: r+offset[:r])}
        .compact
    end
end
