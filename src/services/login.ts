import request from "@/utils/request";

interface FetchLoginParamsType {
  account: string;
  password: string;
  from: string;
}

interface LoginResDataType {
  token: string;
  name: string;
  mobile: string;
  sex: string;
  age: number;
}

const fetchLogin = (
  params: FetchLoginParamsType
): Promise<ResDataType<LoginResDataType>> => {
  return request.post("login", params);
};

export { fetchLogin };
