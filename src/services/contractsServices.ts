import { SingleCustomerType } from "@/types/fetchResponse";
import request from "@/utils/request";

interface FetchCustomerListParamsType {
  page: number;
  pageSize: number;
}

interface CustomerListResDataType {
  total: number;
  list: SingleCustomerType[] | null;
}

const fetchCustomerList = (
  params: FetchCustomerListParamsType
): Promise<ResDataType<CustomerListResDataType>> => {
  return request.post("customer/search", params);
};

const fetchAddCustomer = (params: {
  customer: SingleCustomerType;
}): Promise<ResDataType<any>> => {
  return request.post("customer/add", params);
};

export { fetchCustomerList, fetchAddCustomer };
