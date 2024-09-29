require "test_helper"

class Api::V1::EntriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_entries_index_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_entries_show_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_entries_create_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_entries_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_entries_destroy_url
    assert_response :success
  end
end
