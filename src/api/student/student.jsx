import instance from "../api";
//提交考试
export const overT = () => {
    return instance.post('/student/exam/submit')
}

//查询考试列表
export const findList = () => {
    return instance.get('/student/exam')
}

//查询考试详情
export const findDetail = (id) => {
    return instance.get('/student/exam/detail',{
        ...id
    })
}