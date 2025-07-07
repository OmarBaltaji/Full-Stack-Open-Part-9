import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material";
import { Diagnosis, EntryFormValues, Patient } from "../../types";
import AddEntryForm from "./AddEntryForm";
import React from "react";
import { handleError } from "../../utils";
import patients from "../../services/patients";
import { useParams } from "react-router-dom";

interface EntryModalProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
  diagnosisCodes: Diagnosis[],
}

const EntryModal = ({ open, setOpen, setPatient, diagnosisCodes }: EntryModalProps) => {
  const handleClose = (): void => {
    setOpen(false);
    setError(undefined);
  };

  const [error, setError] = React.useState<string | undefined>(undefined);
  const param = useParams();

  const handleSubmit = async (values: EntryFormValues) => {
    try {
      if (param.id) {
        const data = await patients.createEntry(param.id, values);
        setPatient((oldPatient) => oldPatient ? {...oldPatient, entries: oldPatient.entries.concat(data)} : undefined);
        handleClose();
      }
    } catch (e: unknown) {
      handleError(e, setError);
    }
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {error && <Alert severity="error">{error}</Alert>}
        <DialogTitle>Add Entry</DialogTitle>
        <Divider />
        <DialogContent>
          <AddEntryForm handleSubmit={handleSubmit} handleClose={handleClose} diagnosisCodes={diagnosisCodes} />
        </DialogContent>
      </Dialog>
  );
};

export default EntryModal;