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
end
