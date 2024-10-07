import React, { useState } from "react";
import graphqlRequest from "../graphqlClient"; // Adjust this path if necessary

type PatientInput = {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  address: string;
  email: string;
  gender: string;
  city: string;
  country: string;
};

type CreatePatientResponse = {
  createPatient: {
    id: string;
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    gender: string;
  };
};

const CREATE_PATIENT = `
    mutation CreatePatient($input: CreatePatientInput!) {
        createPatient(input: $input) {
        id
        firstName
        lastName
        age
        dni
        phone
        address
        email
        gender
        city
        country
        }
    }
`;

interface PatientFormProps {
  onPatientAdded: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onPatientAdded }) => {
  const [formState, setFormState] = useState<PatientInput>({
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
    address: "",
    email: "",
    gender: "",
    city: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Submitting form with data:", formState);
      const response = await graphqlRequest<CreatePatientResponse>(
        CREATE_PATIENT,
        { input: formState }
      );
      console.log("Server response:", response);
      setFormState({
        firstName: "",
        lastName: "",
        dni: "",
        phone: "",
        address: "",
        email: "",
        gender: "",
        city: "",
        country: "",
      });
      onPatientAdded();
    } catch (e) {
      if (e instanceof Error) {
        console.error("Detailed error:", e.message);
        setError(`Error creating patient: ${e.message}`);
      } else {
        console.error("An unknown error occurred:", e);
        setError("An unknown error occurred while creating the patient");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="firstName" // Change from "First name" to "firstName"
        value={formState.firstName}
        onChange={handleChange}
        placeholder="First name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="lastName" // Change from "Last name" to "lastName"
        value={formState.lastName}
        onChange={handleChange}
        placeholder="Last name"
        required
        className="w-full p-2 border rounded"
      />

      <input
        name="dni"
        value={formState.dni}
        onChange={handleChange}
        placeholder="DNI"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="phone"
        value={formState.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full p-2 border rounded"
      />
      <input
        name="address"
        value={formState.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="Email"
        required
        type="email"
        className="w-full p-2 border rounded"
      />
      <select
        name="gender"
        value={formState.gender}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        name="city"
        value={formState.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full p-2 border rounded"
      />
      <input
        name="country"
        value={formState.country}
        onChange={handleChange}
        placeholder="Country"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? "Creating..." : "Create Patient"}
      </button>

      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default PatientForm;
