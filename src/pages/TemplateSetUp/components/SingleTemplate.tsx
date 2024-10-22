import style from "../styles/singleTemplate.module.css";
import { DeleteOutlined, EditOutlined, CopyOutlined } from "@ant-design/icons";

const SingleTemplate: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.infoContainer}>
          <div className={style.titleText}>SLC-90心智成熟学习情况调查表</div>
          <div className={style.descText}>
            SLC-90心智成熟学习情况调查表内容是v年开始啦v看见我佛我90心智成熟学习情况调查表内容是v年开始啦v看见我佛我90心智成熟学习情况调查表内容是v年开始啦v看见我佛我
          </div>
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

export default SingleTemplate;
