puts "Seeding patients from Argentina..."

patients = [
  {
    full_name: "Juan Pérez",
    dni: "28456789",
    phone: "+54 11 4123-4567",
    address: "Av. Corrientes 1234, 5B",
    email: "juan.perez@gmail.com",
    gender: "male",
    city: "Buenos Aires",
    country: "Argentina"
  },
  {
    full_name: "María González",
    dni: "30987654",
    phone: "+54 351 567-8901",
    address: "Calle San Martín 567",
    email: "maria.gonzalez@hotmail.com",
    gender: "female",
    city: "Córdoba",
    country: "Argentina"
  },
  {
    full_name: "Carlos Rodríguez",
    dni: "25678901",
    phone: "+54 341 234-5678",
    address: "Bv. Oroño 789",
    email: "carlos.rodriguez@yahoo.com",
    gender: "male",
    city: "Rosario",
    country: "Argentina"
  },
  {
    full_name: "Laura Fernández",
    dni: "33456789",
    phone: "+54 261 890-1234",
    address: "Av. San Martín 1010",
    email: "laura.fernandez@gmail.com",
    gender: "female",
    city: "Mendoza",
    country: "Argentina"
  },
  {
    full_name: "Martín López",
    dni: "27890123",
    phone: "+54 381 345-6789",
    address: "Calle 25 de Mayo 222",
    email: "martin.lopez@hotmail.com",
    gender: "male",
    city: "San Miguel de Tucumán",
    country: "Argentina"
  },
  {
    full_name: "Ana Martínez",
    dni: "31234567",
    phone: "+54 223 678-9012",
    address: "Av. Luro 3456",
    email: "ana.martinez@yahoo.com",
    gender: "female",
    city: "Mar del Plata",
    country: "Argentina"
  },
  {
    full_name: "Diego Sánchez",
    dni: "26789012",
    phone: "+54 387 901-2345",
    address: "Calle Alberdi 789",
    email: "diego.sanchez@gmail.com",
    gender: "male",
    city: "Salta",
    country: "Argentina"
  },
  {
    full_name: "Lucía Romero",
    dni: "32345678",
    phone: "+54 342 456-7890",
    address: "Bv. Pellegrini 1234",
    email: "lucia.romero@hotmail.com",
    gender: "female",
    city: "Santa Fe",
    country: "Argentina"
  }
]

patients.each do |patient_data|
  first_name, last_name = patient_data[:full_name].split(" ", 2) # Split the full_name into first and last names
  patient = Patient.find_or_create_by!(dni: patient_data[:dni]) do |p|
    p.assign_attributes(
      first_name: first_name,
      last_name: last_name,
      dni: patient_data[:dni],
      phone: patient_data[:phone],
      address: patient_data[:address],
      email: patient_data[:email],
      gender: patient_data[:gender],
      city: patient_data[:city],
      country: patient_data[:country]
    )
  end
  puts "#{patient.persisted? ? 'Found' : 'Created'} patient: #{patient.first_name} #{patient.last_name} from #{patient.city}"
end

puts "Seed data creation completed!"
