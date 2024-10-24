interface FormatFileDataType {
  fileTemplate: any;
  rowNumber: number;
  rowValues: any[];
}

const getOptionsConfigList = (data: any[]) => {
  const result = [];

  for (let i = 0; i < data.length; i += 2) {
    const optionScore = data[i];
    const optionText = data[i + 1];

    // 将每对元素转换为对象并推入结果数组
    result.push({ optionText, optionScore });
  }

  return result;
};

function getScaleQuestionsList(data: any[]) {
  let scaleOptionsList: string[];
  if (data?.[1]) {
    scaleOptionsList = `${data[1]}`.split("，"); // 使用中文逗号拆分
  } else {
    scaleOptionsList = [];
  }
  // 返回目标对象
  return {
    questionName: data[0],
    scaleoptionsList: scaleOptionsList,
  };
}

const formatFileData = (args: FormatFileDataType) => {
  const { fileTemplate, rowNumber, rowValues } = args;
  const realRowValues = rowValues?.slice(1);
  if (rowNumber === 1) {
    fileTemplate.scaleName = rowValues?.[1];
  }
  if (rowNumber === 2) {
    fileTemplate.scaleDescStr = rowValues?.[1];
  }
  if (rowNumber === 3) {
    fileTemplate.optionsConfigList = getOptionsConfigList(realRowValues);
  }
  if (rowNumber > 3) {
    if (!fileTemplate.scaleQuestionsList) {
      fileTemplate.scaleQuestionsList = [];
    }
    fileTemplate.scaleQuestionsList.push(getScaleQuestionsList(realRowValues));
  }
};

export { formatFileData };
