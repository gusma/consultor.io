// pages/queries/patients.tsx
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";

const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      name
      # Add other fields you want to retrieve
    }
  }
`;

const PatientsPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PATIENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Patients</h1>
      {data.patients.map((patient: { id: string; name: string }) => (
        <li key={patient.id}>
          <Link href={`/patients/${patient.id}`}>{patient.name}</Link>
        </li>
      ))}
    </div>
  );
};

export default PatientsPage;
