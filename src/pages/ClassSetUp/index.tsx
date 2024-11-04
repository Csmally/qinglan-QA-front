import { Table, TableProps } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import PageController from "@/components/widgets/PageController";
import { SingleClassType } from "@/types/fetchResponse";
import { fetchClassList } from "@/services/classSetUpPageServices";
import AddClassBtn from "./components/AddClassBtn";

const columns: TableProps<SingleClassType>["columns"] = [
  {
    title: "id",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "年级",
    dataIndex: "gradeText",
    align: "center",
  },
  {
    title: "班级",
    dataIndex: "classText",
    align: "center",
  },
  {
    title: "操作",
    align: "center",
    render: () => <div>说动</div>,
  },
];

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const ClassSetUpPage: React.FC = () => {
  // 暂时写死一次查询20条
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [classList, setClassList] = useState<SingleClassType[]>([]);
  const getClassList = useCallback(async () => {
    const { code, data } = await fetchClassList({
      page: currentPage,
      pageSize,
    });
    if (code === 0) {
      setTotal(data.total || 0);
      setClassList(data?.list || []);
    }
  }, [currentPage, pageSize]);
  useEffect(() => {
    getClassList();
  }, [getClassList]);
  return (
    <div style={containerStyle}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Table<SingleClassType>
          dataSource={classList}
          columns={columns}
          pagination={false}
          sticky
        />
      </div>
      <PageController
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        setCurrentPage={setCurrentPage}
      />
      <AddClassBtn setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default memo(ClassSetUpPage);
