import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import PatientForm from "@/components/PatientForm";
import Link from "next/link";

const GET_ALL_PATIENTS = gql`
  query GetAllPatients {
    patients {
      id
      firstName
      lastName
      email
      address
      city
      country
    }
  }
`;

const GET_PATIENTS_BY_LAST_NAME_LETTER = gql`
  query GetPatientsByLastNameLetter(
    $letter: String!
    $limit: Int
    $offset: Int
  ) {
    patientsByLastNameLetter(letter: $letter, limit: $limit, offset: $offset) {
      id
      firstName
      lastName
      email
      address
      city
      country
    }
  }
`;

const PatientsPage = () => {
  const [letter, setLetter] = useState<string | null>(null); // Initially null to fetch all
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { loading, error, data, refetch } = useQuery(
    letter ? GET_PATIENTS_BY_LAST_NAME_LETTER : GET_ALL_PATIENTS,
    {
      variables: letter ? { letter, limit, offset } : undefined,
    }
  );

  const handleLetterClick = (selectedLetter: string) => {
    setLetter(selectedLetter);
    setOffset(0); // Reset offset when changing the letter
  };

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePreviousPage = () => {
    setOffset(Math.max(0, offset - limit));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Determine the patients to display based on the selected letter
  const patients = letter ? data.patientsByLastNameLetter : data.patients;

  // Create an array of letters A-Z
  const alphabet = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Filter by Last Name Starting With:
        </h2>
        <div className="flex space-x-2">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className="px-2 py-1 border rounded hover:bg-gray-200"
            >
              {letter}
            </button>
          ))}
          <button
            onClick={() => handleLetterClick(null)} // Reset filter
            className="px-2 py-1 border rounded hover:bg-gray-200"
          >
            All
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Patient List</h2>
        {patients.length > 0 ? (
          <ul>
            {patients.map((patient) => (
              <li key={patient.id} className="mb-2">
                <Link href={`/patients/${patient.id}`}>
                  <span className="text-blue-500 hover:underline">
                    {patient.firstName} {patient.lastName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No patients found.</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={offset === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={patients.length < limit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Add New Patient</h2>
        <PatientForm onPatientAdded={() => refetch()} />
      </div>
    </div>
  );
};

export default PatientsPage;
