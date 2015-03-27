class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.integer :sightsnum
      t.string :location
      t.integer :location_radius
      t.string :tag
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
