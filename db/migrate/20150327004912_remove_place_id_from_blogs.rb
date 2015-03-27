class RemovePlaceIdFromBlogs < ActiveRecord::Migration
  def change
    remove_column :blogs, :place_id, :integer
  end
end
