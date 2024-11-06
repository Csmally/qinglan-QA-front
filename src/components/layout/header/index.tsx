import { Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "./index.module.css";
import useUserInfoStore from "@/store/userInfoStore";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
  const { userInfo } = useUserInfoStore();
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
      <div className={style.userInfoBox}>
        <Avatar icon={<UserOutlined />} />
        <div>{userInfo.name || userInfo.account}</div>
      </div>
    </Header>
  );
};

export default LayoutHeader;
