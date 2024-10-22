import { Tabs } from "antd";

const RouterTabs: React.FC = () => {
  const activeKey = "aa";
  const onChange = (e: any) => {
    console.log("9898tabs", e);
  };
  const onEdit = (a: any, b: any) => {
    console.log("9898tabs-a", a);
    console.log("9898tabs-b", b);
  };
  const items = [
    {
      key: "aa",
      label: "哈哈哈",
    },
    {
      key: "bb",
      label: "嘿嘿嘿",
    },
    {
      key: "cc",
      label: "呵呵呵",
    },
  ];
  return (
    <Tabs
      hideAdd
      onChange={onChange}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEdit}
      items={items}
      tabBarStyle={{ marginBottom: 0 }}
    />
  );
};

export default RouterTabs;
