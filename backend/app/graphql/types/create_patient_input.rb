# frozen_string_literal: true

module Types
  class CreatePatientInput < Types::BaseInputObject
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :dni, String, required: true
    argument :phone, String, required: false
    argument :address, String, required: false
    argument :email, String, required: true
    argument :gender, String, required: true
    argument :city, String, required: false
    argument :country, String, required: false
  end
end

