import instance from "../api";
//创建菜单
export const createPre = (_id,name,path,disabled,page) => {
    console.log('_id,name,path,disabled,page',_id,name,path,disabled,page);
    return instance.post('/permission/create',{
        name,
        pid:_id,
        path,
        disabled:JSON.parse(disabled),
        page
    })
}

//查询菜单
export const findPre = () => {
    return instance.get('/permission/list')
}

//编辑菜单
export const updatePre = (_id,name,path,page,disabled) => {
    console.log(_id,name,path,page,disabled);
    return instance.post('/permission/update',{
        id:_id,
        name,
        path,
        page,
        disabled
    })
}

//删除菜单
export const deletePre = (_id) => {
    console.log(6666,_id);
    return instance.post('/permission/remove',{
        id:_id
    })
} 