# frozen_string_literal: true

module Types
  class PatientType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :dni, String
    field :phone, String
    field :address, String
    field :email, String
    field :gender, String
    field :city, String
    field :country, String
  end
end
