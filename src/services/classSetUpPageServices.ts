import { SingleClassType } from "@/types/fetchResponse";
import request from "@/utils/request";

interface FetchClassListParamsType {
  page: number;
  pageSize: number;
  customerId?: string;
}

interface ClassListResDataType {
  total: number;
  list: SingleClassType[] | null;
}

interface FetchAnswerParamsType {
  classId: number;
}

const fetchClassList = (
  params: FetchClassListParamsType
): Promise<ResDataType<ClassListResDataType>> => {
  return request.post("class/search", params);
};

const fetchAddClass = (params: {
  classInfo: SingleClassType;
}): Promise<ResDataType<any>> => {
  return request.post("class/add", params);
};

const fetchAnswersByClass = (
  params: FetchAnswerParamsType
): Promise<ResDataType<any>> => {
  return request.post("answer/searchByClass", params);
};

export { fetchClassList, fetchAddClass, fetchAnswersByClass };
