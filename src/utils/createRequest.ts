import { ApiVersion, SystemVersion } from "@/common/consts/commonParams";
import { BusinessCode, ToastCode } from "@/types/common";
import { message } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface RequestOptions extends AxiosRequestConfig {
  baseURL: string;
  timeout?: number;
  options?: object;
}

const defaultHeaders = {
  "Content-Type": "application/json", // 设置请求头
  "QL-Sys-Version": `${SystemVersion.major}.${SystemVersion.minor}.${SystemVersion.patch}`, // 系统版本号
  "QL-Api-Version": `${ApiVersion.major}.${ApiVersion.minor}.${ApiVersion.patch}`, // API版本号
};

const createRequest = ({
  baseURL,
  timeout = 10000,
  headers = {},
}: RequestOptions): AxiosInstance => {
  // 创建axios实例
  const request = axios.create({
    baseURL, // 设置基础URL，用于所有请求
    timeout, // 设置请求超时时间，单位是毫秒
    headers: { ...defaultHeaders, ...headers },
  });

  // 使用拦截器（interceptor）配置请求和响应
  request.interceptors.request.use(
    (config) => {
      // 做一些设置请求参数的操作
      return config;
    },
    (error) => {
      // 对请求错误做一些处理
      return Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    (response) => {
      const responseData = response.data;
      const { toastCode, message: msg } = responseData;
      if (toastCode === ToastCode.SUCCESS) {
        message.success(msg);
      }
      if (toastCode === ToastCode.WARNING) {
        message.warning(msg);
      }
      if (toastCode === ToastCode.ERROR) {
        message.error(msg);
      }
      // 对响应数据做一些处理
      return responseData;
    },
    (error) => {
      const { message: errorMessage = '网络连接错误' } = error?.response?.data || {};
      message.error(errorMessage);
      // 对响应错误做一些处理
      return {
        success: false,
        code: BusinessCode.ERROR,
        data: null,
        message: errorMessage || "请求失败",
      };
    }
  );
  return request;
};

export default createRequest;
