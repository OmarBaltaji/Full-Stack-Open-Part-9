import { Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AdditionalEntryContent from "./AdditionalEntryContent";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface EntryCardProps {
  entry: Entry,
  diagnosisCodes: Diagnosis[]
}

const EntryCard = ({ entry, diagnosisCodes }: EntryCardProps) => {
  const getDiagnosisDescription = (diagnoseCode: string): string | undefined =>
    diagnosisCodes.find(dc => dc.code === diagnoseCode)?.name;

  const entryIcon = (): JSX.Element => {
    switch (entry.type) {
      case "HealthCheck":
        return <MedicalServicesIcon />;
      case "OccupationalHealthcare":
        return <MedicalInformationIcon />;
      case "Hospital":
        return <LocalHospitalIcon />;
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography>{entry.date} {entryIcon()}</Typography>
      </CardContent>
      <CardContent>
        <Typography>{entry.description}</Typography>
      </CardContent>
      <AdditionalEntryContent entry={entry} />
      <CardContent>
        <Typography>Diagnosed by {entry.specialist}</Typography>
      </CardContent>
      {entry.diagnosisCodes &&
        <CardContent>
          <Typography>Diagnosis Codes:</Typography>
          <ul>
            {entry.diagnosisCodes.map(diagnoseCode => 
              <li key={diagnoseCode}>{diagnoseCode} {getDiagnosisDescription(diagnoseCode)}</li>)
            }
          </ul>
        </CardContent>
      }
    </Card>
  );
};

export default EntryCard;