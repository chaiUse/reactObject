import { useEffect, useState } from "react"
import {overT,findList,findDetail} from "../../../api/student/student"

const StudentSystem = () => {
    const[list,setList] = useState([])
    //获取数据
    const getList = async() => {
        const test = await findList()
        console.log(test);
        const detail = await findDetail()
        console.log(detail);
        const over = await overT()
        console.log(over);
    }
    useEffect(() => {
        getList()
    },[])
}

export default StudentSystem