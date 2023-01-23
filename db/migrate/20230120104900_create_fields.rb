class CreateFields < ActiveRecord::Migration[7.0]
  def change
    create_table :fields do |t|
      t.string :type
      t.integer :r
      t.integer :q
      t.integer :s
      t.belongs_to :kindom
      t.belongs_to :world
      t.timestamps
    end
  end
end
