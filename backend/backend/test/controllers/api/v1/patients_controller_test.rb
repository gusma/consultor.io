require "test_helper"

class Api::V1::PatientsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_patients_index_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_patients_show_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_patients_create_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_patients_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_patients_destroy_url
    assert_response :success
  end
end
