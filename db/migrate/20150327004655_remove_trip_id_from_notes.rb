class RemoveTripIdFromNotes < ActiveRecord::Migration
  def change
    remove_column :notes, :trip_id, :integer
  end
end
