import { message, Table, TableProps, Tooltip } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import PageController from "@/components/widgets/PageController";
import { SingleClassType } from "@/types/fetchResponse";
import {
  fetchAnswersByClass,
  fetchClassList,
  fetchStudentsByClass,
} from "@/services/classSetUpPageServices";
import AddClassBtn from "./components/AddClassBtn";
import {
  SearchOutlined,
  CloudDownloadOutlined,
  ArrowLeftOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PAGE_PATH } from "@/types/common";
import { saveAsExcelStudents } from "./utils/tools";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const ClassSetUpPage: React.FC = () => {
  const navigate = useNavigate();
  // 学校id
  const { customerId = "" } = useParams();
  // 学校名称
  const location = useLocation();
  const { state = {} } = location;
  const { customerName = "" } = state;
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
  const downloadReportData = useCallback(async (text: any, record: any) => {
    const res = await fetchAnswersByClass({ classId: record.id });
    console.log("9898res--aa", res);
  }, []);
  const downloadStudentsData = useCallback(
    async (text: any, record: any) => {
      const { code, data } = await fetchStudentsByClass({
        customerId,
        classId: record.id,
      });
      if (code === 0) {
        const { list } = data;
        if (list.length === 0) {
          message.error("无数据可导出");
          return;
        }
        saveAsExcelStudents({
          jsonData: list,
          customerName,
          gradeText: record.gradeText,
          classText: record.classText,
        });
      }
    },
    [customerId, customerName]
  );
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
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ color: "#459cff", cursor: "pointer" }}
            onClick={() => jumpToStudentPage(text, record)}
          >
            <Tooltip title="查看">
              <SearchOutlined style={{ fontSize: 18 }} />
            </Tooltip>
          </div>
          <div
            style={{ color: "#459cff", cursor: "pointer" }}
            onClick={() => downloadStudentsData(text, record)}
          >
            <Tooltip title="导出学生信息">
              <TeamOutlined style={{ fontSize: 18 }} />
            </Tooltip>
          </div>
          <div
            style={{ color: "#459cff", cursor: "pointer" }}
            onClick={() => downloadReportData(text, record)}
          >
            <Tooltip title="导出报告">
              <CloudDownloadOutlined style={{ fontSize: 18 }} />
            </Tooltip>
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
