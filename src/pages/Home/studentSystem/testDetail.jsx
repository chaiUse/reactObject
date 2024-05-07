import axios from "axios"
import { useEffect, useState } from "react"
import { testDetail } from "../../../api/student/testDetail"
// import React from "react";
const TestDetail = () => {
    const testD = async () => {
        const res = await testDetail()
        console.log(res);
    }
    useEffect(() => {
        testD()
    },[])
    // const[list,setList] = useState([])
    // useEffect(() => {
    //     axios.get('http://192.168.28.11:3001/student/exam/detail?id=6449cc0454fab354d55d81e6').then(res => {
    //         console.log(res);
    //         setList(res.data)
    //     })
    // },[])
    // console.log(list);
    
    return (
        <div>考试详情</div>
    )
}

export default TestDetail