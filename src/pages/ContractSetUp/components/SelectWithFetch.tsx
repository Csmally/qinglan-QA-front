import { fetchTemplateListByKeyWord } from "@/services/templateSetUpPageServices";
import { SingleTemplateType } from "@/types/fetchResponse";
import { Select, Spin } from "antd";
import { useCallback, useState } from "react";
import styles from "../styles/addCustomer.module.css";

interface SelectWithFetchPropsType {
  setTemplateId: any;
}
const SelectWithFetch: React.FC<SelectWithFetchPropsType> = (props) => {
  const { setTemplateId } = props;
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("");
  const [templates, setTemplates] = useState<SingleTemplateType[]>([]);
  const fetchTemplateByKeyWord = useCallback(async (keyWord: string) => {
    setLoading(true);
    const { code, data } = await fetchTemplateListByKeyWord({
      keyWord,
    });
    setLoading(false);
    if (code === 0) {
      data?.templateList?.forEach((item) => {
        (item as any).label = item.name;
        (item as any).value = item.id;
      });
      setTemplates(data?.templateList || []);
    }
  }, []);
  return (
    <Select
      className={styles.inputContainer}
      showSearch
      value={label}
      labelInValue
      filterOption={false}
      onSearch={fetchTemplateByKeyWord}
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={templates}
      onSelect={(option: any) => {
        setLabel(option.label);
        setTemplateId(option.value);
      }}
    />
  );
};

export default SelectWithFetch;
