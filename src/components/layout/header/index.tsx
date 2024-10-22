import { Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
    return <Header
    style={{
      display: "flex",
      alignItems: "center",
      color: "#ffffff",
      justifyContent: "space-between",
      padding: 20,
    }}
  >
    <div>清岚logo</div>
    <Avatar size={60} icon={<UserOutlined />} />
  </Header>
}

export default LayoutHeader;