import { memo, useCallback, useEffect, useState } from "react";
import Customers from "./components/Customers";
import PageController from "@/components/widgets/PageController";
import { SingleCustomerType } from "@/types/fetchResponse";
import { fetchCustomerList } from "@/services/contractsServices";
import AddCustomersBtn from "./components/AddCustomersBtn";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const ContractsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // 暂时写死一次查询20条
  const pageSize = 20;
  const [total, setTotal] = useState(0);
  const [customerList, setCustomerList] = useState<SingleCustomerType[]>([]);
  const getCustomerList = useCallback(async () => {
    const { code, data } = await fetchCustomerList({
      page: currentPage,
      pageSize,
    });
    if (code === 0) {
      setTotal(data.total || 0);
      setCustomerList(data?.list || []);
    }
  }, [currentPage, pageSize]);
  useEffect(() => {
    getCustomerList();
  }, [getCustomerList]);
  return (
    <div style={containerStyle}>
      <Customers customerList={customerList} />
      <PageController
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        setCurrentPage={setCurrentPage}
      />
      <AddCustomersBtn setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default memo(ContractsPage);
