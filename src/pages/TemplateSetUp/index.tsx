import { useCallback, useEffect, useState } from "react";
import QaTemplates from "./components/QaTemplates";
import { fetchTemplateList } from "@/services/templateSetUpPageServices";
import { SingleTemplateType } from "@/types/fetchResponse";
import AddTemplateBtn from "./components/AddTemplateBtn";
import PageController from "./components/PageController";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const TemplateSetUpPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [templateList, setTemplateList] = useState<SingleTemplateType[]>([]);
  const getTemplateList = useCallback(async () => {
    const { code, data } = await fetchTemplateList({
      page: currentPage,
      count: pageSize,
    });
    if (code === 200) {
      setTotal(data.total || 0);
      setTemplateList(data?.list || []);
    }
  }, [currentPage, pageSize]);
  useEffect(() => {
    getTemplateList();
  }, [getTemplateList]);
  return (
    <div style={containerStyle}>
      <QaTemplates templateList={templateList} />
      <PageController currentPage={currentPage} pageSize={pageSize} total={total} setCurrentPage={setCurrentPage}/>
      <AddTemplateBtn />
    </div>
  );
};

export default TemplateSetUpPage;
