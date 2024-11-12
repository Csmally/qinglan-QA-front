import { FloatButton, Input, message, Modal, Select, Tooltip } from "antd";
import { memo, useCallback, useState } from "react";
import { PlusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { fetchAddStudent } from "@/services/studentsSetUpPageServices";
import styles from "../styles/addStudent.module.css";
import { generateRandomString } from "../tools";

interface AddStudentBtnPropsType {
  reloadData: any;
}

const addBtnStyle: React.CSSProperties = {
  marginRight: 50,
  marginBottom: 50,
};

const sexOptions = [
  { label: "男", value: "1" },
  { label: "女", value: "0" },
];
const AddStudentBtn: React.FC<AddStudentBtnPropsType> = (props) => {
  const { reloadData } = props;
  // 班级id
  const { customerId, classId } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("1");
  const changeModalVisible = useCallback(
    async (from: string) => {
      if (from === "submit") {
        if (!name) {
          message.error("请设置用户姓名");
          return;
        }
        if (!account) {
          message.error("请设置用户账号");
          return;
        }
        if (!password) {
          message.error("请设置用户密码");
          return;
        }
        const { code } = await fetchAddStudent({
          student: {
            name,
            account,
            password,
            classId,
            customerId,
            sex,
          },
        });
        if (code === 0) {
          reloadData();
        }
      }
      setModalVisible(false);
      setName("");
      setAccount("");
      setPassword("");
      setSex("1");
    },
    [account, classId, customerId, name, password, reloadData, sex]
  );
  const changeStudentNameHandle = useCallback((e: any) => {
    setName(e.target.value);
  }, []);
  const changeStudentAccountHandle = useCallback((e: any) => {
    setAccount(e.target.value);
  }, []);
  const changeStudentPasswordHandle = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);
  const autoSet = useCallback((mart: string) => {
    const randomString = generateRandomString();
    if (mart === "account") {
      setAccount(randomString);
    } else {
      setPassword(randomString);
    }
  }, []);
  const changeSex = (value: string) => {
    setSex(value);
  };
  return (
    <div>
      <Modal
        title="添加用户"
        open={modalVisible}
        onOk={() => changeModalVisible("submit")}
        onCancel={() => changeModalVisible("cancel")}
        okText="确认添加"
        cancelText="取消"
      >
        <div>
          <div className={styles.studentInfoContainer}>
            <div className={styles.label}>姓名：</div>
            <Input
              value={name}
              className={styles.inputContainer}
              placeholder="请设置用户姓名"
              onChange={changeStudentNameHandle}
            />
          </div>
          <div className={styles.studentInfoContainer}>
            <div className={styles.label}>账号：</div>
            <Input
              value={account}
              className={styles.inputContainer}
              placeholder="请设置用户账号"
              onChange={changeStudentAccountHandle}
            />
            <Tooltip placement="top" title={"自动生成账号"}>
              <SyncOutlined
                onClick={() => autoSet("account")}
                style={{ color: "#459cff", cursor: "pointer", marginLeft: 20 }}
              />
            </Tooltip>
          </div>
          <div className={styles.studentInfoContainer}>
            <div className={styles.label}>密码：</div>
            <Input
              value={password}
              className={styles.inputContainer}
              placeholder="请设置用户密码"
              onChange={changeStudentPasswordHandle}
            />
            <Tooltip placement="top" title={"自动生成密码"}>
              <SyncOutlined
                onClick={() => autoSet("password")}
                style={{ color: "#459cff", cursor: "pointer", marginLeft: 20 }}
              />
            </Tooltip>
          </div>
          <div className={styles.studentInfoContainer}>
            <div className={styles.label}>性别：</div>
            <Select
              value={sex}
              className={styles.inputContainer}
              onSelect={changeSex}
              options={sexOptions}
            />
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

export default memo(AddStudentBtn);
