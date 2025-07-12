export interface ApiError {
  statusCode: number;
  message: string;
  details?: any;
}