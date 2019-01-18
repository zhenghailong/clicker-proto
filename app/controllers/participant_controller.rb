class ParticipantController < ApplicationController
  def index
    cookies[:user_id] = session.id
    @participant_id = session.id
  end

  def show
    @participant_id = session.id
  end

  def join
    @clicker_id = params[:clicker_id]
    @clicker_type = Redis.current.get("#{@clicker_id}_type")
    return render plain: '指定したIDはありません!' unless Redis.current.get(@clicker_id)

    join_channel = "clicker:#{@clicker_id}:J"

    data = { session_id: session.id }
    ActionCable.server.broadcast join_channel, data

    @participant_id = session.id

    render :show
  end

  def four
    clicker_id = params[:clicker_id]
    result_channel = "clicker:#{clicker_id}:R"

    anwser = { a: 0, b: 0, c: 0, d: 0 }
    anwser[params[:anwser].to_sym] = 1

    data = {clicker_id: clicker_id, clicker_type: 1, anwser: anwser}
    ActionCable.server.broadcast result_channel, data
  end

  def tow
    clicker_id = params[:clicker_id]
    result_channel = "clicker:#{clicker_id}:R"

    anwser = { a: 0, b: 0 }
    anwser[params[:anwser].to_sym] = 1

    data = {clicker_id: clicker_id, clicker_type: 2, anwser: anwser}
    ActionCable.server.broadcast result_channel, data
  end
end
