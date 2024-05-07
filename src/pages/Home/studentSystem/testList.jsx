import axios from "axios"
import { useEffect, useState } from "react"
// import React from "react";
const TestList = () => {
    const [list,setList] = useState([])
    useEffect(() => {
        axios.get('http://192.168.28.11:3001/student/exam').then(res => {
            console.log(res.data);
            setList(res.data)
        })
        .catch(error => {
            console.error('请求失败',error);
        })
    },[])
    console.log(list);
    return (
        <div className="allStudent">
            <header>所有考试学生</header>
            <main>
                <p>
                    <span>腾达</span>
                    <span className="isTest">
                        考试状态
                        <i>是</i>
                    </span>
                </p>
            </main>

        </div>
    )
}

export default TestList