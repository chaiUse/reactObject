
import instance from "../api";
//查询角色api


export const queryRoleApi = (page = 1, pagesize = 5) => {
  return instance.get("/role/list", {
    data: {
      page,
      pagesize,
    },
    // headers: {
    //   "X-Powered-By": "Express",

    //   "Access-Control-Allow-Origin": "*",
    //   "Content-Type": "application/json; charset=utf-8",
    //   // "Content-Length":"246",
    //   "ETag": 'W/"f6-R7iJYwuxk9hRnANVyYC4b71N/GQ"',
    //   // "Date":"Mon, 17 Apr 2023 03:17:36 GMT",
    //   // "Connection":"keep-alive",

    //   // "Keep-Alive":"timeout=5"

    // }
  });
};