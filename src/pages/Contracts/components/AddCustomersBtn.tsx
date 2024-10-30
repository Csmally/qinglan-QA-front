import { memo } from "react";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const AddCustomersBtn: React.FC = () => {
  return <div style={containerStyle}></div>;
};

export default memo(AddCustomersBtn);
