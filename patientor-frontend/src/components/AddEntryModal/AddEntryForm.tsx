import { TextField, Button, Grid, MenuItem, Select, InputLabel } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, Discharge, EntryFormValues, EntryType, HealthCheckRating, NewBaseEntry } from "../../types";

interface AddEntryFormProps {
  handleSubmit: (values: EntryFormValues) => Promise<void>;
  handleClose: () => void;
  diagnosisCodes: Diagnosis[];
}

interface HealthCheckRatingOption{
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating)
  .filter((v) => typeof v === "number")
  .map((v) => ({ 
    value: v, label: HealthCheckRating[v as HealthCheckRating]
  }));

interface EntryTypeOptions {
  value: EntryType; 
  label: string;
}

const EntryTypeOptions: EntryTypeOptions[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
];

const AddEntryForm = ({ handleSubmit, handleClose, diagnosisCodes }: AddEntryFormProps) => {
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [discharge, setDischarge] = useState<Discharge>({
    date: '',
    criteria: ''
  });

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const commonData: NewBaseEntry = {
      date,
      specialist,
      description,
      diagnosisCodes: diagnosisCode,
    };

    let data: EntryFormValues;

    switch (type) {
      case "HealthCheck":
        data = {
          ...commonData,
          healthCheckRating: healthCheckRating ?? 0, 
          type,
        };
        break;
      case "OccupationalHealthcare":
        data = {
          ...commonData,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate
          },
          type,
        };
        break;
      case "Hospital":
        data = {
          ...commonData,
          discharge: {
            date: discharge.date,
            criteria: discharge.criteria
          },
          type,
        };
        break;
      default:
        throw new Error(`Unhandled entry type: ${type}`);
    }

    handleSubmit(data);
  };

  const additionalFields = () => {
    switch (type) { 
      case "HealthCheck":
        return (
          <>
            <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            >
            {healthCheckRatingOptions.map(option =>
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            )}
            </Select>
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField 
              margin="dense" 
              label="Employer Name" 
              fullWidth 
              value={employerName} 
              onChange={({ target }) => setEmployerName(target.value)}
              sx={{ mb: 3 }}
            />
            <TextField margin="dense" label="Sick Leave Start Date" type="date" fullWidth value={sickLeaveStartDate} onChange={({ target }) => setSickLeaveStartDate(target.value)} />
            <TextField margin="dense" label="Sick Leave End Date" type="date" fullWidth value={sickLeaveEndDate} onChange={({ target }) => setSickLeaveEndDate(target.value)} />
          </>
        );
      case "Hospital":
        return (
          <>
            <TextField label="Discharge Date" type="date" fullWidth value={discharge.date} onChange={({ target }) => setDischarge((oldDischarge) => ({ ...oldDischarge, date: target.value }))} />

            <TextField
              margin="dense" 
              label="Discharge Criteria"
              fullWidth
              value={discharge.criteria}
              onChange={({ target }) => setDischarge((oldDischarge) => ({ ...oldDischarge, criteria: target.value }))}
            />
          </>
        );
    }
  };

  return (
    <form onSubmit={addEntry}>
      <Select sx={{ mb: 2 }} value={type} onChange={({ target }) => setType(target.value as EntryType)} fullWidth>
        {EntryTypeOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <TextField margin="dense" label="Date" type="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />

      <TextField 
        margin="dense" 
        label="Specialist" 
        fullWidth 
        value={specialist} 
        onChange={({ target }) => setSpecialist(target.value)} 
      />
      <TextField 
        margin="dense" 
        label="Description" 
        fullWidth 
        value={description} 
        onChange={({ target }) => setDescription(target.value)} 
      />

      <InputLabel style={{ marginTop: 20 }}>Diagnosis Code</InputLabel>
      <Select
        label="Diagnosis Code"
        fullWidth
        multiple
        value={diagnosisCode}
        onChange={({ target }) => setDiagnosisCode(target.value)}
      >
        {diagnosisCodes.map(diagnosis => (
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            {diagnosis.code} - {diagnosis.name}
          </MenuItem>
        ))} 
      </Select>
   
      {additionalFields()}
      
      <Grid sx={{ justifyContent: 'space-between', display: 'flex' }}>
        <Button sx={{ my: 3 }} variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
        <Button type="submit" sx={{ my: 3 }} variant="contained">Submit</Button>
      </Grid>
    </form>
  );
};

export default AddEntryForm;