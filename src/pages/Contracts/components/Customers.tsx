import { SingleCustomerType } from "@/types/fetchResponse";
import { memo } from "react";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

interface CustomersPropsType {
  customerList: SingleCustomerType[];
}

const Customers: React.FC<CustomersPropsType> = () => {
  return <div style={containerStyle}></div>;
};

export default memo(Customers);
