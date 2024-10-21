import routers from "@/routers";
import { MenuProps } from "antd";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

interface FetchRouterItemType {
  key: string;
  children?: FetchRouterItemType[];
}

interface RouterMapDataItemType {
  path: string;
  component: React.ReactNode;
}

const getMenus = (fetchRouters: FetchRouterItemType[]): MenuProps["items"] =>
  fetchRouters.map((menuItem) => {
    const singleMenu = routers.find((item) => item.key === menuItem.key)!;
    return {
      key: singleMenu.key,
      label: singleMenu.label,
      icon: singleMenu.icon,
      children: menuItem.children ? getMenus(menuItem.children) : undefined,
    };
  });

const getRoutersMap = (fetchRouters: FetchRouterItemType[]) => {
  const result: RouterMapDataItemType[] = [];
  fetchRouters.forEach((item) => {
    if (item.children) {
      result.push(...getRoutersMap(item.children));
    } else {
      const routeritem = routers.find(
        (routerItem) => routerItem.key === item.key
      )!;
      result.push({
        path: `/${routeritem.key}`,
        component: routeritem.component,
      });
    }
  });
  return result;
};

const getRouters = (fetchRouters: FetchRouterItemType[]) => {
  const routersMapDatas = getRoutersMap(fetchRouters);
  return (
    <Router>
      <Routes>
        {routersMapDatas.map((item, index) => (
          <Route path={item.path} element={item.component} key={index} />
        ))}
      </Routes>
    </Router>
  );
};

export { getMenus, getRouters };
