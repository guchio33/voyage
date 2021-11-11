class Post < ApplicationRecord
    has_many :tag_maps, dependent: :destroy
    has_many :tags, through: :tag_maps

    mount_uploader :image, ImageUploader　#imageカラムとimageアップローダーの紐付け

end
