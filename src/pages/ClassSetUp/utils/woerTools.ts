import { formatDate } from "@/utils/tools";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import saveAs from "file-saver";

const analyzeData = (answerList: any, template: any) => {
  answerList.forEach((answer: any) => {
    const scoreReport: any[] = [];
    const scoreSummary: any[] = [];
    template.groupOptions.forEach((group: any) => {
      const { questions, valueGroups } = group;
      let groupScore = 0;
      questions.forEach((question: any) => {
        const answerId = answer.answers.find(
          (i: any) => i.questionId === question.id
        ).questionAnswerId;
        const score = question.questionOptions.find(
          (i: any) => i.id === answerId
        ).value;
        groupScore = groupScore + score;
      });
      scoreSummary.push({
        showText: group.showText,
        shortName: group.shortName,
        score: groupScore,
      });
      const scoreByGroup = valueGroups.find(
        (i: any) => i.minValue <= groupScore && groupScore <= i.maxValue
      );
      if (scoreByGroup) {
        scoreReport.push({
          title: group.showText,
          scoreDesc: scoreByGroup.valueDesc,
          scoreSug: scoreByGroup.valueSug,
        });
      }
    });
    answer.scoreReport = scoreReport;
    answer.scoreSummary = scoreSummary;
  });
};
interface WordTitleOptions {
  text: string;
  alignment?: "center" | "left" | "right";
  spacingAfter?: number;
  spacingBefore?: number;
  size?: number;
  color?: string;
  bold?: boolean;
  shading?: boolean;
}

// word文档文字组件
const wordText = (options: WordTitleOptions) => {
  const {
    alignment = "left",
    spacingAfter = 50,
    spacingBefore = 0,
    text,
    size = 28,
    color = "#000000",
    bold = false,
    shading = false,
  } = options;
  return new Paragraph({
    alignment: alignment,
    spacing: { after: spacingAfter, before: spacingBefore },
    shading: shading ? { fill: "#8d8d8d" } : undefined,
    children: [
      new TextRun({
        text,
        bold,
        size,
        color,
      }),
    ],
  });
};

interface WordTableCellOptions {
  text: string;
  bold?: boolean;
  size?: number;
}

// word文档表格cell
const wordTableCell = (options: WordTableCellOptions) => {
  const { text, bold = false, size = 24 } = options;
  return new TableCell({
    margins: {
      top: 50,
      bottom: 50,
    },
    width: { size: 5000, type: "dxa" },
    verticalAlign: "center",
    children: [wordText({ alignment: "center", text, bold, size })],
  });
};

interface SaveAnalyzeDataAsWordParamType {
  answerList: any[];
  template: any;
  customerName: string;
  gradeText: string;
  classText: string;
}

const saveAnalyzeDataAsWord = async (args: SaveAnalyzeDataAsWordParamType) => {
  const { answerList, template, customerName, gradeText, classText } = args;
  const doc = new Document({
    sections: answerList.map((answer: any) => ({
      children: [
        wordText({
          text: "个人测评报告",
          spacingAfter: 200,
          alignment: "center",
          size: 40,
          bold: true,
        }),
        wordText({
          text: "万籁亿光科技有限公司",
          spacingAfter: 400,
          alignment: "center",
          color: "#3198c8",
          size: 20,
          bold: true,
        }),
        wordText({ text: "基本信息", bold: true, spacingAfter: 100 }),
        new Table({
          rows: [
            new TableRow({
              children: [
                wordTableCell({ text: "登录名", bold: true }),
                wordTableCell({ text: answer.student.account }),
                wordTableCell({ text: "姓名", bold: true }),
                wordTableCell({ text: answer.student.name }),
                wordTableCell({ text: "性别", bold: true }),
                wordTableCell({
                  text: answer.student.sex === "1" ? "男" : "女",
                }),
              ],
            }),
            new TableRow({
              children: [
                wordTableCell({ text: "年龄", bold: true }),
                wordTableCell({ text: String(answer.student.age) }),
                wordTableCell({ text: "" }),
                wordTableCell({ text: "" }),
                wordTableCell({ text: "" }),
                wordTableCell({ text: "" }),
              ],
            }),
          ],
        }),
        wordText({
          text: "测验结果",
          bold: true,
          spacingAfter: 100,
          spacingBefore: 200,
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                wordTableCell({ text: "测验工具", bold: true }),
                wordTableCell({ text: template.name }),
                wordTableCell({ text: "测验日期", bold: true }),
                wordTableCell({ text: formatDate(answer.updatedAt) }),
              ],
            }),
            new TableRow({
              children: [
                wordTableCell({ text: "测评次序", bold: true }),
                wordTableCell({ text: String(answer.answerCount) }),
                wordTableCell({ text: "" }),
                wordTableCell({ text: "" }),
              ],
            }),
          ],
        }),
        wordText({
          text: "因子得分",
          bold: true,
          spacingAfter: 100,
          spacingBefore: 200,
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                wordTableCell({ text: "因子名称", bold: true }),
                wordTableCell({ text: "因子简称", bold: true }),
                wordTableCell({ text: "分值", bold: true }),
              ],
            }),
            ...answer.scoreSummary.map(
              (summary: any) =>
                new TableRow({
                  children: [
                    wordTableCell({ text: summary.showText }),
                    wordTableCell({ text: summary.shortName }),
                    wordTableCell({ text: String(summary.score) }),
                  ],
                })
            ),
          ],
        }),
        wordText({
          text: "得分解释&&辅导建议",
          bold: true,
          spacingAfter: 100,
          spacingBefore: 200,
        }),
        ...answer.scoreReport
          .map((report: any) => {
            return [
              wordText({
                text: report.title,
                bold: true,
                spacingAfter: 100,
                spacingBefore: 100,
                shading: true,
              }),
              wordText({
                text: "得分解释",
                bold: true,
                spacingAfter: 100,
                spacingBefore: 100,
              }),
              wordText({ text: report.scoreDesc }),
              wordText({
                text: "辅导建议",
                bold: true,
                spacingAfter: 100,
                spacingBefore: 100,
              }),
              wordText({ text: report.scoreSug }),
            ];
          })
          .flat(),
        wordText({
          text: "评语：",
          bold: true,
          spacingAfter: 100,
          spacingBefore: 100,
        }),
      ],
    })),
  });
  // 将文档打包为 Blob
  const blob = await Packer.toBlob(doc);
  // 使用 file-saver 导出 Word 文件
  saveAs(blob, `${customerName}_${gradeText}_${classText}测评分析报告.docx`);
};

export { analyzeData, saveAnalyzeDataAsWord };
