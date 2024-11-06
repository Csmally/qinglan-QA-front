interface ResDataType<T> {
  success: boolean;
  code: number;
  data: T;
  message: string;
}

interface RouterItemType {
  key: string;
  label: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  params?: string[];
  isMenu?: boolean;
  // children?: RouterItemType[];
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}
