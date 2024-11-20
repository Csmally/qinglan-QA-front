interface FormatFileDataType {
  fileTemplate: any;
  sheetId: number;
  rowNumber: number;
  rowValues: any[];
}

const chunkArray = (array: any[], chunkSize: number) => {
  // 初始化一个空的结果数组
  const result = [];
  
  // 使用 for 循环遍历原数组
  for (let i = 0; i < array.length; i += chunkSize) {
      // 使用 slice 方法获取子数组，并将其添加到结果数组中
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
  }
  
  return result;
}
const getValueGroups = (data: any[]) => {
  const chunkData = chunkArray(data, 3)
  const result: any[] = [];
  chunkData.forEach(chunk => {
    const minMaxValue = chunk[0].split("，");
    result.push({
      minValue: Number(minMaxValue[0]),
      maxValue: Number(minMaxValue[1]),
      valueDesc: chunk[1],
      valueSug: chunk[2],
    })
  })
  return result;
}

const setQuestions = (fileTemplate: any, questionsData: any[]) => {
  const { optionsConfigList, groupOptions } = fileTemplate;
  const question = {
    questionName: questionsData[0],
    questionOptions: questionsData[2].split("，").map((i: string) => optionsConfigList.find((conf: any) => conf.index === Number(i))),
  }
  const group = groupOptions.find((group: any) => group.index === questionsData[1]);
  if (!group.questions) {
    group.questions = []
  }
  group.questions.push(question)
}

const formatFileData = (args: FormatFileDataType) => {
  const { fileTemplate, sheetId, rowNumber, rowValues } = args;
  if (rowNumber === 1) return;
  const realRowValues = rowValues?.slice(1);
  // 文件名称&描述
  if (sheetId === 1) {
    fileTemplate.name = realRowValues?.[0];
    fileTemplate.desc = realRowValues?.[1];
  }
  // 选项配置
  if (sheetId === 2) {
    if (!fileTemplate.optionsConfigList) {
      fileTemplate.optionsConfigList = [];
    }
    fileTemplate.optionsConfigList.push({
      index: realRowValues[0],
      value: realRowValues[1],
      showText: realRowValues[2],
    })
  }
  // 分组配置
  if (sheetId === 3) {
    if (!fileTemplate.groupOptions) {
      fileTemplate.groupOptions = [];
    }
    fileTemplate.groupOptions.push({
      index: realRowValues[0],
      showText: realRowValues[1],
      shortName: realRowValues[2],
      valueGroups: getValueGroups(realRowValues.slice(3))
    })
  }
  if (sheetId === 4) {
    setQuestions(fileTemplate, realRowValues)
  }
};

export { formatFileData };
