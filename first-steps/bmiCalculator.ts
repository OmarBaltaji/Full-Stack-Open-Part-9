import { parseArguments, logErrorMessage } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters: number = height / 100;
  const bmi: number = weight / (heightInMeters**2);
  console.log(bmi);

  switch (true) {
    case bmi < 16.0:
      return 'Underweight (Severe thinness) ';
    case bmi >= 16.0 && bmi <= 16.9:
      return 'Underweight (Moderate thinness)';
    case bmi >= 17.0 && bmi <= 18.4:
      return 'Underweight (Mild thinness)';
    case bmi >= 18.5 && bmi <= 24.9:
      return 'Normal (healthy weight)';
    case bmi >= 25.0 && bmi <= 29.9:
      return 'Overweight (Pre-obese)';
    case bmi >= 30.0 && bmi <= 34.9:    
      return 'Obese (Class I)';
    case bmi >= 35.0 && bmi <= 39.9:
      return 'Obese (Class II)';
    case bmi >= 40.0:    
      return 'Obese (Class III)';
    default:
      return 'Not a valid bmi';
  }
}


try {
  const [value1, value2] = parseArguments(process.argv);
  console.log(value1, value2)
  let height: number;
  let weight: number;
  if (value1 > value2) {
    height = value1;
    weight = value2;
  } else {
    height = value2;
    weight = value1;
  }
  
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  logErrorMessage(error);
}
