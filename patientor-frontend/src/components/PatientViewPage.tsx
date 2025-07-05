import { useParams } from 'react-router-dom';
import { Diagnosis, type Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useEffect, useState } from 'react';
import patients from '../services/patients';
import diagnosisCodesService from '../services/diagnosisCodes';

const PatientViewPage = () => {
  const params = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (params.id) {
      patients.get(params.id).then(data => setPatient(data));
      diagnosisCodesService.getAll().then(data => setDiagnosisCodes(data));
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

  const getDiagnosisDescription = (diagnoseCode: string) => {
    return diagnosisCodes.find(dc => dc.code === diagnoseCode)?.name;
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
        <h3>Entries</h3>
        {patient?.entries?.map(entry => 
          <div key={entry.id}>
            <div>{entry.date}, {entry.description}</div>
            <ul>
              {entry.diagnosisCodes.map(diagnoseCode => 
                <li key={diagnoseCode}>{diagnoseCode} {getDiagnosisDescription(diagnoseCode)}</li>)
              }
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <h1>No available patient</h1>
  );
};

export default PatientViewPage;