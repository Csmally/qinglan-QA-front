import { SingleCustomerType } from "@/types/fetchResponse";
import style from "../styles/singleCustomer.module.css";
import { QrcodeOutlined, SettingOutlined } from "@ant-design/icons";
import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_PATH } from "@/types/common";
import { Modal, QRCode } from "antd";
import qrlogo from "@/common/statics/imgs/qrlogo.jpg";

interface SingleCustomerPropsType {
  customer: SingleCustomerType;
}
const SingleCustomer: React.FC<SingleCustomerPropsType> = (props) => {
  const { customer } = props;
  const navigate = useNavigate();
  const jumpToClassSettingPage = () => {
    navigate(`/page/${PAGE_PATH.CLASS_SETUP}/${customer.id}`, { replace: true });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const modalHandle = useCallback((e: any) => {
    e.stopPropagation(); // 阻止事件冒泡
    setModalVisible(!modalVisible)
  }, [modalVisible])
  return (
    <div className={style.container} onClick={jumpToClassSettingPage}>
      <Modal
        title={customer.name}
        destroyOnClose
        open={modalVisible}
        footer={null}
        onCancel={modalHandle}
      >
        <div className={style.qrCodeBox}>  
          <QRCode 
            errorLevel="H"
            size={200}
            value={`https://www.onelight.ink/ql/user2c?templateId=${customer.templateId}&customerId=${customer.id}`}
            icon={qrlogo}
          />
        </div>
      </Modal>
      <div className={style.contentContainer}>
        <div className={style.infoContainer}>
          <div className={style.titleText}>{customer.name}</div>
          <div className={style.descText}>{customer.desc}</div>
        </div>
        <div className={style.handleBar}>
          <SettingOutlined className={style.handleBtn} />
          <QrcodeOutlined className={style.handleBtn} onClick={modalHandle}/>
        </div>
      </div>
    </div>
  );
};

export default memo(SingleCustomer);
