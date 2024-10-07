module Mutations
    class CreateBiography < BaseMutation
      argument :patient_id, ID, required: true
      argument :content, String, required: true
  
      field :biography, Types::BiographyType, null: true
      field :errors, [String], null: false
  
      def resolve(patient_id:, content:)
        patient = Patient.find(patient_id)
        biography = patient.create_biography(content: content)
  
        if biography.persisted?
          {
            biography: biography,
            errors: []
          }
        else
          {
            biography: nil,
            errors: biography.errors.full_messages
          }
        end
      end
    end
  end