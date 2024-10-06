module Mutations
    class CreatePatient < BaseMutation
      # Define the arguments (input fields) for creating a patient
      argument :first_name, String, required: true
      argument :last_name, String, required: true
      argument :age, Integer, required: false
      argument :dni, String, required: false # Add the dni field
      argument :phone, String, required: false # Add the phone field
      argument :address, String, required: false # Add the address field
      argument :email, String, required: false # Add the email field
      argument :gender, String, required: false # Add the gender field
      argument :city, String, required: false # Add the city field
      argument :country, String, required: false # Add the country field
  
      # Define the return type
      type Types::PatientType
  
      # The resolve method that gets called when the mutation is executed
      def resolve(first_name:, last_name:, age: nil, dni: nil, phone: nil, address: nil, email: nil, gender: nil, city: nil, country: nil)
        Patient.create!(
          first_name: first_name,
          last_name: last_name,
          age: age,
          dni: dni,
          phone: phone,
          address: address,
          email: email,
          gender: gender,
          city: city,
          country: country
        )
      end
    end
  end
  