import instance from "../api";

export const testLiST = () => {
    return instance.get("/student/exam",{

    })
}