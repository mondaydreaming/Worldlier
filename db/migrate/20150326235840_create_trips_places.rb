class CreateTripsPlaces < ActiveRecord::Migration
  def change
    create_table :trips_places, :id => false do |t|
      t.integer :trip_id
      t.integer :place_id
    end
  end
end
