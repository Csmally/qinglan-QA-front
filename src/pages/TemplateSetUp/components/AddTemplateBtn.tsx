import { FloatButton, message, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { memo, useCallback, useRef, useState } from "react";
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

const fileNameStyle: React.CSSProperties = {
  color: "green",
  marginTop: 5,
};

interface AddTemplateBtnPropsType {
  reloadData: any;
}
const AddTemplateBtn: React.FC<AddTemplateBtnPropsType> = (props) => {
  const { reloadData } = props;
  const [templateList, setTemplateList] = useState<any[]>([]);
  const fileListLengthRef = useRef(0);

  const [modalVisible, setModalVisible] = useState(false);
  const changeModalVisible = useCallback(
    async (from: string) => {
      if (from === "submit") {
        if (templateList.length === 0) {
          message.error("请上传题库");
          return;
        } else if (templateList.length !== fileListLengthRef.current) {
          message.error("有文件上传失败");
          return;
        }
        const { code } = await fetchAddTemplate({
          templateList: templateList,
        });
        if (code === 0) {
          reloadData();
        }
      }
      setModalVisible(false);
      setTemplateList([]);
      fileListLengthRef.current = 0;
    },
    [reloadData, templateList]
  );
  const onUploadFilds = useCallback(async (info: any) => {
    const { status } = info.file;
    if (status === "error") {
      fileListLengthRef.current++;
      // 模版数据源头
      const fileTemplate: any = {};
      // 创建工作簿实例
      const workbook = new ExcelJS.Workbook();

      // 读取文件
      await workbook.xlsx.load(info.file.originFileObj as any);

      // 获取工作表
      workbook.eachSheet((worksheet, sheetId) => {
        // 遍历行并输出数据
        worksheet?.eachRow((row, rowNumber) => {
          formatFileData({
            fileTemplate,
            sheetId,
            rowNumber,
            rowValues: row.values as any[],
          });
        });
      })
      delete fileTemplate.optionsConfigList;
      setTemplateList((list) => [...list, fileTemplate]);
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
        <div>
          {templateList.map((t: any, index: number) => (
            <div key={index} style={fileNameStyle}>
              {t.name}
            </div>
          ))}
        </div>
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

export default memo(AddTemplateBtn);
