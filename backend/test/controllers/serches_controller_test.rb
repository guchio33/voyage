require 'test_helper'

class SerchesControllerTest < ActionDispatch::IntegrationTest
  test "should get tag_search" do
    get serches_tag_search_url
    assert_response :success
  end

  test "should get search" do
    get serches_search_url
    assert_response :success
  end

end
