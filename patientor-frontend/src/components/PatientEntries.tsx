import React, { useEffect, useState } from "react";
import { Diagnosis, Entry, Patient } from "../types";
import diagnosisCodesService from '../services/diagnosisCodes';
import EntryCard from "./PatientEntries/EntryCard";
import { Button } from "@mui/material";
import AddEntryModal from "./AddEntryModal";

interface PatientEntriesProps {
  entries: Entry[],
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const PatientEntries = ({ entries, setPatient }: PatientEntriesProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosisCodesService.getAll().then(data => setDiagnosisCodes(data));
  }, []);

  if (entries) {
    return (
      <div>
        <AddEntryModal open={openModal} setOpen={setOpenModal} setPatient={setPatient} />
        <h3>Entries</h3>
        <div>
          {entries?.map(entry => <EntryCard key={entry.id} entry={entry} diagnosisCodes={diagnosisCodes} />)}
        </div>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => setOpenModal(true)}>ADD NEW ENTRY</Button>
      </div>
    );
  }
};

export default PatientEntries;