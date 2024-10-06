# app/graphql/types/mutation_type.rb
module Types
  class MutationType < Types::BaseObject
    field :create_patient, mutation: Mutations::CreatePatient
    # Add other mutations here
  end
end