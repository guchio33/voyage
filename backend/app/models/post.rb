class Post < ApplicationRecord
    mount_uploader :photo, PhotoUploader　#photoカラムとphotoアップローダーの紐付け
    #serialize :photo, JSON # SQLiteを使っているときはこの列を追記
    
    #has_many :tag_maps, dependent: :destroy
    #has_many :tags, through: :tag_maps

    attr_accessor :tag_keyword

    def tag_search(tag)
        return Post.all unless tag　#検索ワードがない場合、全ての投稿を返す
        self.where(["tags LIKE ?","%{tag}%"])
    end

end
