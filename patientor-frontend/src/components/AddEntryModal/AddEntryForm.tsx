import { TextField, Button, Grid } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues } from "../../types";

interface AddEntryFormProps {
  handleSubmit: (values: EntryFormValues) => Promise<void>;
  handleClose: () => void;
}

// interface HealthCheckRatingOption{
//   value: HealthCheckRating;
//   label: string;
// }

// const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating)
//   .filter((v) => typeof v === "number")
//   .map((v) => ({ 
//     value: v, label: HealthCheckRating[v as HealthCheckRating] 
//   }));

const AddEntryForm = ({ handleSubmit, handleClose }: AddEntryFormProps) => {
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>();

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    handleSubmit({
      date,
      specialist,
      description,
      diagnosisCodes: [diagnosisCodes],
      healthCheckRating,
      type: "HealthCheck",
    });
  };

  return (
    <form onSubmit={addEntry}>
      <TextField 
        margin="dense" 
        label="Date" 
        fullWidth 
        value={date} 
        onChange={({ target }) => setDate(target.value)} 
      />
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
      <TextField 
        margin="dense" 
        label="Diagnosis Codes" 
        fullWidth 
        value={diagnosisCodes} 
        onChange={({ target }) => setDiagnosisCodes(target.value)} 
      />
      <TextField 
        margin="dense" 
        label="Health Check Rating" 
        type="number"
        fullWidth 
        value={healthCheckRating} 
        onChange={({ target }) => setHealthCheckRating(Number(target.value))} 
      />

      {/* <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
      <Select
        label="Health Check Rating"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(target.value)}
      >
      {healthCheckRatingOptions.map(option =>
        <MenuItem
          key={option.label}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      )}
      </Select> */}
      <Grid sx={{ justifyContent: 'space-between', display: 'flex' }}>
        <Button sx={{ my: 3 }} variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
        <Button type="submit" sx={{ my: 3 }} variant="contained">Submit</Button>
      </Grid>
    </form>
  );
};

export default AddEntryForm;