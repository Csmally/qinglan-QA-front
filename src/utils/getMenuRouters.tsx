import { FetchRouterItemType } from "@/common/types/commonTypes";
import HomePage from "@/pages/Home";
import TemplateSetUpPage from "@/pages/TemplateSetUp";
import routers from "@/routers";
import { MenuProps } from "antd";
import React from "react";
import { Routes, Route } from "react-router-dom";

interface RouterMapDataItemType {
  path: string;
  component: React.ReactNode;
}

// 设置菜单路由
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

// 设置路由数据
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

// 设置路由组件
const getRouters = (fetchRouters: FetchRouterItemType[]) => {
  const routersMapDatas = getRoutersMap(fetchRouters);
  return (
    <Routes>
      <Route path="/" element={<TemplateSetUpPage />} />
      {routersMapDatas.map((item, index) => (
        <Route path={item.path} element={item.component} key={index} />
      ))}
    </Routes>
  );
};

export { getMenus, getRouters };
