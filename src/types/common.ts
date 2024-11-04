enum GlobalValue {
  UNKNOWN_VALUE = "unknown",
}

// toastCode: 1 success, 2 warning, 3 error, 0 无
enum ToastCode {
  NO,
  SUCCESS,
  WARNING,
  ERROR,
}

enum BusinessCode {
  SUCCESS = 0,
  ERROR = -1,
}

export { GlobalValue, ToastCode, BusinessCode };
