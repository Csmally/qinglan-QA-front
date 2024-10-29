interface FormatFileDataType {
  fileTemplate: any;
  rowNumber: number;
  rowValues: any[];
}

const getOptionsConfigList = (data: any[]) => {
  const result = [];

  for (let i = 0; i < data.length; i += 2) {
    const value = data[i];
    const showText = data[i + 1];

    // 将每对元素转换为对象并推入结果数组
    result.push({ value, showText });
  }

  return result;
};

function getTemplateQuestionsList(data: any[]) {
  let optionsList: number[];
  if (data?.[1]) {
    optionsList = `${data[1]}`.split("，").map((item: any) => item - 1)
  } else {
    optionsList = [];
  }
  // 返回目标对象
  return {
    questionName: data[0] || GlobalValue.UNKNOWN_VALUE,
    optionsList,
  };
}

const formatFileData = (args: FormatFileDataType) => {
  const { fileTemplate, rowNumber, rowValues } = args;
  const realRowValues = rowValues?.slice(1);
  if (rowNumber === 1) {
    fileTemplate.templateName = rowValues?.[1];
  }
  if (rowNumber === 2) {
    fileTemplate.templateDesc = rowValues?.[1];
  }
  if (rowNumber === 3) {
    fileTemplate.optionsConfigList = getOptionsConfigList(realRowValues);
  }
  if (rowNumber > 3) {
    if (!fileTemplate.questionsList) {
      fileTemplate.questionsList = [];
    }
    fileTemplate.questionsList.push(getTemplateQuestionsList(realRowValues));
  }
};

export { formatFileData };
