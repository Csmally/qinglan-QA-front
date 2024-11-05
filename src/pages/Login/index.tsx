import { PAGE_PATH } from "@/types/common";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const loginHandle = useCallback(() => {
        navigate(`/page/${PAGE_PATH.HOME}`, { replace: true });
    }, [navigate])
    return <div onClick={loginHandle}>登录页</div>
}

export default memo(LoginPage);