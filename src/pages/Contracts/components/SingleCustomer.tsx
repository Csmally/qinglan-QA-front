import { SingleCustomerType } from "@/types/fetchResponse";
import style from "../styles/singleCustomer.module.css";
import { DeleteOutlined, EditOutlined, CopyOutlined } from "@ant-design/icons";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface SingleCustomerPropsType {
  customer: SingleCustomerType;
}
const SingleCustomer: React.FC<SingleCustomerPropsType> = (props) => {
  const { customer } = props;
  const navigate = useNavigate();
  const jumpToClassSettingPage = () => {
    navigate(`/studentsSetUp/${customer.id}`, { replace: true });
  };
  return (
    <div className={style.container} onClick={jumpToClassSettingPage}>
      <div className={style.contentContainer}>
        <div className={style.infoContainer}>
          <div className={style.titleText}>{customer.name}</div>
          <div className={style.descText}>{customer.desc}</div>
        </div>
        <div className={style.handleBar}>
          <DeleteOutlined className={style.handleBtn} />
          <EditOutlined className={style.handleBtn} />
          <CopyOutlined className={style.handleBtn} />
        </div>
      </div>
    </div>
  );
};

export default memo(SingleCustomer);
