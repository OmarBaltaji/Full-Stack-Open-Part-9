import { parseArguments, logErrorMessage } from "./utils";

type rating  = 1 | 2 | 3;

interface exercisesResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: rating,
  ratingDescription: string,
  target: number,
  average: number,
};

const calculateExercises = (hoursPerDay: number[], target: number): exercisesResult => {
  const periodLength: number = hoursPerDay.length;
  const trainingDays: number = hoursPerDay.filter((hours: number) => hours != 0).length;
  const average = hoursPerDay.reduce((a, b) => a + b, 0) / periodLength;
  
  let rating: rating;
  let ratingDescription: string;
  const roundedAverage: number = Math.round(average);
  let success: boolean = roundedAverage >= target;
  
  if (roundedAverage < target) {
    rating = 1;
    ratingDescription = 'You need to exercise more!';
  } else if (roundedAverage == target) {
    rating = 2;
    ratingDescription = 'Not too bad but could do better';
  } else {
    rating = 3;
    ratingDescription = 'Great effort!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

try {
  const values = parseArguments(process.argv);
  const target = values[0];
  const hoursPerDay = values.slice(1);
  console.log(calculateExercises(hoursPerDay, target));
} catch (error: unknown) {
  logErrorMessage(error);
}

export default calculateExercises;