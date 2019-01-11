class TopController < ApplicationController
  def show
    @clicker_id = 4.times.map { SecureRandom.random_number(10) }.join
    Redis.current.set(@clicker_id, 1)
  end

  def create
    clicker_id = params[:clicker_id]
    clicker_type = params[:clicker_type]
    channel_id = "clicker:#{clicker_id}"

    # 途中参加の場合は、このタイプの回答画面を出す
    Redis.current.set("#{clicker_id}_type", clicker_type)

    data = {
      action: 'start',
      clicker_id: params[:clicker_id],
      clicker_type: params[:clicker_type]
    }

    ActionCable.server.broadcast channel_id, data
  end
end
