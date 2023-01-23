class CreateKindoms < ActiveRecord::Migration[7.0]
  def change
    create_table :kindoms do |t|
      t.belongs_to :world
      t.string :color
      t.timestamps
    end
  end
end
