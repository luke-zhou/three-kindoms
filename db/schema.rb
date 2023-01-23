# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_22_213316) do
  create_table "fields", force: :cascade do |t|
    t.string "type"
    t.integer "r"
    t.integer "q"
    t.integer "s"
    t.integer "kindom_id"
    t.integer "world_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["kindom_id"], name: "index_fields_on_kindom_id"
    t.index ["world_id"], name: "index_fields_on_world_id"
  end

  create_table "kindoms", force: :cascade do |t|
    t.integer "world_id"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["world_id"], name: "index_kindoms_on_world_id"
  end

  create_table "soldiers", force: :cascade do |t|
    t.integer "kindom_id"
    t.integer "field_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["field_id"], name: "index_soldiers_on_field_id"
    t.index ["kindom_id"], name: "index_soldiers_on_kindom_id"
  end

  create_table "worlds", force: :cascade do |t|
    t.integer "size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
