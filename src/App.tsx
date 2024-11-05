import { Layout } from "antd";
import LayoutHeader from "@/components/layout/header";
import LayoutFooter from "@/components/layout/footer";
import SiderMenu from "@/components/layout/siderMenu";
import MainPageView from "@/components/layout/mainPageView";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import usePathStore from "@/store/pathStore";
import routers from "@/routers";
import LoginPage from "@/pages/Login";

const BusinessPages: React.FC = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <LayoutHeader />
      <Layout>
        <SiderMenu />
        <Layout style={{ padding: "10px 24px 0 24px" }}>
          <MainPageView />
          <LayoutFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { setPathData } = usePathStore();
  // 获取服务端路由配置
  useEffect(() => {
    // 设置后端获取的path配置存入全局store
    setPathData(routers);
    setLoading(false);
  }, [setPathData]);
  return (
    !loading && (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/page/*" element={<BusinessPages />} />
        </Routes>
      </Router>
    )
  );
};

export default App;
