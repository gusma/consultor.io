module Types
    class BiographyType < Types::BaseObject
      field :id, ID, null: false
      field :content, String
      field :patient_id, ID, null: false
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    end
  end