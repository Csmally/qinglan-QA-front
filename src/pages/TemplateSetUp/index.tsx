import { useCallback, useEffect, useState } from "react";
import QaTemplates from "./components/QaTemplates";
import { fetchTemplateList } from "@/services/templateSetUpPageServices";
import { SingleTemplateType } from "@/types/fetchResponse";
import { FloatButton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddTemplateBtn from "./components/AddTemplateBtn";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};
const addBtnStyle: React.CSSProperties = {
  marginRight: 50,
  marginBottom: 50,
};

const TemplateSetUpPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(20);
  const [total, setTotal] = useState(0);
  const [templateList, setTemplateList] = useState<any[]>([]);
  const getTemplateList = useCallback(async () => {
    const res = {
      success: true,
      code: 200,
      data: {
        total: 3,
        list: [
          {
            id: 1,
            name: "ASLC-90学习成绩爱情丰收事业成功",
            desc: "SLC-90学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功",
          },
          {
            id: 2,
            name: "BSLC-80爱情丰收事业成功学习成绩",
            desc: "SLC-80学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功",
          },
          {
            id: 3,
            name: "CSLC-60事业成功学习成绩爱情丰收事业成功",
            desc: "SLC-60学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功SLC-90学习成绩爱情丰收事业成功",
          },
        ],
      },
      message: "请求成功",
    };
    // const { code, data } = await fetchTemplateList({
    //   page,
    //   count,
    // });
    const { code, data } = res;
    if (code === 200) {
      setTotal(data.total || 0);
      setTemplateList(data.list);
    }
  }, []);
  useEffect(() => {
    getTemplateList();
  }, [getTemplateList]);
  return (
    <div style={containerStyle}>
      <QaTemplates templateList={templateList} />
      <div>footer</div>
      <AddTemplateBtn />
    </div>
  );
};

export default TemplateSetUpPage;
