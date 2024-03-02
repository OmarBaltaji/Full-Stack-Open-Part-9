import express from 'express';
import calculateBmi from '../first-steps/bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});