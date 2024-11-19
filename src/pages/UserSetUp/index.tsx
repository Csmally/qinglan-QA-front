import useUserInfoStore from "@/store/userInfoStore";
import { useCallback } from "react";
import styles from "./index.module.css";

const UserSetUpPage: React.FC = () => {
  const { userInfo } = useUserInfoStore();
  const getSex = useCallback((sexStr: string | undefined): string => {
    if (sexStr === "1") return "男";
    if (sexStr === "0") return "女";
    return "未知";
  }, []);
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
    </div>
  );
};

export default UserSetUpPage;
