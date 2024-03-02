export const parseArguments = (args: string[]): number[] => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numberArgs: string[] = args.slice(2);

  if (argumentsNotNaN(numberArgs)) {
    return numberArgs.map((arg: string) => Number(arg));
  } else {
    throw new Error('Provided values were not numbers');
  }
}

export const logErrorMessage = (error: unknown): void => {
  let errorMessage = 'Something went wrong. ';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.error(errorMessage);
}

const argumentsNotNaN = (args: string[]): boolean => {
  return args.every((arg: string) => !isNaN(Number(arg)));
}