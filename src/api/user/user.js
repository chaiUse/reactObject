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
export const getUserListApi = (page, pagesize, search = {}) => {
  console.log(search);
  return instance.get("/user/list", {
    data: {
      page,
      pagesize,
      ...search,
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



// //创建考试
// export const addSecondApi = () => {
//   console.log('调用了创建考试接口');
//   return instance.post("/examination/create", 
//     {
//     name: "html考试",
//     classify: "html",
//     examId:  "64425a108784673370bb54aa",
//     group: "6440943b4334531055509a51",
//     examiner: "1111111",
//     startTime: "2222",
//     endTime: "33333333"
//     }
//   );
// };
//创建考试
export const addSecondApi = () => {
  console.log('调用了创建考试接口');
  return instance.post("/examination/create", 
    {
    name: "html考试",
    classify: "html",
    examId:  "64425a108784673370bb54aa",
    group: "6440943b4334531055509a51",
    examiner: "1111111",
    startTime: "2222",
    endTime: "33333333"
    }
  );
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
