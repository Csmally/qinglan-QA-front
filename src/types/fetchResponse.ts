interface SingleTemplateType {
  id: string;
  templateName: string;
  templateDesc: string;
}

interface TemplateListResDataType {
  total: number;
  list: SingleTemplateType[] | null;
}

export { SingleTemplateType, TemplateListResDataType };
