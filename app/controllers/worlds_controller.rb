class WorldsController < ApplicationController
    before_action :load_world

    def show
        render jsonfy_world(@world)
    end

    def move
        @world.move
        render jsonfy_world(@world)
    end

    def load_world
        @world = World.find(params[:id])
    end

    def jsonfy_world(world)
        soldier_json_spec = {
            only: [:kindom_id, :field_id]
        }
        field_json_spec = {
            except: [:id, :created_at, :updated_at, :world_id],
            include: {soldiers: soldier_json_spec}
        }
        common_expect = [:id, :created_at, :updated_at]
        id_only = {only: :id}
        
        return {
            json: World.find(params[:id]),
            except: common_expect,
            include: {
                kindoms: {
                    except: common_expect,
                    include: {
                        home_town: field_json_spec,
                        soldiers: id_only,
                        battle_fields: field_json_spec
                    }
                }
            }
        }
    end

    private :jsonfy_world, :load_world
end
