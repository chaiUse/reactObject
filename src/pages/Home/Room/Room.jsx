
import RoomTable from './components/RoomTable'
import Drawer from './Drawer';
import RoomTitle from './components/RoomTitle';
import { useEffect } from 'react';
// import axios from 'axios';
import {roomCreateApi,roomSearchApi,roomEditApi,roomDelApi} from '../../../api/classroom/classroom'

const Room = () => {




  const a = async() => {
    try{
      const resCreate = await roomCreateApi()
      const resSearch = await roomSearchApi()
      const resEdit = await roomEditApi()
      const resDel = await roomDelApi()
      console.log(111,resCreate);
      console.log(222,resSearch);
      console.log(333,resEdit);
      console.log(444,resDel);
    }catch(error){
      console.log('API调用出错:', error)
    }
  }
  useEffect(()=>{
    a()
  },[])
  return (
    <>
      <RoomTitle />
      <Drawer />
      <RoomTable />
    </>
  );
};
export default Room;