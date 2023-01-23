class WorldsController < ApplicationController
    def show
        soldier_json_spec = {
            only: [:kindom_id, :field_id]
        }
        field_json_spec = {
            except: [:id, :created_at, :updated_at, :world_id],
            include: {soldiers: soldier_json_spec}
        }
        common_expect = [:id, :created_at, :updated_at]
        id_only = {only: :id}
        render json: World.find(params[:id]),
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
    end
end
