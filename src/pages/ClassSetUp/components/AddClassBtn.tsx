import { FloatButton, Modal, Select, Space } from "antd";
import { memo, useCallback, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { fetchAddClass } from "@/services/classSetUpPageServices";
import { useParams } from "react-router-dom";

interface AddClassBtnPropsType {
  reloadData: any;
}

const addBtnStyle: React.CSSProperties = {
  marginRight: 50,
  marginBottom: 50,
};


const gradeOptions = [
  { value: '1', label: '一年级' },
  { value: '2', label: '二年级' },
  { value: '3', label: '三年级' },
  { value: '4', label: '四年级' },
  { value: '5', label: '五年级' },
  { value: '6', label: '六年级' },
  { value: '7', label: '初中一年级' },
  { value: '8', label: '初中二年级' },
  { value: '9', label: '初中三年级' },
  { value: '10', label: '高中一年级' },
  { value: '11', label: '高中二年级' },
  { value: '12', label: '高中三年级' },
]

const classArr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
const classOptions = classArr.map((item: string) => ({ value: item, label: `${item}班` }))

const AddClassBtn: React.FC<AddClassBtnPropsType> = (props) => {
  const { reloadData } = props;
  // 学校id
  const { customerId } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [grade, setGrade] = useState('');
  const [gradeText, setGradeText] = useState('');
  const [classValue, setClassValue] = useState('');
  const [classText, setClassText] = useState('');
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
      setGrade('');
      setGradeText('');
      setClassValue('');
      setClassText('');
    },
    [classText, classValue, customerId, grade, gradeText, reloadData]
  );
  const gradeHandleSelect = useCallback((value: string, option: any) => {
    setGrade(value);
    setGradeText(option.label)
  }, []);
  const classHandleSelect = useCallback((value: string, option: any) => {
    setClassValue(value);
    setClassText(option.label)
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
