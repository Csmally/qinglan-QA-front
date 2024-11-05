import { Table, TableProps } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import PageController from "@/components/widgets/PageController";
import { SingleStudentType } from "@/types/fetchResponse";
import AddStudentBtn from "./components/AddStudentBtn";
import { SearchOutlined } from "@ant-design/icons";
import { fetchStudentList } from "@/services/studentsSetUpPageServices";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const StudentSetUp: React.FC = () => {
  const [fetchCount, setFetchCount] = useState(0);
  // 暂时写死一次查询20条
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [studentList, setStudentList] = useState<SingleStudentType[]>([]);
  const getStudentList = useCallback(async () => {
    const { code, data } = await fetchStudentList({
      page: currentPage,
      pageSize,
    });
    if (code === 0) {
      setTotal(data.total || 0);
      setStudentList(data?.list || []);
    }
  }, [currentPage, pageSize]);
  const reloadData = useCallback(() => {
    if (currentPage === 1) {
      setFetchCount(fetchCount + 1);
    } else {
      setCurrentPage(1);
    }
  }, [currentPage, fetchCount]);
  useEffect(() => {
    getStudentList();
  }, [fetchCount, getStudentList]);
  const jumpToStudentPage = useCallback((text: any, record: any) => {
    console.log('9898record-student', record)
  }, []);
  // 表格列设置
  const columns: TableProps<SingleStudentType>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "姓名",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "账号",
      dataIndex: "account",
      align: "center",
    },
    {
      title: "密码",
      dataIndex: "password",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      render: (text, record) => <div style={{color: '#459cff', cursor: 'pointer' }} onClick={() => jumpToStudentPage(text, record)}>查看 <SearchOutlined /></div>,
    },
  ];
  return (
    <div style={containerStyle}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Table<SingleStudentType>
          dataSource={studentList}
          columns={columns}
          pagination={false}
          sticky
          rowKey={(record) => record.id || ''}
        />
      </div>
      <PageController
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        setCurrentPage={setCurrentPage}
      />
      <AddStudentBtn reloadData={reloadData} />
    </div>
  );
};

export default memo(StudentSetUp);
