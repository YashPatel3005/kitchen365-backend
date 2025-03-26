import { SuccessResponse } from 'src/types/success-response';

export const SuccessBuilder = <T>(
  message: string,
  data?: T,
): SuccessResponse => {
  const result: SuccessResponse = {
    status: true,
    message,
  };
  if (data !== undefined) {
    result.data = data;
  }
  return result;
};
