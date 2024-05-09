import instance from "../api";
//创建菜单
export const createPre = () => {
    return instance.post('/permission/create')
}
//查询菜单
export const findPre = () => {
    return instance.get('/permission/list')
}

//编辑菜单
export const updatePre = () => {
    return instance.post('/permission/update')
}

//删除菜单
export const deletePre = () => {
    return instance.post('/permission/remove')
} 