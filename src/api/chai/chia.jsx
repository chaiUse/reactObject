
import instance from "../api";
//查询角色api


export const queryRoleApi = (page = "1", pagesize = "5") => {
  console.log('数据请求',page,pagesize);
  return instance.get("/role/list", {
    params: {
      page,
      pagesize,
    },
  });
};