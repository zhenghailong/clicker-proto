class ClickerChannel < ApplicationCable::Channel
  def subscribed
    stream_from "clicker:#{params[:clicker_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
