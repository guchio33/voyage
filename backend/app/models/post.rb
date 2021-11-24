class Post < ApplicationRecord
    #mount_uploader :photo, PhotoUploader　#photoカラムとphotoアップローダーの紐付け
    #serialize :photo, JSON # SQLiteを使っているときはこの列を追記
    
    #has_many :tag_maps, dependent: :destroy
    #has_many :tags, through: :tag_maps
    def self.tag_search(tag)
        if tag != ""
          Post.where('tags LIKE(?)', "%#{tag}%")
        else
          Post.all
        end
    end

end
