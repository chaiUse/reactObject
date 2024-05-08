import instance from './api'

//创建科目
export const getCreateTest = () => {
  return instance.post('/classify/create',{
    "name": "react",
    "value": "react"
  })
}