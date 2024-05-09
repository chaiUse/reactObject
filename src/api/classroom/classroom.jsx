import instance from "../api";

// 创建班级
export const roomCreateApi = () => {
  return instance.post("/studentGroup/create", {
    "name": "nodejs",
    "classify": "nodejs",
    "teacher": "小明",
    "students": [1,2,3]  
  });
};

// 查询班级
export const roomSearchApi = (page=1,pagesize=2,name) => {
  return instance.get('/studentGroup/list',{
   data:{
    page,
    pagesize,
    name
   }
  })
}


// 编辑班级
export const roomEditApi = ()=>{
  return instance.post('/studentGroup/update',{
    "id": "643cb92d26a6ca88efe9f3b8",
    "name": "js111"
  })
}



// 删除班级
export const roomDelApi = ()=>{
  return instance.post('/studentGroup/remove',{
    "id": "643cb92d26a6ca88efe9f3b8"
  })
}