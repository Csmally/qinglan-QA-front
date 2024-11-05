import { memo, useCallback, useEffect, useState } from "react";
import QaTemplates from "./components/QaTemplates";
import { fetchTemplateList } from "@/services/templateSetUpPageServices";
import { SingleTemplateType } from "@/types/fetchResponse";
import AddTemplateBtn from "./components/AddTemplateBtn";
import PageController from "@/components/widgets/PageController";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const TemplateSetUpPage: React.FC = () => {
  const [fetchCount, setFetchCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // 暂时写死一次查询20条
  const pageSize = 20;
  const [total, setTotal] = useState(0);
  const [templateList, setTemplateList] = useState<SingleTemplateType[]>([]);
  const getTemplateList = useCallback(async () => {
    const { code, data } = await fetchTemplateList({
      page: currentPage,
      pageSize,
    });
    if (code === 0) {
      setTotal(data.total || 0);
      setTemplateList(data?.templateList || []);
    }
  }, [currentPage, pageSize]);
  useEffect(() => {
    getTemplateList();
  }, [getTemplateList, fetchCount]);
  const reloadData = useCallback(() => {
    if (currentPage === 1) {
      setFetchCount(fetchCount + 1);
    } else {
      setCurrentPage(1);
    }
  }, [currentPage, fetchCount]);
  return (
    <div style={containerStyle}>
      <QaTemplates templateList={templateList} />
      <PageController
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        setCurrentPage={setCurrentPage}
      />
      <AddTemplateBtn reloadData={reloadData} />
    </div>
  );
};

export default memo(TemplateSetUpPage);
