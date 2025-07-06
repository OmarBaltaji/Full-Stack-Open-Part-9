export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[],
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;


interface BaseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes: Array<Diagnosis['code']>,
}

interface HospitalEntry extends BaseEntry {
  discharge: {
    date: string,
    criteria: string,
  },
  type: "Hospital",
}

interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string,
  },
  type: "OccupationalHealthcare",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating,
  type: "HealthCheck",
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, 'id'>; 