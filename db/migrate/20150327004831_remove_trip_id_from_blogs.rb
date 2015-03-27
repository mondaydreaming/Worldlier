class RemoveTripIdFromBlogs < ActiveRecord::Migration
  def change
    remove_column :blogs, :trip_id, :integer
  end
end
