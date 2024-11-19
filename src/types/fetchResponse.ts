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

interface SingleStudentType {
  id?: string;
  name: string;
  account: string;
  password: string;
  classId?: string;
  customerId?: string;
  sex: string;
  age: number;
}

interface LoginResDataType {
  id?: string;
  account: string;
  age?: number;
  mobile?: string;
  name?: string;
  password: string;
  sex?: string;
  token: string;
}

export {
  SingleTemplateType,
  SingleCustomerType,
  SingleClassType,
  SingleStudentType,
  LoginResDataType,
};
