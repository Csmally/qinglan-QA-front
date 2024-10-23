import { TemplateListResDataType } from "@/types/fetchResponse";
import request from "@/utils/request";

/**
 * 获取模版列表
 */
interface FetchTemplateListParamsType {
  page: number;
  count: number;
}

const fetchTemplateList = (
  params: FetchTemplateListParamsType
): Promise<ResDataType<TemplateListResDataType>> => {
  return request.post("template/list", params);
};

export { fetchTemplateList };
