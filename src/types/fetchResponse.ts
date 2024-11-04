interface SingleTemplateType {
  id: string;
  name: string;
  desc: string;
}

interface SingleCustomerType {
  id?: string;
  name: string;
  desc: string;
  templateId?: string;
}

interface SingleClassType {
  id?: string;
  grade: string;
  gradeText: string;
  class: string;
  classText: string;
  customerId?: string;
}

export { SingleTemplateType, SingleCustomerType, SingleClassType };
