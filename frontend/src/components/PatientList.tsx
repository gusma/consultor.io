"use client";

import React, { useState, useEffect } from "react";

interface Patient {
  id: number;
  name: string;
  // Add other patient properties as needed
}

const PatientList: React.FunctionComponent<{}> = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
        try {
          const res = await fetch("/api/v1/patients");
      
          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
      
          const data = await res.json();
          setPatients(data);
        } catch (error) {
          console.error("Error in API /api/v1/patients:", error);
          setError("Failed to load patients");
        } finally {
          setLoading(false);
        }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Patient List</h1>
      {patients.length > 0 ? (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>{patient.name}</li>
          ))}
        </ul>
      ) : (
        <div>No patients found</div>
      )}
    </div>
  );
};

export default PatientList;
