import instance from './api'

//创建题库
export const getCreateTest = () => {
  return instance.post('/question/create')
}