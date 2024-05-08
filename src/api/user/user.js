import instance from "../api";

//用户信息
export const getUserInfoApi = () => {
  return instance.get("/user/info");
};

//
export const getListApi = () => {
  return instance.get("/permission/list");
};

//查询用户列表
export const getUserListApi = (page, pagesize) => {
  return instance.get("/user/list", {
    data: {
      page,
      pagesize,
    },
  });
};

//删除用户
export const delUserApi = (id) => {
  return instance.post("/user/remove", {
    id,
  });
};
