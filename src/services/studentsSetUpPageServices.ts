import request from "@/utils/request";
import { SingleStudentType } from "@/types/fetchResponse";

interface FetchStudentListParamsType {
  page: number;
  pageSize: number;
  classId?: string;
}

interface StudentListResDataType {
  total: number;
  list: SingleStudentType[] | null;
}

const fetchStudentList = (
  params: FetchStudentListParamsType
): Promise<ResDataType<StudentListResDataType>> => {
  return request.post("student/search", params);
};

const fetchAddStudent = (params: {
  student: SingleStudentType;
}): Promise<ResDataType<any>> => {
  return request.post("student/add", params);
};

const fetchAddStudentBatch = (params: {
  students: SingleStudentType[];
}): Promise<ResDataType<any>> => {
  return request.post("student/addBatch", params);
};

export { fetchStudentList, fetchAddStudent, fetchAddStudentBatch };
