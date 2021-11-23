class SerchesController < ApplicationController
  def tag_search
    @posts = Post.search(params[:tag])
    @keyword = params[:tag]
  end

  def search
  end
end
