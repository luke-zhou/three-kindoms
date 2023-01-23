class World < ApplicationRecord
    has_many :kindoms, dependent: :destroy
    has_many :battle_fields, dependent: :destroy
    has_many :home_towns, dependent: :destroy

    after_create :init

    COLORS = ['#FF0000', '#FFFF00', '#0000FF']

    def valid(field)
        [field.q.abs, field.r.abs, (field.q+field.r).abs]
        .all?{|n| n <= size}
    end

    def init
        init_kindoms
        init_fields
        init_soldiers
    end

    def init_soldiers
        kindoms.each(&:spawn)
    end

    def init_fields
        home_town_cords = {
            [-size, 0] => kindoms[0],
            [size, -size] => kindoms[1],
            [0, size] => kindoms[2]
        }
        cords = (-size..size).to_a.permutation(2).to_a
        cords.concat((-size..size).map{|i| [i, i]})
        cords.select!{|a, b| (a+b).abs<=size}
        cords.each do |cord|
            if home_town_cords[cord]
                HomeTown.create(q: cord[0], r:cord[1], world: self, kindom: home_town_cords[cord])
            else
                puts(q:cord[0], r:cord[1])
                BattleField.create(q: cord[0], r:cord[1], world: self)
            end
        end
    end

    def init_kindoms
        COLORS.each {|c| kindoms << Kindom.create(color: c)}
    end

    private :init, :init_kindoms, :init_fields, :init_soldiers
end
