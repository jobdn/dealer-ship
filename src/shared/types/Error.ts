export interface ErrorType {
  message: string[];
  error: string;
  statusCode: number;
}

export const isErrorType = (error: Record<string, any>): error is ErrorType => {
  return typeof error.message !== "undefined" && Array.isArray(error.message);
};
