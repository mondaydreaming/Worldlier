class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.text :title
      t.text :entry
      t.integer :trip_id
      t.integer :place_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
