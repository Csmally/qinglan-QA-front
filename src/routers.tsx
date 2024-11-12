import {
  BookOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  UserOutlined,
  DashboardOutlined,
  BugOutlined,
} from "@ant-design/icons";
import TemplateSetUpPage from "@/pages/TemplateSetUp";
import ContractSetUpPage from "@/pages/ContractSetUp";
import SystemSetUpPage from "@/pages/SystemSetUp";
import UserSetUpPage from "@/pages/UserSetUp";
import HomePage from "@/pages/Home";
import TestPage from "@/pages/Test";
import StudentSetUp from "@/pages/StudentSetUp";
import ClassSetUpPage from "@/pages/ClassSetUp";
import { PAGE_PATH } from "./types/common";

const routers: RouterItemType[] = [
  {
    key: PAGE_PATH.HOME,
    label: "数据面板",
    isMenu: true,
    icon: <DashboardOutlined />,
    component: <HomePage />,
  },
  {
    key: PAGE_PATH.TEMPLATE_SETUP,
    label: "模版配置",
    isMenu: true,
    icon: <BookOutlined />,
    component: <TemplateSetUpPage />,
  },
  {
    key: PAGE_PATH.CONTRACT_SETUP,
    label: "签约客户",
    isMenu: true,
    icon: <UsergroupAddOutlined />,
    component: <ContractSetUpPage />,
  },
  {
    key: PAGE_PATH.CLASS_SETUP,
    label: "班级配置",
    params: ["customerId"],
    component: <ClassSetUpPage />,
  },
  {
    key: PAGE_PATH.STUDENT_SETUP,
    label: "学生配置",
    params: ["customerId", "classId"],
    component: <StudentSetUp />,
  },
  {
    key: PAGE_PATH.SYSTEM_SETUP,
    label: "系统设置",
    icon: <SettingOutlined />,
    component: <SystemSetUpPage />,
  },
  {
    key: PAGE_PATH.USER_SETUP,
    label: "我的设置",
    isMenu: true,
    icon: <UserOutlined />,
    component: <UserSetUpPage />,
  },
  {
    key: PAGE_PATH.TEST,
    label: "测试页面",
    icon: <BugOutlined />,
    component: <TestPage />,
  },
];

export default routers;
