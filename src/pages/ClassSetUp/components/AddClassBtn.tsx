import { FloatButton, Modal } from "antd";
import { memo, useCallback, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { fetchAddClass } from "@/services/classSetUpPageServices";
import { useParams } from "react-router-dom";

interface AddClassBtnPropsType {
  setCurrentPage: any;
}

const addBtnStyle: React.CSSProperties = {
  marginRight: 50,
  marginBottom: 50,
};

const AddClassBtn: React.FC<AddClassBtnPropsType> = (props) => {
  const { setCurrentPage } = props;
  // 学校id
  const { id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const changeModalVisible = useCallback(
    async (from: string) => {
      if (from === "submit") {
        const { code } = await fetchAddClass({
          classInfo: {
            grade: "1",
            gradeText: "一年级",
            class: "1",
            classText: "一班",
            customerId: id,
          },
        });
        if (code === 0) {
          setCurrentPage(1);
        }
      }
      setModalVisible(false);
    },
    [id, setCurrentPage]
  );
  return (
    <div>
      <Modal
        title="添加客户"
        destroyOnClose
        open={modalVisible}
        onOk={() => changeModalVisible("submit")}
        onCancel={() => changeModalVisible("cancel")}
        okText="确认添加"
        cancelText="取消"
      >
        dddd
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
