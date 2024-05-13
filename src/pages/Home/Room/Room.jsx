
import RoomTable from './components/RoomTable'
import Drawer from './components/Drawer';
import RoomTitle from './components/RoomTitle';
import { useEffect,useState } from 'react';
// import axios from 'axios';
import {roomSearchApi} from '../../../api/classroom/classroom'
import style from '../Room/Room.module.scss'
import React from 'react';
import { DataProvider } from '../Room/data/DataContext';

const Room = () => {

  const [ teacherList1, setTeacherList1 ] = useState([])//老师选项
  const [ classList1, setClassList1 ] = useState([])//科目类别选项



  const a = async() => {
    try{
      const resSearch = await roomSearchApi()
      
        // 老师选项
        setTeacherList1([...new Set(resSearch.data.list.map(item => item.teacher))])
        // 科目类别选项
        setClassList1([...new Set(resSearch.data.list.map(item => item.classify))])
        
    }catch(error){
      console.log('API调用出错:', error)
    }
  }
  useEffect(()=>{
    a()
  },[])
  return (
    <DataProvider>
    <div className={style.box}>
      <RoomTitle teacherList1={teacherList1} classList1={classList1} />
      <Drawer teacherList1={teacherList1} classList1={classList1} />
      <RoomTable />
    </div>
    </DataProvider>
  );
};
export default Room;