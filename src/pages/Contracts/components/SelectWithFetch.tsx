import { fetchTemplateListByKeyWord } from "@/services/templateSetUpPageServices";
import { SingleTemplateType } from "@/types/fetchResponse";
import { Select, Spin } from "antd";
import { useCallback, useState } from "react";
import styles from "../styles/addCustomer.module.css";

const SelectOption = (props: any) => {
  console.log("9898pp", props);
  return <div>{props.data.name}</div>;
};

const SelectWithFetch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<SingleTemplateType[]>([]);
  const fetchTemplateByKeyWord = useCallback(async (keyWord: string) => {
    setLoading(true);
    const { code, data } = await fetchTemplateListByKeyWord({
      keyWord,
    });
    setLoading(false);
    if (code === 0) {
      setTemplates(data?.templateList || []);
    }
  }, []);
  return (
    <Select
      className={styles.inputContainer}
      labelInValue
      showSearch
      filterOption={false}
      onSearch={fetchTemplateByKeyWord}
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={templates}
      optionRender={(props, info) => (
        <SelectOption {...props} key={info.index} />
      )}
      onChange={(newValue) => {
        console.log("9898newValue", newValue);
      }}
    />
  );
};

export default SelectWithFetch;
