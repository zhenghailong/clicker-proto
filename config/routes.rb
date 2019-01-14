Rails.application.routes.draw do
  root to: 'top#show'
  post '/top', to: 'top#create'
  post '/join', to: 'participant#join'
  post '/four', to: 'participant#four'
  post '/tow', to: 'participant#tow'

  get 'top/show'
  get 'participant/show'
  get 'participant/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
