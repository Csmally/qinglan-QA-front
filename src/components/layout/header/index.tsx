import { Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "./index.module.css";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        color: "#ffffff",
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <div className={style.headerImg} />
      <Avatar size={60} icon={<UserOutlined />} />
    </Header>
  );
};

export default LayoutHeader;
