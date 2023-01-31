Rails.application.routes.draw do
  get 'games/index'
  get 'games/start'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'worlds/:id', to: 'worlds#show'
  post 'worlds/:id', to: 'worlds#move'
  # Defines the root path route ("/")
  root "games#index"
end
