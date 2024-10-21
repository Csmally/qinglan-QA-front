import { Avatar, Breadcrumb, Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getMenus, getRouters } from "@/utils/getMenuRouters";

const { Header, Content, Sider, Footer } = Layout;

const aa = (e: any) => {
  console.log("9898eee", e);
};

const fetchRouterData = [
  {
    key: "templateSetUp",
    children: [
      {
        key: "contracts",
      },
    ],
  },
  {
    key: "systemSetUp",
  },
  {
    key: "userSetUp",
  },
];

const App: React.FC = () => {
  const menus = getMenus(fetchRouterData);
  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          color: "#ffffff",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <div>此处是清岚logo图片</div>
        <Avatar size={64} icon={<UserOutlined />} />
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="vertical"
            style={{ borderRight: 0, height: "100%" }}
            items={menus}
            theme="dark"
            onClick={aa}
          />
        </Sider>
        <Layout style={{ padding: "0 24px" }}>
          <Breadcrumb
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#ffffff",
              borderRadius: 10,
            }}
          >
            {getRouters(fetchRouterData)}
          </Content>
          <Footer
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            清岚问卷
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
