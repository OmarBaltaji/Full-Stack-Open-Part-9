export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Other = 'other',
  Female = 'female'
}

type oneToNine = 1|2|3|4|5|6|7|8|9;
type zeroToNine = 0|1|2|3|4|5|6|7|8|9;

type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`;
type MM = `0${oneToNine}` | `1${0|1|2}`;
type DD = `0${oneToNine}` | `${1|2}${zeroToNine}` | `3${0|1}`;

export type RawDateString = `${YYYY}-${MM}-${DD}`;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: RawDateString;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export interface BaseEntry {
  id: string,
  date: RawDateString,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<Diagnoses['code']>,
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating,
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeave
}

export interface SickLeave {
  startDate: RawDateString,
  endDate: RawDateString,
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: RawDateString,
    criteria: string,
  }
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

// Bad approach
// export type EntryWithoutId = Omit<Entry, 'id'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;