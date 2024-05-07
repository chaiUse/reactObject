import instance from './api'
//推荐搜索
export const getOldSearch =()=>{
  return instance.get('/login/captcha')
}