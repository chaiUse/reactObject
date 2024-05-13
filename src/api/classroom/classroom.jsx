// import { eventNames } from "npm";
import instance from "../api";

// 创建班级
export const roomCreateApi = (data) => {
  return instance.post("/studentGroup/create", {
    ...data,
    students :[]
  });
};

// 查询班级
export const roomSearchApi = (name,teacher,classify) => {
  return instance.get('/studentGroup/list',{
   params:{
    name,
    teacher,
    classify
   }
  })
}


// 编辑班级
export const roomEditApi = (name,id,teacher,classify)=>{
  return instance.post('/studentGroup/update',{
    name,
    id,
    teacher,
    classify
  })
}



// 删除班级
export const roomDelApi = (id)=>{
  return instance.post('/studentGroup/remove',{
    id
  })
}



// 查询学生
export const stuSearchApi = (username)=>{
  return instance.get('/student/list',{
    params:{
      username
    }
  })
}


// 编辑学生
export const stuEditApi = (username,id,sex,age,className)=>{
  return instance.post('/student/update',{
    username,
    id,
    sex,
    age,
    className
  })
}

// 删除学生
export const stuDelApi = (id)=>{
  return instance.post('/student/remove',{
    id
  })
}