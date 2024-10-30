import { SingleTemplateType } from "@/types/fetchResponse";
import request from "@/utils/request";

/**
 * 添加模版
 */
interface FetchTemplateListParamsType {
  page: number;
  pageSize: number;
}

interface TemplateListResDataType {
  total: number;
  templateList: SingleTemplateType[] | null;
}

const fetchTemplateList = (
  params: FetchTemplateListParamsType
): Promise<ResDataType<TemplateListResDataType>> => {
  return request.post("template/search", params);
};

const fetchAddTemplate = (params: {
  templateList: any[];
}): Promise<ResDataType<any>> => {
  return request.post("template/add", params);
};

export { fetchTemplateList, fetchAddTemplate };
