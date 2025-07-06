import axios from "axios";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const handleError = (e: unknown, setError: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  if (axios.isAxiosError(e)) {
    if (e?.response?.data && typeof e?.response?.data === "string") {
      const message = e.response.data.replace('Something went wrong. Error: ', '');
      console.error(message);
      setError(message);
    } else {
      setError("Unrecognized axios error");
    }
  } else {
    console.error("Unknown error", e);
    setError("Unknown error");
  }
};