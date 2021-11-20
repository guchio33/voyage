class PostsController < ApplicationController
  before_action :set_post, only: %i[show destroy update]

  #全投稿を表示（get）
  def index
    posts = Post.all.order(:id)
    render json: posts
  end

  #投稿を見る（get）
  def show
    if @post
      render json: { status: 200, post: @post }
    else
      render json: { status: 500}
    end
  end

  #投稿を作成（post）
  def create 
    post = Post.new(post_params)
    if post.save
      render json: { status: 200, post: @post }
    else
      render json: { status: 500 }
    end
  end

  #投稿を更新（put）
  def update
    if @post.update(post_params)
      render json: { status: 200, post: @post }
    else
      render json: { status: 500 }
    end
  end

  #投稿を削除（delete）
  def destroy
    if @post.destroy
      render json: @post
    else
      render json: @post.errors
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(photo:, :place, :prefecture, :genre)
  end
end
