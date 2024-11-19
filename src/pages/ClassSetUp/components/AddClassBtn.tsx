import { FloatButton, Modal, Select, Space } from "antd";
import { memo, useCallback, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { fetchAddClass } from "@/services/classSetUpPageServices";
import { useParams } from "react-router-dom";
import { classArr, gradeOptions } from "../utils/tools";

interface AddClassBtnPropsType {
  reloadData: any;
}

const addBtnStyle: React.CSSProperties = {
  marginRight: 50,
  marginBottom: 50,
};

const classOptions = classArr.map((item: string) => ({
  value: item,
  label: `${item}班`,
}));

const AddClassBtn: React.FC<AddClassBtnPropsType> = (props) => {
  const { reloadData } = props;
  // 学校id
  const { customerId } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [grade, setGrade] = useState("");
  const [gradeText, setGradeText] = useState("");
  const [classValue, setClassValue] = useState("");
  const [classText, setClassText] = useState("");
  const changeModalVisible = useCallback(
    async (from: string) => {
      if (from === "submit") {
        const { code } = await fetchAddClass({
          classInfo: {
            grade,
            gradeText,
            class: classValue,
            classText,
            customerId,
          },
        });
        if (code === 0) {
          reloadData();
        }
      }
      setModalVisible(false);
      setGrade("");
      setGradeText("");
      setClassValue("");
      setClassText("");
    },
    [classText, classValue, customerId, grade, gradeText, reloadData]
  );
  const gradeHandleSelect = useCallback((value: string, option: any) => {
    setGrade(value);
    setGradeText(option.label);
  }, []);
  const classHandleSelect = useCallback((value: string, option: any) => {
    setClassValue(value);
    setClassText(option.label);
  }, []);
  return (
    <div>
      <Modal
        title="添加班级"
        open={modalVisible}
        onOk={() => changeModalVisible("submit")}
        onCancel={() => changeModalVisible("cancel")}
        okText="确认添加"
        cancelText="取消"
      >
        <Space wrap>
          <div>年级：</div>
          <Select
            value={grade}
            style={{ width: 120 }}
            onSelect={gradeHandleSelect}
            options={gradeOptions}
          />
          <div>班级：</div>
          <Select
            value={classValue}
            style={{ width: 120 }}
            onSelect={classHandleSelect}
            options={classOptions}
          />
        </Space>
      </Modal>
      <FloatButton
        type="primary"
        icon={<PlusCircleOutlined />}
        style={addBtnStyle}
        onClick={() => setModalVisible(true)}
      />
    </div>
  );
};

export default memo(AddClassBtn);
