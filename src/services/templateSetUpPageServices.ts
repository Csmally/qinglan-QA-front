import { TemplateListResDataType } from "@/types/fetchResponse";
import request from "@/utils/request";

/**
 * 添加模版
 */
interface FetchTemplateListParamsType {
  page: number;
  pageSize: number;
}

const fetchTemplateList = (
  params: FetchTemplateListParamsType
): Promise<ResDataType<TemplateListResDataType>> => {
  return request.post("template/list", params);
};

const fetchAddTemplate = (params: {
  templateList: any[];
}): Promise<ResDataType<TemplateListResDataType>> => {
  return request.post("template/add", params);
};

export { fetchTemplateList, fetchAddTemplate };
