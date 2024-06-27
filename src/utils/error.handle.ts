import { Response } from "express";

const handleHttp = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw);
  if (res && typeof res.status === 'function') {
    res.status(400).send({ error });
  } else {
    console.error('res is not a valid response object:', res);
  }
};

export { handleHttp };
