import instance from '../api'

//创建科目
export const getCreateTestApi = () => {
  return instance.post('/classify/create',{
    "name": "react",
    "value": "react"
  })
}

export const getTestListApi = (page = 1, pageSize = 10) => {
  return instance.get('/classify/list',{
    data:{
      page,
      pageSize
    }
  })
}

export const getTiKuListApi = (page = 1, pageSize = 2) => {
  return instance.get('/question/list',{
    data:{
      page,
      pageSize
    }
  })
}



