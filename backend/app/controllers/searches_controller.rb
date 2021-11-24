class SearchesController < ApplicationController
  def index
    post = Post.tag_seach(params:[:tag_keyword])
    render json:post
  end
end
