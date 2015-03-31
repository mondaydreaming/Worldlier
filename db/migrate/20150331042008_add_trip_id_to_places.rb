class AddTripIdToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :trip_id, :integer
  end
end
