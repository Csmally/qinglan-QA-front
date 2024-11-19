import { memo, useCallback } from "react";
import { FloatButton, Upload } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";
import { useParams } from "react-router-dom";
import { FileStudentType, studentExcel2Json } from "../utils/tools";
import { fetchAddStudentBatch } from "@/services/studentsSetUpPageServices";

interface UploadStudentBtnPropsType {
  reloadData: any;
}
const UploadStudentBtn: React.FC<UploadStudentBtnPropsType> = (props) => {
  const { reloadData } = props;
  const { customerId = "", classId = "" } = useParams();
  const onUploadFilds = useCallback(
    async (info: any) => {
      const { status } = info.file;
      if (status === "error") {
        // 模版数据源头
        const fileStudent: FileStudentType = {
          customerId,
          classId,
          students: [],
        };
        // 创建工作簿实例
        const workbook = new ExcelJS.Workbook();
        // 读取文件
        await workbook.xlsx.load(info.file.originFileObj as any);
        // 获取工作表
        const worksheet = workbook.getWorksheet(1);
        // 遍历行并输出数据
        worksheet?.eachRow((row, rowNumber) => {
          studentExcel2Json({
            fileStudent,
            rowNumber,
            rowValues: row.values as any[],
          });
        });
        const { code } = await fetchAddStudentBatch({
          students: fileStudent.students,
        });
        if (code === 0) {
          reloadData();
        }
      }
    },
    [classId, customerId, reloadData]
  );
  return (
    <Upload onChange={onUploadFilds} itemRender={() => <div></div>}>
      <FloatButton icon={<CloudUploadOutlined />} />
    </Upload>
  );
};

export default memo(UploadStudentBtn);
