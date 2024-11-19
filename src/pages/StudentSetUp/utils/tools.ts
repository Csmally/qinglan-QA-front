import { generateRandomId } from "@/utils/tools";

interface FileStudentType {
  customerId: string;
  classId: string;
  students: any[];
}
interface FormatFileStudentDataType {
  fileStudent: FileStudentType;
  rowNumber: number;
  rowValues: any[];
}

const studentExcel2Json = (args: FormatFileStudentDataType) => {
  const { fileStudent, rowNumber, rowValues } = args;
  const { customerId, classId } = fileStudent;
  const realRowValues = rowValues?.slice(1);
  if (rowNumber > 1) {
    fileStudent.students.push({
      customerId,
      classId,
      name: realRowValues[0],
      account: generateRandomId(),
      password: generateRandomId(),
      sex: realRowValues[1] === "男" ? "1" : "0",
      age: realRowValues[2],
    });
  }
};

export { studentExcel2Json, FileStudentType };
