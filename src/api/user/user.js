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

//创建用户
export const addUserApi = (data) => {
  return instance.post("/user/create", {
    ...data,
  });
};

//编辑用户
export const UpdataApi = (id, data) => {
  return instance.post("/user/update", {
    id,
    ...data,
  });
};

//修改个人信息
export const UpdataUserInfoApi = (
  username,
  password,
  sex,
  age,
  email,
  avator
) => {
  return instance.post("/user/update/info", {
    username,
    password,
    sex,
    age,
    email,
    avator,
  });
};

//上传头像
export const UpprofileApi = (avatar) => {
  return instance.post("/profile", {
    avatar,
  });
};
