export interface SuccessResponse<T = unknown> {
  status?: boolean;
  message: string;
  data?: T;
}
