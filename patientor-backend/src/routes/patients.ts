import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';
import { NewEntry, NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(422).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId: string = req.params.id;
    const entry: NewEntry = toNewEntry(req.body);
    res.json(patientService.addEntry(patientId, entry));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(422).send(errorMessage);
  }
});

export default router;