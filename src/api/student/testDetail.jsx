import instance from "../api";

export const testDetail = (id) => {
    return instance.get("/student/exam/detail",{
        data:{
            id
        }
    })
}