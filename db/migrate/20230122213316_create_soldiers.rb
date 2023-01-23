class CreateSoldiers < ActiveRecord::Migration[7.0]
  def change
    create_table :soldiers do |t|
      t.belongs_to :kindom
      t.belongs_to :field
      t.timestamps
    end
  end
end
