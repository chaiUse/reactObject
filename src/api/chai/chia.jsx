
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

//创建角色
export const createRole = (value={name:'管理员',value:'ssss'})=>{
  console.log(value);
  return instance.post('/role/create',{
      ...value
  })
}
//删除角色
export const delRole = (id) =>{

  return instance.post('/role/remove',{
    ...id,
  })
}