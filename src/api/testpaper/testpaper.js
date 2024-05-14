

import instance from "../api";


export const posTestApi = (data) =>{
    console.log('调用了创建考试接口',data);
    return instance.post('/examination/create',{
    name: "html考试",
    classify: "html",
    examId:  "64425a108784673370bb54aa",
    group: "6440943b4334531055509a51",
    examiner: "1111111",
    startTime: "2222",
    endTime: "33333333"
    })
}

export const posTrevomApi = (id) =>{
    console.log('删除接口',id);
    return instance.post("/examination/remove",{
        id
    })
    
}

export const posTupApi = (data) =>{
 
    console.log('修改数据接口',data);
    return instance.post("/examination/update",{
        id:data._id,
        name:data.name,
        classify:data.classify,
        createTime:data.createTime,
        creator:data.creator,
        examiner:data.examiner
    })
    
}