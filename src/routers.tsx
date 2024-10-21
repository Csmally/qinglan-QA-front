import {
  BookOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import TemplateSetUp from "./pages/TemplateSetUp";
import Contracts from "./pages/Contracts";
import SystemSetUp from "./pages/SystemSetUp";
import UserSetUp from "./pages/UserSetUp";

interface RouterItemType {
  key: string;
  label: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  // children?: RouterItemType[];
}

const routers: RouterItemType[] = [
  {
    key: "templateSetUp",
    label: "模版配置",
    icon: <BookOutlined />,
    component: <TemplateSetUp />,
  },
  {
    key: "contracts",
    label: "签约客户",
    icon: <UsergroupAddOutlined />,
    component: <Contracts />,
  },
  {
    key: "systemSetUp",
    label: "系统设置",
    icon: <SettingOutlined />,
    component: <SystemSetUp />,
  },
  {
    key: "userSetUp",
    label: "我的设置",
    icon: <UserOutlined />,
    component: <UserSetUp />,
  },
];

export default routers;
