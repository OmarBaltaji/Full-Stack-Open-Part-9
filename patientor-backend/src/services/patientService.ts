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
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient,
};