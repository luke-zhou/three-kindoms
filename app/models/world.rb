class World < ApplicationRecord
    has_many :kindoms, dependent: :destroy
    after_initialize :init_kindoms

    def init_kindoms
        3.times { kindoms << Kindom.new }
    end
end
