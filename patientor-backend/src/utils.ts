import { Gender, NewPatient, RawDateString } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString('name', object.name), 
      dateOfBirth: parseDate(object.dateOfBirth), 
      ssn: parseString('ssn', object.ssn), 
      gender: parseGender(object.gender), 
      occupation: parseString('occupation', object.occupation), 
    };
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseString = (field: string, string: unknown): string => {
  if (!isString(string)) {
    throw new Error('Incorrect or missing ' + field);
  }

  return string;
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const parseDate = (date: unknown): RawDateString => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect data or missing date');
  }

  return date;
};

const isDate = (param: string): param is RawDateString => {
  const dateRegex: RegExp = /^(19|20)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|(1|2)[0-9]|3[0-1])/;
  return dateRegex.test(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect data or missing gender');
  }

  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map((g: string) => g.toString()).includes(param);
};