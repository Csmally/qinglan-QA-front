interface SingleTemplateType {
  id: string;
  name: string;
  desc: string;
}

interface TemplateListResDataType {
  total: number;
  list: SingleTemplateType[] | null;
}

export { SingleTemplateType, TemplateListResDataType };
