class Post < ApplicationRecord
    mount_uploader :photo, PhotoUploaders　#photoカラムとphotoアップローダーの紐付け

    has_many :tag_maps, dependent: :destroy
    has_many :tags, through: :tag_maps

end
