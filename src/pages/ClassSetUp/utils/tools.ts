import { SingleStudentType } from "@/types/fetchResponse";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface SaveAsExcelStudentsParamType {
  customerName: string;
  gradeText: string;
  classText: string;
  jsonData: SingleStudentType[] | null;
}

interface SaveAsExcelAnswerParamType {
  answerList: any[];
  template: any;
}

const saveAsExcelStudents = async (args: SaveAsExcelStudentsParamType) => {
  const { customerName, gradeText, classText, jsonData } = args;
  jsonData?.forEach((item) => {
    if (item.sex === "1") {
      item.sex = "男";
    } else {
      item.sex = "女";
    }
  });
  // 创建工作簿
  const workbook = new ExcelJS.Workbook();
  // 添加工作表
  const sheet = workbook.addWorksheet("Sheet1");
  // 添加表头
  sheet.columns = [
    { header: "姓名", key: "name" },
    { header: "性别", key: "sex" },
    { header: "年龄", key: "age" },
    { header: "账号", key: "account" },
    { header: "密码", key: "password" },
  ];
  sheet.addRows(jsonData || []);
  // 设置所有单元格的对齐方式
  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
  });
  sheet.getRow(1).font = { bold: true };
  // 将工作簿写入 Blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  // 使用 FileSaver 保存文件
  saveAs(blob, `${customerName}_${gradeText}_${classText}.xlsx`);
};

const saveAsExcelAnswer = async (args: SaveAsExcelAnswerParamType) => {
  const { answerList, template } = args;
  console.log('9898answerList', answerList)
  console.log('9898template', template)
}

const gradeOptions = [
  { value: "1", label: "一年级" },
  { value: "2", label: "二年级" },
  { value: "3", label: "三年级" },
  { value: "4", label: "四年级" },
  { value: "5", label: "五年级" },
  { value: "6", label: "六年级" },
  { value: "7", label: "初中一年级" },
  { value: "8", label: "初中二年级" },
  { value: "9", label: "初中三年级" },
  { value: "10", label: "高中一年级" },
  { value: "11", label: "高中二年级" },
  { value: "12", label: "高中三年级" },
];

const classArr = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];

export { saveAsExcelStudents, gradeOptions, classArr, saveAsExcelAnswer };
