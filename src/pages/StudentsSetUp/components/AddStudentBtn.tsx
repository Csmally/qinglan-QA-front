import { FloatButton, Input, message, Modal, Tooltip } from "antd";
import { memo, useCallback, useState } from "react"
import { PlusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { fetchAddStudent } from "@/services/studentsSetUpPageServices";
import styles from "../styles/addStudent.module.css";
import { generateRandomString } from "../tools";

interface AddStudentBtnPropsType {
    reloadData: any
}

const addBtnStyle: React.CSSProperties = {
    marginRight: 50,
    marginBottom: 50,
};

const AddStudentBtn: React.FC<AddStudentBtnPropsType> = (props) => {
    const { reloadData } = props;
    // 班级id
    const { id } = useParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
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
                  classId: id,
              },
            });
            if (code === 0) {
              reloadData();
            }
          }
          setModalVisible(false);
          setName('');
          setAccount('');
          setPassword('');
        },
        [account, id, name, password, reloadData]
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
        if (mart === 'account') {
            setAccount(randomString)
        } else {
            setPassword(randomString)
        }
    }, []);
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
                        <Tooltip placement="top" title={'自动生成账号'}>
                            <SyncOutlined onClick={() => autoSet('account')} style={{color: '#459cff', cursor: 'pointer', marginLeft: 20}}/>
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
                        <Tooltip placement="top" title={'自动生成密码'}>
                            <SyncOutlined onClick={() => autoSet('password')} style={{color: '#459cff', cursor: 'pointer', marginLeft: 20}}/>
                        </Tooltip>
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
    )
}

export default memo(AddStudentBtn);