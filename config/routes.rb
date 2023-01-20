Rails.application.routes.draw do
  get 'games/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post 'world', to: 'worlds#create'
  # Defines the root path route ("/")
  root "games#index"
end
