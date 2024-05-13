
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
  // console.log(value);
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
//获取权限列表

export const permissionLst = () =>{

  return instance.get('/permission/list')
}

//编辑角色权限
export const editRolePermissions = ({id,name,permission}) =>{
  console.log('编辑角色权限传递数据',id,name,permission);
  return instance.post('/role/update',{
    id,
    name,
    permission
  })
}