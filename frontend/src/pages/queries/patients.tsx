// pages/queries/patients.tsx
import { gql, useQuery } from '@apollo/client';
import React from 'react';

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
        <p key={patient.id}>{patient.name}</p>
      ))}
    </div>
  );
};

export default PatientsPage;