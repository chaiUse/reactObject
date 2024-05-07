import instance from "./api";

//用户信息
export const getUserInfoApi = () => {
  return instance.get("/user/info");
};
