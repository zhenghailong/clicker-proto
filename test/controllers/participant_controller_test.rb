require 'test_helper'

class ParticipantControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get participant_show_url
    assert_response :success
  end

  test "should get join" do
    get participant_join_url
    assert_response :success
  end

end
