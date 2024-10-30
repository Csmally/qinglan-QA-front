import usePathStore from "@/store/pathStore";
import { getMenus } from "@/utils/getMenuRouters";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SiderMenu: React.FC = () => {
  const { pathData } = usePathStore();
  const menus = getMenus(pathData);
  const navigate = useNavigate();
  const navigatePageHandler = (e: any) => {
    navigate(`/${e.key}`, { replace: true });
  };
  return (
    <Sider width={200}>
      <Menu
        defaultSelectedKeys={["home"]}
        mode="vertical"
        style={{ borderRight: 0, height: "100%" }}
        items={menus}
        theme="dark"
        onClick={navigatePageHandler}
      />
    </Sider>
  );
};

export default SiderMenu;
