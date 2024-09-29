import React, { useState, useEffect } from 'react';

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
                const response = await fetch('/api/patients'); // Updated URL
                if (!response.ok) {
                    throw new Error('Failed to fetch patients');
                }
                const data = await response.json();
                setPatients(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching patients');
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    // ... rest of the component remains the same
};

export default PatientList;