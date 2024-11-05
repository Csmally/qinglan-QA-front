import { SingleCustomerType } from "@/types/fetchResponse";
import { memo } from "react";
import SingleCustomer from "./SingleCustomer";

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

const Customers: React.FC<CustomersPropsType> = (props) => {
  const { customerList } = props;
  return (
    <div style={containerStyle}>
      {customerList.map((customer) => (
        <SingleCustomer key={customer.id} customer={customer} />
      ))}
    </div>
  );
};

export default memo(Customers);
