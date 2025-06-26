import { useParams } from 'react-router-dom';
import { type Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useEffect, useState } from 'react';
import patients from '../services/patients';

const PatientViewPage = () => {
  const params = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (params.id) {
      patients.get(params.id).then(data => setPatient(data));
    }
  }, []);

  const genderIcon = () => {
    switch(patient?.gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      default:
        return '';
    }
  };

  if (patient) {    
    return (
      <div>
        <h2>{patient.name} &nbsp;<span>{genderIcon()}</span></h2>
        <div>
          <label>Social Security Number:</label> &nbsp;
          <span>{patient.ssn}</span>
        </div>
        <div>
          <label>Occupation:</label> &nbsp;
          <span>{patient.occupation}</span>
        </div>
      </div>
    );
  }

  return (
    <h1>No available patient</h1>
  );
};

export default PatientViewPage;