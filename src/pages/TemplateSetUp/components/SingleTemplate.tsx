import { SingleTemplateType } from "@/types/fetchResponse";
import style from "../styles/singleTemplate.module.css";
import { DeleteOutlined, EditOutlined, CopyOutlined } from "@ant-design/icons";

interface SingleTemplatePropsType {
  template: SingleTemplateType;
}
const SingleTemplate: React.FC<SingleTemplatePropsType> = (props) => {
  const { template } = props;
  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.infoContainer}>
          <div className={style.titleText}>{template.name}</div>
          <div className={style.descText}>{template.desc}</div>
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
