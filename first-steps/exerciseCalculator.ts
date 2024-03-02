type rating  = 1 | 2 | 3;

interface functionResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: rating,
  ratingDescription: string,
  target: number,
  average: number,
};

const calculateExercises = (hoursPerDay: number[], target: number) => {
  const periodLength: number = hoursPerDay.length;
  const trainingDays: number = hoursPerDay.filter((hours: number) => hours != 0).length;
  const average = hoursPerDay.reduce((a, b) => a + b, 0) / periodLength;
  
  let rating: rating;
  let ratingDescription: string;
  let success: boolean;
  const roundedAverage: number = Math.round(average);
  
  if (roundedAverage < target) {
    rating = 1;
    ratingDescription = 'You need to exercise more!';
    success = false;
  } else if (roundedAverage == target) {
    rating = 2;
    ratingDescription = 'Not too bad but could do better';
    success = true;
  } else if (roundedAverage > target) {
    rating = 3;
    ratingDescription = 'Great effort!';
    success = true;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([1, 0, 2, 1.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 1, 2, 4.5, 1, 3, 3], 2));