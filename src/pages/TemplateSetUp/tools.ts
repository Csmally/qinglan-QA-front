import { GlobalValue } from "@/types/common";

interface FormatFileDataType {
  fileTemplate: any;
  rowNumber: number;
  rowValues: any[];
}

const getTemplateConfigs = (data: any[]) => {
  const result = [];

  for (let i = 0; i < data.length; i += 2) {
    const value = `${data[i]}`;
    const showText = data[i + 1];

    // 将每对元素转换为对象并推入结果数组
    result.push({ value, showText });
  }

  return result;
};

function getTemplateQuestion(
  data: any[],
  optionsConfigList: any[],
  groupOptions: any[]
) {
  let questionOptions: any[];
  if (data?.[1]) {
    questionOptions = `${data[1]}`
      .split("，")
      .map((item: any) => optionsConfigList[item - 1]);
  } else {
    questionOptions = [];
  }
  // 返回目标对象
  const question = {
    questionName: data[0] || GlobalValue.UNKNOWN_VALUE,
    questionOptions,
    isJudge: data[3] ? true : false,
  };
  if (!groupOptions[data[2] - 1].questions) {
    groupOptions[data[2] - 1].questions = [];
  }
  groupOptions[data[2] - 1].questions.push(question);
}

const formatFileData = (args: FormatFileDataType) => {
  const { fileTemplate, rowNumber, rowValues } = args;
  const realRowValues = rowValues?.slice(2);
  if (rowNumber === 1) {
    fileTemplate.name = realRowValues?.[0];
  }
  if (rowNumber === 2) {
    fileTemplate.desc = realRowValues?.[0];
  }
  if (rowNumber === 3) {
    fileTemplate.optionsConfigList = getTemplateConfigs(realRowValues);
  }
  if (rowNumber === 4) {
    fileTemplate.groupOptions = getTemplateConfigs(realRowValues);
  }
  if (rowNumber > 4) {
    getTemplateQuestion(
      realRowValues,
      fileTemplate.optionsConfigList,
      fileTemplate.groupOptions
    );
  }
};

export { formatFileData };
