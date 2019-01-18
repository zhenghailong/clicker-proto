module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :cookie_user_id

    def cookie_user_id
      cookies[:user_id]
    end
  end
end
