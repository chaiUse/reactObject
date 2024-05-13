import instance from '../api'

//科目列表
export const getTestListApi = (page = 1, pageSize = 10) => {
  return instance.get('/classify/list',{
    data:{
      page,
      pageSize
    }
  })
}

//题库列表
export const getTiKuListApi = ({question=null, classify, type}) => {
  return instance.get('/question/list',{
    params:{
      question,
      classify,
      type
    }
  })
}

//搜索试题
export const getSearchQuestionApi = () =>{
  return instance.get('/question/type/list')
}

//编辑试题
export const getEditTestApi = (id, question, type, classify) => {
  return instance.post('/question/update',{
    id,
    question,
    type,
    classify,
  })
}

//创建试题
export const getCreateTestPapApi = () => {
  return instance.post('/question/create',{
      "question": "1+2等于多少",
      "type": 1,
      "classify": "小学一年级",
      "answer": "3",
      "options":  ["2", "3", "4", "5"],
      "desc": "1+2=3"
  })
}

//删除试题
export const getDelTestApi = (id) => {
  return instance.post('/question/remove',{
    id,
  })
}

//创建科目
export const getCreateClassApi = (name, value) => {
  return instance.post('/classify/create',{
    name,
    value
  })
}

//编辑科目
export const getCreateTestApi = (id, name, value) => {
  return instance.post('/classify/update',{
    id,
    name,
    value
  })
}
//删除科目
export const getDeleteTestApi = (id) => {
  return instance.post('/classify/remove',{
    id,
  })
}

//搜索科目
export const getClassifyListApi = (page, pageSize) => {
  return instance.get('/classify/list',{
    page,
    pageSize
  })
}

