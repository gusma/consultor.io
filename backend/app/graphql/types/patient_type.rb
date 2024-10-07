# app/graphql/types/patient_type.rb
module Types
  class PatientType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :age, Integer, null: true
    field :dni, String, null: true
    field :phone, String, null: true
    field :address, String, null: true
    field :email, String, null: true
    field :gender, String, null: true
    field :city, String, null: true
    field :country, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :biography, Types::BiographyType, null: true
  end
end