import { FloatButton, Modal } from "antd";
import { memo, useCallback, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { fetchAddCustomer } from "@/services/contractsServices";
import { SingleCustomerType } from "@/types/fetchResponse";

const addBtnStyle: React.CSSProperties = {
  marginRight: 50,
  marginBottom: 50,
};

interface AddTemplateBtnPropsType {
  getCustomerList: any;
}
const AddCustomersBtn: React.FC<AddTemplateBtnPropsType> = (props) => {
  const { getCustomerList } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<SingleCustomerType>({
    name: "",
    desc: "",
  });
  const changeModalVisible = useCallback(
    async (from: string) => {
      if (from === "submit") {
        const { code } = await fetchAddCustomer({
          customerList: customerInfo,
        });
        if (code === 0) {
          getCustomerList();
        }
      }
      setModalVisible(false);
      setCustomerInfo({ name: "", desc: "" });
    },
    [customerInfo, getCustomerList]
  );
  return (
    <div>
      <Modal
        title="添加客户"
        open={modalVisible}
        onOk={() => changeModalVisible("submit")}
        onCancel={() => changeModalVisible("cancel")}
        okText="确认添加"
        cancelText="取消"
      ></Modal>
      <FloatButton
        type="primary"
        icon={<PlusCircleOutlined />}
        style={addBtnStyle}
        onClick={() => setModalVisible(true)}
      />
    </div>
  );
};

export default memo(AddCustomersBtn);
