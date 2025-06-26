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

export type NewPatient = Omit<Patient, 'id'>;

export interface Entry {
}