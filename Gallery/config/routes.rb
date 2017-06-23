Rails.application.routes.draw do
  get 'photos/show'

  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :show, :destroy]
    resources :users, only: [:index]
    resource :session, only: [:create, :destroy, :show]
    
    resources :photos
  end
end
