# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :patients,
    [Types::PatientType],
    null: false,
    description: "Returns a list of patients in the database"

    def patients
      Patient.all
    end

    field :patient, Types::PatientType, null: true do
      description "Find a patient by ID or name"
      argument :id, ID, required: false
      argument :name, String, required: false
    end

    def patient(id: nil, name: nil)
      if id
        Patient.find_by(id: id)
      elsif name
        Patient.find_by(name: name)
      else
        nil
      end
    end
  end
end
