import request from "@/utils/request";

interface FetchChangePasswordParamType {
  password: string;
  id: number;
}

const fetchChangePassword = (
  params: FetchChangePasswordParamType
): Promise<ResDataType<any>> => {
  return request.post("user/changePassword", params);
};

export { fetchChangePassword };
