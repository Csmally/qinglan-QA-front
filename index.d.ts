// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum GlobalValue {
  UNKNOWN_VALUE = unknown,
}

interface ResDataType<T> {
  success: boolean;
  code: number;
  data: T;
  message: string;
}
