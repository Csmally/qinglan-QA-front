import {
  BookOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  UserOutlined,
  DashboardOutlined,
  BugOutlined,
} from "@ant-design/icons";
import React from "react";
import TemplateSetUpPage from "@/pages/TemplateSetUp";
import ContractsPage from "@/pages/Contracts";
import SystemSetUpPage from "@/pages/SystemSetUp";
import UserSetUpPage from "@/pages/UserSetUp";
import HomePage from "@/pages/Home";
import TestPage from "@/pages/Test";
import ContractsClassPage from "@/pages/ContractsClass";

const routers: RouterItemType[] = [
  {
    key: "home",
    label: "数据面板",
    isMenu: true,
    icon: <DashboardOutlined />,
    component: <HomePage />,
  },
  {
    key: "templateSetUp",
    label: "模版配置",
    isMenu: true,
    icon: <BookOutlined />,
    component: <TemplateSetUpPage />,
  },
  {
    key: "contracts",
    label: "签约客户",
    isMenu: true,
    icon: <UsergroupAddOutlined />,
    component: <ContractsPage />,
  },
  {
    key: "studentsSetUp",
    label: "学生配置",
    params: ["id"],
    component: <ContractsClassPage />,
  },
  {
    key: "systemSetUp",
    label: "系统设置",
    icon: <SettingOutlined />,
    component: <SystemSetUpPage />,
  },
  {
    key: "userSetUp",
    label: "我的设置",
    isMenu: true,
    icon: <UserOutlined />,
    component: <UserSetUpPage />,
  },
  {
    key: "test",
    label: "测试页面",
    icon: <BugOutlined />,
    component: <TestPage />,
  },
];

export default routers;
