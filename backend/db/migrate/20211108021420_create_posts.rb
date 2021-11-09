class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :image
      t.string :place
      t.string :city
      t.string :genre

      t.timestamps
    end
  end
end
