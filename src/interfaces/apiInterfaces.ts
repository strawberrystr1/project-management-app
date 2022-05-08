export interface IAPIError {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}
