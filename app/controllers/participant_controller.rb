class ParticipantController < ApplicationController
  def index
    @participant_id = session.id
  end

  def show
    @participant_id = session.id
  end

  def join
    @clicker_id = params[:clicker_id]
    @clicker_type = Redis.current.get("#{@clicker_id}_type")
    return render plain: '指定したIDはありません!' unless Redis.current.get(@clicker_id)
    render :show
  end

  def four
    clicker_id = params[:clicker_id]
    channel_id = "clicker:#{clicker_id}:R"

    data = {clicker_type: '4択投票'}
    ActionCable.server.broadcast channel_id, data
  end

  def tow
    clicker_id = params[:clicker_id]
    channel_id = "clicker:#{clicker_id}:R"

    data = {clicker_type: '2択投票'}
    ActionCable.server.broadcast channel_id, data
  end
end
