import { Diagnoses, Gender, HealthCheckRating, NewBaseEntry, NewEntry, NewPatient, RawDateString, SickLeave } from "./types";

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

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'specialist' in object && 'description' in object && 'diagnosisCodes' in object && 'type' in object) {
    const baseNewEntry: NewBaseEntry = {
      date: parseDate(object.date),
      specialist: parseString('specialist', object.specialist),
      description: parseString('description', object.description),
      diagnosisCodes: parseDiagnosisCodes(object)
    };

    switch (object.type) {
      case "HealthCheck":
        if (!('healthCheckRating' in object)) {
          throw new Error('Incorrect data: healthCheckRating is missing');
        }

        return {
          ...baseNewEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      case "OccupationalHealthcare":
        if (!('employerName' in object)) {
          throw new Error('Incorrect data: employerName is missing');
        }

        let sickLeave: SickLeave | undefined = undefined;

        // optional sickLeave field
        if ('sickLeave' in object && isObject(object.sickLeave) && 'startDate' in object.sickLeave && 'endDate' in object.sickLeave) {
          sickLeave = {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate),
          };
        }

        return {
          ...baseNewEntry,
          type: "OccupationalHealthcare",
          employerName: parseString('employerName', object.employerName),
          sickLeave: sickLeave,
        };
      case "Hospital":
        if (
          !('discharge' in object) ||
          !isObject(object.discharge) ||
          !('date' in object.discharge) ||
          !('criteria' in object.discharge)
        ) {
          throw new Error('Incorrect data: discharge information is missing or incomplete');
        } 

        return {
          ...baseNewEntry,
          type: "Hospital",
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseString('criteria', object.discharge.criteria),
          }
        };
      default:
        throw new Error(`Unknown entry type: ${object.type}`);
    }
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

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const isObject = (object: unknown): object is object => {
  return typeof object === 'object' && object !== null && !Array.isArray(object);
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnoses['code']> => {
  if (!isObject(object) || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnoses['code']>;
  }
  return object.diagnosisCodes as Array<Diagnoses['code']>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect data or missing health check rating');
  }
  return rating;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};