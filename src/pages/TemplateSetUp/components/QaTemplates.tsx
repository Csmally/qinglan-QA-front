import { SingleTemplateType } from "@/types/fetchResponse";
import SingleTemplate from "./SingleTemplate";
import { memo } from "react";

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  gap: 30,
};

interface QaTemplatesPropsType {
  templateList: SingleTemplateType[];
}

const QaTemplates: React.FC<QaTemplatesPropsType> = (props) => {
  const { templateList } = props;
  return (
    <div style={containerStyle}>
      {templateList.map((template) => (
        <SingleTemplate key={template.id} template={template} />
      ))}
    </div>
  );
};

export default memo(QaTemplates);
