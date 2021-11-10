class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :image
      t.string :place_name
      t.string :prefecture
      t.string :genre

      t.timestamps
    end
  end
end
