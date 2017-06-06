class Api::PhotosController < ApplicationController
  def show
    @photo = Photo.find(params[:id])
    render :show
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      render :show
    else
      @error = @photo.errors.full_messages
      render :show, status: 401
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
       @photo.destroy
       render :show
  end

  def index
    @user = current_user
    render :index

  end

  private
  def photo_params
    params.require(:photo).permit(:user_id, :description, :image_url, :title)
  end
end
