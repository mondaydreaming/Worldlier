class AddColumnToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :google_id, :string
  end
end
