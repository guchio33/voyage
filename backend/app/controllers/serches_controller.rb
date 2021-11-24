class SerchesController < ApplicationController
  def search
    responce_tags = Post.tag_search(params[:keyword])
    render JSON: responce_tags
  end
end
