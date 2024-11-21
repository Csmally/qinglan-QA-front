import useUserInfoStore from "@/store/userInfoStore";
import { useCallback, useState } from "react";
import styles from "./index.module.css";
import { Button, Input, message } from "antd";
import { fetchChangePassword } from "@/services/userSetUpPageServices";
import { useNavigate } from "react-router-dom";
import request from "@/utils/request";

const UserSetUpPage: React.FC = () => {
  const { userInfo } = useUserInfoStore();
  const navigate = useNavigate();
  const getSex = useCallback((sexStr: string | undefined): string => {
    if (sexStr === "1") return "男";
    if (sexStr === "0") return "女";
    return "未知";
  }, []);
  const [isEditting, setIsEditting] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const changeNewPassword = useCallback((e: any) => {
    setNewPassword(e.target.value);
  }, []);
  const cancelChangePassword = useCallback(() => {
    setIsEditting(false);
    setNewPassword("");
  }, []);
  const confirmChangePassword = useCallback(async () => {
    if (!newPassword) {
      message.error("请输入新密码");
      setIsEditting(false);
      setNewPassword("");
    } else {
      const { code } = await fetchChangePassword({
        password: newPassword,
        id: userInfo.id,
      });
      if (code === 0) {
        delete request.defaults.headers.common["Authorization"];
        navigate("/", { replace: true });
      }
    }
  }, [navigate, newPassword, userInfo.id]);
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <div className={styles.label}>姓名：</div>
        <div className={styles.labelValue}>{userInfo.name}</div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.label}>性别：</div>
        <div className={styles.labelValue}>{getSex(userInfo?.sex)}</div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.label}>年龄：</div>
        <div className={styles.labelValue}>{userInfo.age || "未知"}</div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.label}>联系方式：</div>
        <div className={styles.labelValue}>{userInfo.mobile || "未知"}</div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.label}>账号：</div>
        <div className={styles.labelValue}>{userInfo.account}</div>
      </div>
      {isEditting ? (
        <div className={styles.itemContainer}>
          <Input
            value={newPassword}
            className={styles.inputContainer}
            placeholder="请输入新密码"
            onChange={changeNewPassword}
          />
          <Button color="default" onClick={cancelChangePassword}>
            取消修改
          </Button>
          <Button
            color="default"
            variant="solid"
            onClick={confirmChangePassword}
          >
            确认修改
          </Button>
        </div>
      ) : (
        <Button
          color="default"
          variant="solid"
          onClick={() => setIsEditting(true)}
        >
          修改密码
        </Button>
      )}
    </div>
  );
};

export default UserSetUpPage;
