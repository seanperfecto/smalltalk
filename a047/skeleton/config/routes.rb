Links::Application.routes.draw do

  resources :users
  resources :links
  resource :session
  resources :comments
end
