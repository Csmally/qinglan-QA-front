import { SingleCustomerType } from "@/types/fetchResponse";
import { memo } from "react";

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  gap: 30,
};

interface CustomersPropsType {
  customerList: SingleCustomerType[];
}

const Customers: React.FC<CustomersPropsType> = () => {
  return <div style={containerStyle}></div>;
};

export default memo(Customers);
