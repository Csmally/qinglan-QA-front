import routers from "@/routers";
import { MenuProps } from "antd";
import { Routes, Route } from "react-router-dom";

// 设置菜单路由
const getMenus = (fetchRouters: RouterItemType[]): MenuProps["items"] => {
  const menuArr: MenuProps["items"] = [];
  fetchRouters.forEach((menuItem) => {
    if (menuItem.isMenu) {
      menuArr.push({
        key: menuItem.key,
        label: menuItem.label,
        icon: menuItem.icon,
      });
    }
  });
  return menuArr;
};

// 设置每个router的是否带参数路由
const getRouterPath = (router: RouterItemType): string => {
  let paramsPath = router.key;
  if (router.params) {
    router.params.forEach((param) => {
      paramsPath += `/:${param}`;
    });
  }
  return paramsPath;
};
// 设置路由组件
const getRouters = () => {
  return (
    <Routes>
      {routers.map((router, index) => (
        <Route
          path={getRouterPath(router)}
          element={router.component}
          key={index}
        />
      ))}
    </Routes>
  );
};

export { getMenus, getRouters };
