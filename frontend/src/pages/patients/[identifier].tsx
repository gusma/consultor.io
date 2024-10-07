import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';

const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      firstName
      lastName
      email
      address
      city
      country
      biography {
        id
        content
      }
    }
  }
`;

const CREATE_BIOGRAPHY = gql`
  mutation CreateBiography($patientId: ID!, $content: String!) {
    createBiography(input: { patientId: $patientId, content: $content }) {
      biography {
        id
        content
      }
      errors
    }
  }
`;

const UPDATE_BIOGRAPHY = gql`
  mutation UpdateBiography($patientId: ID!, $content: String!) {
    updateBiography(input: { patientId: $patientId, content: $content }) {
      biography {
        id
        content
      }
      errors
    }
  }
`;

const PatientPage: React.FC = () => {
  const router = useRouter();
  const { identifier } = router.query;
  const [biographyContent, setBiographyContent] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_PATIENT, {
    variables: {
      id: isNaN(Number(identifier)) ? null : identifier,
      firstName: isNaN(Number(identifier)) ? identifier : null,
      lastName: isNaN(Number(identifier)) ? identifier : null
    },
    skip: !identifier,
  });

  const [createBiography] = useMutation(CREATE_BIOGRAPHY);
  const [updateBiography] = useMutation(UPDATE_BIOGRAPHY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.patient) return <div>Patient not found</div>;

  const { patient } = data;

  const handleBiographySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (patient.biography) {
      await updateBiography({
        variables: { patientId: patient.id, content: biographyContent },
      });
    } else {
      await createBiography({
        variables: { patientId: patient.id, content: biographyContent },
      });
    }
    refetch();
    setBiographyContent('');
  };

  return (
    <div>
      <h1>Patient Details</h1>
      <div>
        <strong>ID:</strong> {patient.id}
      </div>
      <div>
        <strong>First name:</strong> {patient.firstName}
      </div>
      <div>
        <strong>Last name:</strong> {patient.lastName}
      </div>
      <div>
        <strong>Email:</strong> {patient.email}
      </div>
      <div>
        <strong>Address:</strong> {patient.address}
      </div>
      <div>
        <strong>City:</strong> {patient.city}
      </div>
      <div>
        <strong>Country:</strong> {patient.country}
      </div>

      <h2>Biography</h2>
      {patient.biography ? (
        <div>
          <p>{patient.biography.content}</p>
        </div>
      ) : (
        <p>No biography available.</p>
      )}

      <form onSubmit={handleBiographySubmit}>
        <textarea
          value={biographyContent}
          onChange={(e) => setBiographyContent(e.target.value)}
          placeholder={patient.biography ? patient.biography.content : 'Enter biography'}
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">
          {patient.biography ? 'Update Biography' : 'Create Biography'}
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <Link href="/patients">
          Back to Patients List
        </Link>
      </div>
    </div>
  );
};

export default PatientPage;