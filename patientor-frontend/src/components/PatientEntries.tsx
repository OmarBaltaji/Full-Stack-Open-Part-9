import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../types";
import diagnosisCodesService from '../services/diagnosisCodes';
import EntryCard from "./PatientEntries/EntryCard";
import { Button } from "@mui/material";


interface PatientEntriesProps {
  entries: Entry[]
}

const PatientEntries = ({ entries }: PatientEntriesProps) => {
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosisCodesService.getAll().then(data => setDiagnosisCodes(data));
  }, []);

  if (entries) {
    return (
      <div>
        <h3>Entries</h3>
        <div>
          {entries?.map(entry => <EntryCard key={entry.id} entry={entry} diagnosisCodes={diagnosisCodes} />)}
        </div>
        <Button sx={{ mt: 2 }} variant="contained">ADD NEW ENTRY</Button>
      </div>
    );
  }
};

export default PatientEntries;