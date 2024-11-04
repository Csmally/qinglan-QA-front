import { SingleTemplateType } from "@/types/fetchResponse";
import request from "@/utils/request";

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

const fetchTemplateListByKeyWord = (params: {
  keyWord: string;
}): Promise<ResDataType<TemplateListResDataType>> => {
  return request.get("template/search/keyword", { params });
};

const fetchTemplateById = (params: {
  id: string;
}): Promise<ResDataType<TemplateListResDataType>> => {
  return request.get("template/search/id", { params });
};

export {
  fetchTemplateList,
  fetchAddTemplate,
  fetchTemplateListByKeyWord,
  fetchTemplateById,
};
