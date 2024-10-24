import { FloatButton, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useCallback, useRef, useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";
import { formatFileData } from "../tools";
import { fetchAddTemplate } from "@/services/templateSetUpPageServices";

const { Dragger } = Upload;

const addBtnStyle: React.CSSProperties = {
  marginRight: 50,
  marginBottom: 50,
};

const AddTemplateBtn: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const fileListRef = useRef<any[]>([]);
  const fileListLengthRef = useRef(0);

  const [modalVisible, setModalVisible] = useState(false);
  const changeModalVisible = useCallback(
    async (from: string) => {
      console.log("9898list", fileList);
      if (from === "submit") {
        const res = await fetchAddTemplate(fileList);
        console.log("9898res", res);
      }
      setModalVisible(false);
      setFileList([]);
      fileListRef.current = [];
      fileListLengthRef.current = 0;
    },
    [fileList]
  );
  const onUploadFilds = useCallback(async (info: any) => {
    const { status } = info.file;
    if (status === "error") {
      fileListLengthRef.current = info.fileList.length;
      // 模版数据源头
      const fileTemplate = {};
      // 创建工作簿实例
      const workbook = new ExcelJS.Workbook();

      // 读取文件
      await workbook.xlsx.load(info.file.originFileObj as unknown as Buffer);

      // 获取工作表
      const worksheet = workbook.getWorksheet(1);

      // 遍历行并输出数据
      worksheet?.eachRow((row, rowNumber) => {
        formatFileData({
          fileTemplate,
          rowNumber,
          rowValues: row.values as any[],
        });
      });
      fileListRef.current.push(fileTemplate);
      setFileList(fileListRef.current);
    }
  }, []);
  return (
    <div>
      <Modal
        title="上传题库"
        open={modalVisible}
        onOk={() => changeModalVisible("submit")}
        onCancel={() => changeModalVisible("cancel")}
        okText="确认添加"
        cancelText="取消"
      >
        <Dragger
          multiple
          onChange={onUploadFilds}
          itemRender={() => <div></div>}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件至该区域</p>
          <p className="ant-upload-hint">支持多个文件同时上传</p>
        </Dragger>
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

export default AddTemplateBtn;
