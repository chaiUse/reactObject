import axios from "axios"
import { useEffect, useState } from "react"
const OverTest = () => {
    const[list,setList] = useState([])
    useEffect(() => {
        axios.post('http://192.168.28.11:3001/student/exam/submit').then(res => {
            console.log(res);
            setList(res.data)
        })
    },[])
    console.log(list);
    return (
        <div>提交考试</div>
    )
}

export default OverTest