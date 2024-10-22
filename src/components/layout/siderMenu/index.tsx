import usePathStore from "@/store/pathStore";
import { getMenus } from "@/utils/getMenuRouters";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const aa = (e: any) => {
    console.log("9898eee", e);
};

const SiderMenu: React.FC = () => {
    const { pathData } = usePathStore();
    const menus = getMenus(pathData);
    return <Sider width={200}>
    <Menu
      mode="vertical"
      style={{ borderRight: 0, height: "100%" }}
      items={menus}
      theme="dark"
      onClick={aa}
    />
  </Sider>
}

export default SiderMenu;