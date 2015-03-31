class DropPlacesTrips < ActiveRecord::Migration
  def change
    drop_table :places_trips
  end
end
