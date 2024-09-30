import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

const GET_PATIENT = gql`
  query GetPatient($id: ID, $name: String) {
    patient(id: $id, name: $name) {
      id
      name
      email
      address
      city
      country
    }
  }
`;

const PatientPage: React.FC = () => {
  const router = useRouter();
  const { identifier } = router.query;

  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { 
      id: isNaN(Number(identifier)) ? null : identifier,
      name: isNaN(Number(identifier)) ? identifier : null
    },
    skip: !identifier, // Skip the query if identifier is not available yet
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.patient) return <div>Patient not found</div>;

  const { patient } = data;

  return (
    <div>
      <h1>Patient Details</h1>
      <div>
        <strong>ID:</strong> {patient.id}
      </div>
      <div>
        <strong>Name:</strong> {patient.name}
      </div>
      <div>
        <strong>Email:</strong> {patient.email}
      </div>
      {/* Add more fields here based on your PatientType */}
      {/* For example:
      <div>
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
      </div>
      <div>
        <strong>Gender:</strong> {patient.gender}
      </div>
      <div>
        <strong>Phone Number:</strong> {patient.phoneNumber}
      </div>
      */}
      <div style={{ marginTop: '20px' }}>
        <Link href="/patients">
          Back to Patients List
        </Link>
      </div>
    </div>
  );
};

export default PatientPage;