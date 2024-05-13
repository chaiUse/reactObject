
import StuTable from './components/StuTable'
import StuDrawer from './components/StuDrawer';
import StuRoomTitle from './components/StuRoomTitle';
// import { useEffect,useState } from 'react';
// import {roomSearchApi} from '../../../api/classroom/classroom'
// import style from '../Room/Room.module.scss'
// import React from 'react';
// import { DataProvider } from '../Room/data/DataContext';

const Students = () => {
  return (
    <div>
      <StuRoomTitle />
      <StuDrawer />
      <StuTable />
    </div>
  )
}

export default Students