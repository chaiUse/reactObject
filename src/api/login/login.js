import instance from "../api";

const timestamp = Date.now();

export const getCapTchaApi = () => {
  return instance.get("/login/captcha", {
    data: {
      timestamp,
    },
  });
};

//登录
export const getUPApi = (data) => {
  return instance.post("/login", {
    ...data,
    timestamp,
  });
};

//退出
export const blackApi = (data) => {
  console.log(data);
  return instance.post("/user/logout", {
    ...data,
  });
};
