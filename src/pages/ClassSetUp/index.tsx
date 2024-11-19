import { Table, TableProps } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import PageController from "@/components/widgets/PageController";
import { SingleClassType } from "@/types/fetchResponse";
import {
  fetchAnswersByClass,
  fetchClassList,
} from "@/services/classSetUpPageServices";
import AddClassBtn from "./components/AddClassBtn";
import {
  SearchOutlined,
  CloudDownloadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { PAGE_PATH } from "@/types/common";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const ClassSetUpPage: React.FC = () => {
  const navigate = useNavigate();
  // 学校id
  const { customerId } = useParams();
  const [fetchCount, setFetchCount] = useState(0);
  // 暂时写死一次查询20条
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [classList, setClassList] = useState<SingleClassType[]>([]);
  const getClassList = useCallback(async () => {
    const { code, data } = await fetchClassList({
      page: currentPage,
      pageSize,
      customerId,
    });
    if (code === 0) {
      setTotal(data.total || 0);
      setClassList(data?.list || []);
    }
  }, [currentPage, customerId]);
  const reloadData = useCallback(() => {
    if (currentPage === 1) {
      setFetchCount(fetchCount + 1);
    } else {
      setCurrentPage(1);
    }
  }, [currentPage, fetchCount]);
  useEffect(() => {
    getClassList();
  }, [getClassList, fetchCount]);
  const jumpToStudentPage = useCallback(
    (text: any, record: any) => {
      navigate(`/page/${PAGE_PATH.STUDENT_SETUP}/${customerId}/${record.id}`);
    },
    [customerId, navigate]
  );
  const downloadData = useCallback(async (text: any, record: any) => {
    const res = await fetchAnswersByClass({ classId: record.id });
    console.log("9898res", res);
  }, []);
  // 表格列设置
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
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ color: "#459cff", cursor: "pointer" }}
            onClick={() => jumpToStudentPage(text, record)}
          >
            查看 <SearchOutlined />
          </div>
          <div
            style={{ color: "#459cff", cursor: "pointer" }}
            onClick={() => downloadData(text, record)}
          >
            下载 <CloudDownloadOutlined />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div style={containerStyle}>
      <ArrowLeftOutlined
        style={{ fontSize: 20, marginBottom: 20 }}
        onClick={() => {
          navigate(-1);
        }}
      />
      <div style={{ flex: 1, overflow: "auto" }}>
        <Table<SingleClassType>
          dataSource={classList}
          columns={columns}
          pagination={false}
          sticky
          rowKey={(record) => record.id || ""}
        />
      </div>
      <PageController
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        setCurrentPage={setCurrentPage}
      />
      <AddClassBtn reloadData={reloadData} />
    </div>
  );
};

export default memo(ClassSetUpPage);
