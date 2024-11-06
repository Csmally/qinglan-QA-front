import { PAGE_PATH } from "@/types/common";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/index.module.css";
import { Button, Input, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { fetchLogin } from "@/services/login";
import useGlobalFuncStore from "@/store/globalFuncStore";
import request from "@/utils/request";
import useUserInfoStore from "@/store/userInfoStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfoStore();
  const { setGlobalFunc } = useGlobalFuncStore();
  useEffect(() => {
    setGlobalFunc({ globalNavigate: navigate });
  }, []);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const changeAccount = useCallback((e: any) => {
    setAccount(e.target.value);
  }, []);
  const changePassWord = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);
  const loginHandle = useCallback(async () => {
    if (!account) {
      message.error("请输入账号");
      return;
    }
    if (!password) {
      message.error("请输入密码");
      return;
    }
    const { code, data } = await fetchLogin({
      account,
      password,
      from: "1",
    });
    if (code === 0) {
      setUserInfo(data);
      const { token } = data;
      if (token) {
        request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete request.defaults.headers.common["Authorization"];
      }
      navigate(`/page/${PAGE_PATH.HOME}`, { replace: true });
    }
  }, [account, navigate, password, setUserInfo]);
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Input
          value={account}
          placeholder="请输入账号"
          prefix={<UserOutlined />}
          className={styles.inputContainer}
          onChange={changeAccount}
        />
        <Input.Password
          value={password}
          placeholder="请输入密码"
          prefix={<KeyOutlined />}
          className={styles.inputContainer}
          onChange={changePassWord}
        />
        <Button color="default" variant="solid" onClick={loginHandle}>
          登录
        </Button>
      </div>
      <div className={styles.poweredBy}>Powered By onelight.ink</div>
    </div>
  );
};

export default memo(LoginPage);
