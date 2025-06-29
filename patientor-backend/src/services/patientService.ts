import { NonSensitivePatient, Patient, NewPatient } from "../types";
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

export default {
  getAll,
  addPatient,
  getPatient
};