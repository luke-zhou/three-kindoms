class World < ApplicationRecord
    has_many :kindoms, dependent: :destroy
    has_many :battle_fields, dependent: :destroy
    has_many :home_towns, dependent: :destroy

    after_create :init

    COLORS = ['RED', 'YELLOW', 'BLUE']

    def kindom(color)
        kindoms.find{|k| k.color == color}
    end
    
    def move
        move_soldiers
        finalize_fields
        spawn_soldiers
    end

    def finalize_fields
        battle_fields.select{|bf| bf.soldiers.present?}.each do |bf|
            battle_groups = kindoms.map{|k| [k, []]}.to_h
            bf.soldiers.each do |s|
                battle_groups[s.kindom] << s
            end
            battle_pool = battle_groups.values.each(&:shuffle!).map(&:shift).compact
            while battle_pool.size > 1
                winner = battle_pool.shuffle!.shift
                battle_groups[winner.kindom] << winner
                battle_pool.each(&:destroy)
                battle_pool = battle_groups.values.each(&:shuffle!).map(&:shift).compact
            end

            bf.kindom = battle_pool.first.kindom
            bf.save!
        end
    end

    def spawn_soldiers
        kindoms.each(&:spawn)
    end
    
    def move_soldiers
        kindoms
            .map(&:soldiers)
            .flatten
            .each(&:move)
    end

    def find_field(q:, r: )
        (home_towns + battle_fields).select{|field| field.q ==q && field.r ==r}.first
    end

    def init
        init_kindoms
        init_fields
        spawn_soldiers
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

    private :init, :init_kindoms, :init_fields
end
