import instance from "../api";
//创建菜单
export const createPre = (_id,name,path,disabled) => {
    console.log('_id,name,path,disabled',_id,name,path,disabled);
    return instance.post('/permission/create',{
        name,
        pid:_id,
        path,
        disabled
    })
}

//查询菜单
export const findPre = () => {
    return instance.get('/permission/list')
}

//编辑菜单
export const updatePre = (_id,name) => {
    // console.log(_id,name,99999);
    return instance.post('/permission/update',{
        id:name,
        name:_id,
    })
}

//删除菜单
export const deletePre = (_id) => {
    return instance.post('/permission/remove',{
        id:_id
    })
} 