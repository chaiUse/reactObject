
import instance from "../api";
//查询角色api


export const queryRoleApi = (page = "1", pagesize = "5") => {

  return instance.get("/role/list", {
    params: {
      page,
      pagesize,
    },
  });
};