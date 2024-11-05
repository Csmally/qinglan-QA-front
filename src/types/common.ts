enum GlobalValue {
  UNKNOWN_VALUE = "unknown",
}

// toastCode: 1 success, 2 warning, 3 error, 0 无
enum ToastCode {
  NO,
  SUCCESS,
  WARNING,
  ERROR,
}

enum BusinessCode {
  SUCCESS = 0,
  ERROR = -1,
}

enum PAGE_PATH {
  HOME = 'home', // 首页
  CLASS_SETUP = 'classSetUp', // 班级设置
  CONTRACT_SETUP = 'contract', // 客户设置
  STUDENT_SETUP = 'studentSetUp', // 学生设置
  SYSTEM_SETUP = 'systemSetUp', // 系统设置
  TEMPLATE_SETUP = 'templateSetUp', // 模版设置
  TEST = 'test', // 测试页面
  USER_SETUP = 'userSetUp', // 用户设置
}

export { GlobalValue, ToastCode, BusinessCode, PAGE_PATH };
