import { getRouters } from "@/utils/getMenuRouters";
import { Layout } from "antd";

const { Content } = Layout;

const MainContainer: React.FC = () => {
  return (
    <Content
      style={{
        padding: 10,
        margin: 0,
        minHeight: 280,
        background: "#ffffff",
        borderRadius: "0 0 10px 10px",
      }}
    >
      {getRouters()}
    </Content>
  );
};

export default MainContainer;
