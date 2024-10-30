import { SingleCustomerType } from "@/types/fetchResponse";
import request from "@/utils/request";

interface FetchCustomerListParamsType {
  page: number;
  pageSize: number;
}

interface CustomerListResDataType {
  total: number;
  customerList: SingleCustomerType[] | null;
}

const fetchCustomerList = (
  params: FetchCustomerListParamsType
): Promise<ResDataType<CustomerListResDataType>> => {
  return request.post("customer/search", params);
};

const fetchAddCustomer = (params: {
  customerList: SingleCustomerType;
}): Promise<ResDataType<any>> => {
  return request.post("customer/add", params);
};

export { fetchCustomerList, fetchAddCustomer };
