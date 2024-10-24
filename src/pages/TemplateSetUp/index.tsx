import { useCallback, useEffect, useState } from "react";
import QaTemplates from "./components/QaTemplates";
import { fetchTemplateList } from "@/services/templateSetUpPageServices";
import { SingleTemplateType } from "@/types/fetchResponse";
import { FloatButton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddTemplateBtn from "./components/AddTemplateBtn";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};
const addBtnStyle: React.CSSProperties = {
  marginRight: 50,
  marginBottom: 50,
};

const TemplateSetUpPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(20);
  const [total, setTotal] = useState(0);
  const [templateList, setTemplateList] = useState<SingleTemplateType[]>([]);
  const getTemplateList = useCallback(async () => {
    const { code, data } = await fetchTemplateList({
      page,
      count,
    });
    if (code === 200) {
      setTotal(data.total || 0);
      setTemplateList(data?.list || []);
    }
  }, [count, page]);
  useEffect(() => {
    getTemplateList();
  }, [getTemplateList]);
  return (
    <div style={containerStyle}>
      <QaTemplates templateList={templateList} />
      <div>footer</div>
      <AddTemplateBtn />
    </div>
  );
};

export default TemplateSetUpPage;
