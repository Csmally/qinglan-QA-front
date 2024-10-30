import { GlobalValue } from "@/types/common";

interface FormatFileDataType {
  fileTemplate: any;
  rowNumber: number;
  rowValues: any[];
}

const getTemplateConfigs = (data: any[]) => {
  const result = [];

  for (let i = 0; i < data.length; i += 2) {
    const value = data[i];
    const showText = data[i + 1];

    // 将每对元素转换为对象并推入结果数组
    result.push({ value, showText });
  }

  return result;
};

function getTemplateQuestionsList(data: any[], optionsConfigList: any[], groupsConfigList: any[]) {
  let optionsList: any[];
  if (data?.[1]) {
    optionsList = `${data[1]}`.split("，").map((item: any) => optionsConfigList[item-1]);
  } else {
    optionsList = [];
  }
  // 返回目标对象
  return {
    questionName: data[0] || GlobalValue.UNKNOWN_VALUE,
    optionsList,
    groupBy: groupsConfigList[data[2]-1],
    isJudge: data[3] ? true : false,
  };
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
    fileTemplate.groupsConfigList = getTemplateConfigs(realRowValues);
  }
  if (rowNumber > 4) {
    if (!fileTemplate.questionsList) {
      fileTemplate.questionsList = [];
    }
    fileTemplate.questionsList.push(
      getTemplateQuestionsList(realRowValues, fileTemplate.optionsConfigList, fileTemplate.groupsConfigList)
    );
  }
};

export { formatFileData };
