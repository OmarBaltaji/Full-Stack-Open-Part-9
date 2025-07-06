import { NonSensitivePatient, Patient, NewPatient, Entry, NewEntry } from "../types";
import patients from "../../data/patients";
import { v4 as uuid } from 'uuid';

const getAll = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | null => {
  const patient = patients.find(p => p.id === id);
  return patient ? patient : null;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getAll,
  addPatient,
  getPatient,
  addEntry,
};