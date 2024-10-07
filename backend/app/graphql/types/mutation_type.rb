# app/graphql/types/mutation_type.rb
module Types
  class MutationType < Types::BaseObject
    field :create_patient, mutation: Mutations::CreatePatient
    field :create_biography, mutation: Mutations::CreateBiography
    field :update_biography, mutation: Mutations::UpdateBiography
    # Add other mutations here
  end
end