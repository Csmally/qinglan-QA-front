import { FloatButton, Input, message, Modal } from "antd";
import { memo, useCallback, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { fetchAddCustomer } from "@/services/contractsServices";
import styles from "../styles/addCustomer.module.css";
import SelectWithFetch from "./SelectWithFetch";

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
  const [customerName, setCustomerName] = useState<string>("");
  const [customerDesc, setCustomerDesc] = useState<string>("");
  const changeModalVisible = useCallback(
    async (from: string) => {
      if (from === "submit") {
        if (!customerName) {
          message.error("请输入客户名称");
          return;
        }
        if (!customerDesc) {
          message.error("请输入客户描述与备注");
          return;
        }
        const { code } = await fetchAddCustomer({
          customer: {
            name: customerName,
            desc: customerDesc,
          },
        });
        if (code === 0) {
          getCustomerList();
        }
      }
      setModalVisible(false);
      setCustomerName("");
      setCustomerDesc("");
    },
    [customerDesc, customerName, getCustomerList]
  );
  const changeCustomerNameHandle = useCallback((e: any) => {
    setCustomerName(e.target.value);
  }, []);
  const changeCustomerDescHandle = useCallback((e: any) => {
    setCustomerDesc(e.target.value);
  }, []);
  return (
    <div>
      <Modal
        title="添加客户"
        open={modalVisible}
        onOk={() => changeModalVisible("submit")}
        onCancel={() => changeModalVisible("cancel")}
        okText="确认添加"
        cancelText="取消"
      >
        <div>
          <div className={styles.customerInfoContainer}>
            <div className={styles.label}>名称：</div>
            <Input
              value={customerName}
              className={styles.inputContainer}
              placeholder="请输入客户名称"
              onChange={changeCustomerNameHandle}
            />
          </div>
          <div className={styles.customerInfoContainer}>
            <div className={styles.label}>描述：</div>
            <Input.TextArea
              value={customerDesc}
              className={styles.inputContainer}
              placeholder="请输入客户描述与备注"
              rows={4}
              onChange={changeCustomerDescHandle}
            />
          </div>
          <div className={styles.customerInfoContainer}>
            <div className={styles.label}>题库：</div>
            <SelectWithFetch />
          </div>
        </div>
      </Modal>
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
