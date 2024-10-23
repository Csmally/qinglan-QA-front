interface ResDataType<T> {
  success: boolean;
  code: number;
  data: T;
  message: string;
}
