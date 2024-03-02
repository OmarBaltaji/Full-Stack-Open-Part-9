import express from 'express';
import calculateBmi from '../first-steps/bmiCalculator';
import calculateExercises from '../first-steps/exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight} = req.query;

  if(isNaN(Number(height)) || isNaN(Number(weight)) || !height || !weight) {
    res.status(400).end('Malformatted  parameters');
  }

  const result = calculateBmi(Number(height), Number(weight));
  res.json({  weight, height, result });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({error: "parameters missing"});
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isNaN(Number(target)) || (!Array.isArray(daily_exercises) || (Array.isArray(daily_exercises) && !daily_exercises.every((day: any) => typeof day === 'number')))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const hoursPerDay = daily_exercises as number[];

  const result = calculateExercises(hoursPerDay, Number(target));

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});