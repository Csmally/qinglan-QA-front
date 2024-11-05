const generateRandomString = () : string => {
    const now = new Date();
    const timeString = now.getTime().toString(); // 获取当前时间戳
    const randomPart = Math.floor(Math.random() * 1000); // 生成一个 3 位数的随机数
    const combinedString = timeString + randomPart.toString(); // 合并时间戳和随机数
    return combinedString.slice(-6); // 取最后 6 位字符
}

export { generateRandomString }